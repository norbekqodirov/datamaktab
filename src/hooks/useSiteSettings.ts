import { useCallback, useState } from 'react';
import { useGlobalState } from '../context/GlobalStateContext';
import { useEditMode } from '../context/EditModeContext';

export function useSiteSettings() {
  const { siteData, updateSetting, getLatestSiteData, loading } = useGlobalState();
  const editModeCtx = useEditMode();

  const isEditMode = editModeCtx?.isEditMode;
  const registerPendingSave = editModeCtx?.registerPendingSave;

  const saveKey = useCallback((key: string, value: string) => {
    // 1. Instantly update UI across all components
    updateSetting(key, value);
    
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
  }, [updateSetting, isEditMode, registerPendingSave, getLatestSiteData]);

  const get = (key: string, fallback: string): string =>
    siteData?.[key] ?? fallback;

  return { get, saveKey, loaded: !loading };
}
