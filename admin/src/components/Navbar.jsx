import { useContext } from 'react'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { dToken, setDToken } = useContext(DoctorContext)
  const { aToken, setAToken } = useContext(AdminContext)

  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }

  return (
    <div className="flex flex-wrap justify-between items-center px-4 sm:px-6 md:px-10 py-3 border-b bg-white dark:bg-base-100">
      {/* Left Section */}
      <div className="flex items-center gap-2 text-xs">
        <img 
          onClick={() => navigate('/')} 
          className="w-32 sm:w-40 md:w-52 lg:w-60 cursor-pointer object-contain" 
          src={assets.logo} 
          alt="Logo" 
        />
        <p className="hidden sm:block border px-2.5 py-0.5 rounded-full border-gray-500 text-black dark:border-gray-400 dark:text-black">
          {aToken ? 'Admin' : 'Doctor'}
        </p>
      </div>

      {/* Right Section */}
      <div className="mt-3 sm:mt-0">
        <button 
          onClick={logout} 
          className="w-full sm:w-auto bg-teal-500 hover:bg-teal-600 text-white text-sm px-6 sm:px-10 py-2 rounded-full transition"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar
