import { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return (
    dashData && (
      <div className="m-5 space-y-10">

        {/* Top Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-md cursor-pointer hover:scale-105 transition-all">
            <img className="w-16 h-16" src={assets.doctor_icon} alt="" />
            <div>
              <p className="text-3xl font-bold text-gray-700">{dashData.doctors}</p>
              <p className="text-gray-500 text-lg">Doctors</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-md cursor-pointer hover:scale-105 transition-all">
            <img className="w-16 h-16" src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-3xl font-bold text-gray-700">{dashData.appointments}</p>
              <p className="text-gray-500 text-lg">Appointments</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-md cursor-pointer hover:scale-105 transition-all">
            <img className="w-16 h-16" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-3xl font-bold text-gray-700">{dashData.patients}</p>
              <p className="text-gray-500 text-lg">Patients</p>
            </div>
          </div>
        </div>

        {/* Latest Bookings Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-5 border-b">
            <img className="w-6 h-6" src={assets.list_icon} alt="" />
            <p className="font-semibold text-lg text-gray-800">Latest Bookings</p>
          </div>

          <div className="divide-y">
            {dashData.latestAppointments.slice(0, 5).map((item, index) => (
              <div
                className="flex items-center px-6 py-4 gap-4 hover:bg-gray-50 transition-all"
                key={index}
              >
                <img className="rounded-full w-12 h-12 object-cover" src={item.docData.image} alt="" />
                <div className="flex-1 text-sm">
                  <p className="text-gray-900 font-semibold text-base">{item.docData.name}</p>
                  <p className="text-gray-600 text-sm">
                    Booking on {slotDateFormat(item.slotDate)}
                  </p>
                </div>
                {item.cancelled ? (
                  <p className="text-red-500 text-xs font-semibold">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 text-xs font-semibold">Completed</p>
                ) : (
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform"
                    src={assets.cancel_icon}
                    alt=""
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  )
}

export default Dashboard
