import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

function isHTMLElement(element: HTMLElement | null): element is HTMLElement {
  return element instanceof HTMLElement;
}

type RootElementType = HTMLElement | null;
const rootElement: RootElementType = document.getElementById('root');

if (isHTMLElement(rootElement)) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>,
  );
}
