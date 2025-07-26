import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Classement from './components/classement.jsx'
import Authpage from './components/AuthPage.jsx'
import Dashboard from './components/Dashboard.jsx'
import Jobs from './components/Jobs.jsx'
import Profile from './components/Profile.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/classement" element={<Classement />} />
          <Route path="/login" element ={<Authpage/>} />
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/jobs' element={<Jobs/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
