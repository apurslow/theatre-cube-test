import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Suspense } from 'react'

// **Studio toggle here**
import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'

studio.extend(extension);
studio.initialize();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={null}>
      <App />
    </Suspense>
  </React.StrictMode>,
)
