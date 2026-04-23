import React, { createContext, useContext, useState, useEffect } from 'react';
import { maktabData as fallbackData } from '../data/content';

export const GlobalStateContext = createContext<any>(null);

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within GlobalStateProvider');
  }
  return context;
};

export const GlobalStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [siteData, setSiteData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);

  const fetchSettings = () => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.maktab_global) {
          try {
             const parsed = JSON.parse(data.maktab_global);
             setSiteData((prev) => ({...prev, ...parsed}));
          } catch(e) {
            console.error("JSON parse error on maktab_global", e);
          }
        }
        
        // Settings also stores generic config, let's inject it into siteData.contact
        const contactInfo = {
          phone: data.phone || '+998 99 999 99 99',
          email: data.email || 'info@datamaktab.uz',
          address: data.address || 'Urganch shahar, Al-Xorazmiy 110-uy',
          instagram: data.instagram || 'https://instagram.com/data_maktabi',
          telegram: data.telegram || 'https://t.me/data_maktabi',
          facebook: data.facebook || 'https://facebook.com/data_maktabi'
        };
        
        setSiteData(prev => ({
          ...prev, 
          contact: contactInfo
        }));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching settings:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const saveGlobalData = async (newGlobalData: any) => {
    try {
      const res = await fetch('/api/settings', {
         method: 'PUT',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ maktab_global: JSON.stringify(newGlobalData) })
      });
      if (res.ok) {
         setSiteData(newGlobalData);
         return true;
      }
      return false;
    } catch(err) {
      console.error(err);
      return false;
    }
  }

  return (
    <GlobalStateContext.Provider value={{ siteData, setSiteData, saveGlobalData, loading, refetch: fetchSettings }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
