import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';
// Self-hosted fonts — no Google DNS lookup, no render blocking
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import '@fontsource/manrope/700.css';
import '@fontsource/manrope/800.css';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import { GlobalStateProvider } from './context/GlobalStateContext.tsx';
import { LanguageProvider } from './context/LanguageContext.tsx';
import { EditModeProvider } from './context/EditModeContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <GlobalStateProvider>
        <LanguageProvider>
          <EditModeProvider>
            <App />
          </EditModeProvider>
        </LanguageProvider>
      </GlobalStateProvider>
    </HelmetProvider>
  </StrictMode>,
);

