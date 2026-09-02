import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { products } from './data/products';
import { injectStructuredData } from './lib/seo';
import './index.css';

injectStructuredData(products);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
