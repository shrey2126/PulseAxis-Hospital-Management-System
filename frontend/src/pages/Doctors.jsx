import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const Doctors = () => {

  const { speciality } = useParams()

  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div data-aos="fade-up" data-aos-duration="1000">
      <p className='text-gray-600 text-semibold text-lg' data-aos="fade-right" data-aos-duration="1200">
        Browse through the doctors specialist.
      </p>

      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button 
          onClick={() => setShowFilter(!showFilter)} 
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-cyan-500 text-white' : ''}`}
          data-aos="fade-down"
        >
          Filters
        </button>

        {/* Filters */}
        <div className={`flex-col gap-4 text-sm text-black ${showFilter ? 'flex' : 'hidden sm:flex'}`} data-aos="fade-right">
          <button onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={` w-[94vw] sm:w-auto px-6 py-2 border border-gray-300 rounded-lg font-medium transition-all duration-300 shadow-md cursor-pointer  ${speciality === 'General physician' ? 'bg-[#E2E5FF] text-black ' : ''}`}>General physician</button>
          <button onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto px-6 py-2 border border-gray-300 rounded-lg font-medium transition-all duration-300 shadow-md cursor-pointer ${speciality === 'Gynecologist' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Gynecologist</button>
          <button onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto px-6 py-2 border border-gray-300 rounded-lg font-medium transition-all duration-300 shadow-md cursor-pointer ${speciality === 'Dermatologist' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Dermatologist</button>
          <button onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto px-6 py-2 border border-gray-300 rounded-lg font-medium transition-all duration-300 shadow-md cursor-pointer${speciality === 'Pediatricians' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Pediatricians</button>
          <button onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto px-6 py-2 border border-gray-300 rounded-lg font-medium transition-all duration-300 shadow-md cursor-pointer ${speciality === 'Neurologist' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Neurologist</button>
          <button onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto px-6 py-2 border border-gray-300 rounded-lg font-medium transition-all duration-300 shadow-md cursor-pointer  ${speciality === 'Gastroenterologist' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Gastroenterologist</button>
        </div>

        {/* Doctor Cards */}
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {filterDoc.map((item, index) => (
            <div 
              onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} 
              className=' group border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' 
              key={index}
              data-aos="zoom-in"
              data-aos-duration="1000"
              data-aos-delay={index * 100}
            >
              {/* Image Wrapper with Hover Background */}
              <div className="bg-[#EAEFFF] group-hover:bg-cyan-500 transition-colors duration-500 flex justify-center">
                <img 
                  className="transition-transform duration-500 group-hover:scale-105" 
                  src={item.image} 
                  alt={item.name} 
                />
              </div>
              {/* Doctor Info */}
              <div className='p-4'>
                <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : "text-gray-500"}`}>
                  <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-500"}`}></p>
                  <p>{item.available ? 'Available' : "Not Available"}</p>
                </div>
                <p className='text-[#262626] text-lg font-semibold'>{item.name}</p>
                <p className='text-[#5C5C5C] text-sm font-semibold'>{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Doctors
