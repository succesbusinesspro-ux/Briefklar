import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import './index.css';

// Fix for "Cannot set property fetch of #<Window> which has only a getter"
if (typeof window !== 'undefined') {
  try {
    const originalFetch = window.fetch;
    Object.defineProperty(window, 'fetch', {
      get: () => originalFetch,
      set: () => {
        console.warn('Attempted to overwrite window.fetch. This attempt was ignored to prevent a TypeError.');
      },
      configurable: true,
      enumerable: true
    });
  } catch (e) {
    console.error('Failed to patch window.fetch:', e);
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
