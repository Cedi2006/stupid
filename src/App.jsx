import { useNavigate } from 'react-router-dom'
import './App.css'

function App() {
  const navigate = useNavigate()

  const goToClassement = () => {
    navigate('/classement')
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <button 
        onClick={goToClassement}
        className="px-6 py-3 text-xl bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Voir le Classement
      </button>
    </div>
  )
}

export default App
