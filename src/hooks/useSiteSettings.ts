import { useCallback } from 'react';
import { useGlobalState } from '../context/GlobalStateContext';
import { useEditMode } from '../context/EditModeContext';

// Keys that refer to images (shared across all languages)
const IMAGE_KEY_PATTERNS = ['_img', '_bg', '_image', 'hero_student'];

function isImageKey(key: string): boolean {
  return IMAGE_KEY_PATTERNS.some(p => key.includes(p));
}

export function useSiteSettings() {
  const { siteData, updateSetting, getLatestSiteData, loading } = useGlobalState();
  const editModeCtx = useEditMode();

  const isEditMode = editModeCtx?.isEditMode;
  const registerPendingSave = editModeCtx?.registerPendingSave;
  const adminEditLang = editModeCtx?.adminEditLang ?? 'uz';

  /** Returns a language-suffixed key for text, or the raw key for images */
  function resolveKey(key: string, lang?: string): string {
    if (isImageKey(key)) return key;
    return `${key}_${lang ?? adminEditLang}`;
  }

  /**
   * get(key, fallback): look up the language-specific value first,
   * then the legacy (no-lang) value, then the fallback.
   */
  const get = (key: string, fallback: string): string => {
    if (isImageKey(key)) {
      return siteData?.[key] ?? fallback;
    }
    const langKey = resolveKey(key);
    // 1. Try language-specific key
    if (siteData?.[langKey] !== undefined) return siteData[langKey];
    // 2. Fall back to the old key without language suffix (legacy data)
    if (siteData?.[key] !== undefined) return siteData[key];
    // 3. Fall back to i18n string
    return fallback;
  };

  const saveKey = useCallback((key: string, value: string) => {
    const storageKey = isImageKey(key) ? key : resolveKey(key, adminEditLang);

    // 1. Instantly update UI
    updateSetting(storageKey, value);

    if (!isEditMode || !registerPendingSave) return;

    // 2. Defer actual server save to the unified Save All button
    registerPendingSave('global_settings_save', async () => {
      const latestData = getLatestSiteData();
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ maktab_global: JSON.stringify(latestData) }),
      });
    });
  }, [updateSetting, isEditMode, registerPendingSave, getLatestSiteData, adminEditLang]);

  return { get, saveKey, loaded: !loading };
}
