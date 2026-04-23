import { useState, useEffect, useCallback } from 'react';

/** Fetches /api/settings and returns a getter + saver for keyed string values. */
export function useSiteSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(data => {
        if (data.maktab_global) {
          try { setSettings(JSON.parse(data.maktab_global)); } catch {}
        }
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const saveKey = useCallback(async (key: string, value: string) => {
    setSettings(prev => {
      const next = { ...prev, [key]: value };
      fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ maktab_global: JSON.stringify(next) }),
      }).catch(console.error);
      return next;
    });
  }, []);

  const get = (key: string, fallback: string): string =>
    (settings as Record<string, string>)[key] ?? fallback;

  return { get, saveKey, loaded };
}
