import { useState, useCallback, useEffect } from 'react';
import { settingsService } from '../services/settings';

export const useSettings = () => {
  const [settings, setSettings] = useState(() => settingsService.get());

  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === null || event.key === 'frazil_settings') setSettings(settingsService.get());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const updateSettings = useCallback((patch) => {
    settingsService.save(patch);
    setSettings(settingsService.get());
  }, []);

  return { settings, updateSettings };
};
