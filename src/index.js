import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 1. Get the root element from your HTML
const rootElement = document.getElementById('root');

// 2. Create the React root
const root = ReactDOM.createRoot(rootElement);

// 3. Render your main App component
root.render(
  <App />
);