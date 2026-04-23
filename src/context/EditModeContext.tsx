import React, { createContext, useContext, useState } from 'react';

interface EditModeContextType {
  isEditMode: boolean;
  setIsEditMode: (v: boolean) => void;
  toggleEditMode: () => void;
}

const EditModeContext = createContext<EditModeContextType>({
  isEditMode: false,
  setIsEditMode: () => {},
  toggleEditMode: () => {},
});

export const useEditMode = () => useContext(EditModeContext);

export const EditModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => {
    const token = localStorage.getItem('adminToken');
    if (!token && !isEditMode) {
      alert('Tahrirlash uchun avval admin paneliga kiring: /maktabpanel');
      return;
    }
    setIsEditMode(v => !v);
  };

  return (
    <EditModeContext.Provider value={{ isEditMode, setIsEditMode, toggleEditMode }}>
      {children}
    </EditModeContext.Provider>
  );
};
