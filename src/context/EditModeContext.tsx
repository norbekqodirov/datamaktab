import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

interface EditModeContextType {
  isEditMode: boolean;
  setIsEditMode: (v: boolean) => void;
  toggleEditMode: () => void;
  registerPendingSave: (id: string, fn: () => Promise<void>) => void;
  unregisterPendingSave: (id: string) => void;
  hasPendingChanges: boolean;
  pendingCount: number;
  saveAll: () => Promise<void>;
  isSavingAll: boolean;
}

const EditModeContext = createContext<EditModeContextType>({
  isEditMode: false,
  setIsEditMode: () => {},
  toggleEditMode: () => {},
  registerPendingSave: () => {},
  unregisterPendingSave: () => {},
  hasPendingChanges: false,
  pendingCount: 0,
  saveAll: async () => {},
  isSavingAll: false,
});

export const useEditMode = () => useContext(EditModeContext);

export const EditModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [isSavingAll, setIsSavingAll] = useState(false);
  const pendingSavesRef = useRef(new Map<string, () => Promise<void>>());

  const toggleEditMode = () => {
    const token = localStorage.getItem('adminToken');
    if (!token && !isEditMode) {
      alert('Tahrirlash uchun avval admin paneliga kiring: /maktabpanel');
      return;
    }
    setIsEditMode(v => !v);
  };

  const registerPendingSave = useCallback((id: string, fn: () => Promise<void>) => {
    const isNew = !pendingSavesRef.current.has(id);
    pendingSavesRef.current.set(id, fn);
    if (isNew) {
      setPendingCount(c => c + 1);
    }
  }, []);

  const unregisterPendingSave = useCallback((id: string) => {
    if (pendingSavesRef.current.has(id)) {
      pendingSavesRef.current.delete(id);
      setPendingCount(c => Math.max(0, c - 1));
    }
  }, []);

  const saveAll = useCallback(async () => {
    if (pendingSavesRef.current.size === 0) return;
    setIsSavingAll(true);
    try {
      const fns = Array.from(pendingSavesRef.current.values());
      await Promise.all(fns.map(fn => fn()));
      pendingSavesRef.current.clear();
      setPendingCount(0);
    } finally {
      setIsSavingAll(false);
    }
  }, []);

  return (
    <EditModeContext.Provider value={{
      isEditMode, setIsEditMode, toggleEditMode,
      registerPendingSave, unregisterPendingSave,
      hasPendingChanges: pendingCount > 0,
      pendingCount,
      saveAll,
      isSavingAll,
    }}>
      {children}
    </EditModeContext.Provider>
  );
};
