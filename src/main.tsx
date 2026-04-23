import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { GlobalStateProvider } from './context/GlobalStateContext.tsx';
import { LanguageProvider } from './context/LanguageContext.tsx';
import { EditModeProvider } from './context/EditModeContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalStateProvider>
      <LanguageProvider>
        <EditModeProvider>
          <App />
        </EditModeProvider>
      </LanguageProvider>
    </GlobalStateProvider>
  </StrictMode>,
);
