import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AdminContextProvider } from './context/AdminContext';
import { SongContextProvider } from './context/SongContext';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SongContextProvider>
      <AdminContextProvider>
        <App />
      </AdminContextProvider>
    </SongContextProvider>
  </React.StrictMode>
);