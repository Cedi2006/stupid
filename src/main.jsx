import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Classement from './components/classement.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/classement" element={<Classement />} />
        <Route path="/login" element ={<>Authpage</>} />
        Route
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
