import { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } =
    useContext(DoctorContext)
  const { slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken])

  return (
    dashData && (
      <div className="m-5">
        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 bg-base-100 p-6 rounded-xl border shadow-md cursor-pointer hover:scale-105 transition-transform">
            <img className="w-16" src={assets.earning_icon} alt="Earnings" />
            <div>
              <p className="text-2xl font-bold text-gray-700">
                {currency} {dashData.earnings}
              </p>
              <p className="text-gray-500">Earnings</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-base-100 p-6 rounded-xl border shadow-md cursor-pointer hover:scale-105 transition-transform">
            <img className="w-16" src={assets.appointments_icon} alt="Appointments" />
            <div>
              <p className="text-2xl font-bold text-gray-700">{dashData.appointments}</p>
              <p className="text-gray-500">Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-base-100 p-6 rounded-xl border shadow-md cursor-pointer hover:scale-105 transition-transform">
            <img className="w-16" src={assets.patients_icon} alt="Patients" />
            <div>
              <p className="text-2xl font-bold text-gray-700">{dashData.patients}</p>
              <p className="text-gray-500">Patients</p>
            </div>
          </div>
        </div>

        {/* Latest Bookings Section */}
        <div className="bg-base-100 mt-10 rounded-xl border shadow-md">
          <div className="flex items-center gap-3 px-6 py-5 border-b">
            <img src={assets.list_icon} alt="Bookings" className="w-6 h-6" />
            <p className="font-semibold text-lg">Latest Bookings</p>
          </div>

          <div className="divide-y">
            {dashData.latestAppointments.slice(0, 5).map((item, index) => (
              <div
                className="flex items-center px-6 py-4 gap-4 hover:bg-base-200 transition-colors"
                key={index}
              >
                <img
                  className="rounded-full w-12 h-12 object-cover"
                  src={item.userData.image}
                  alt={item.userData.name}
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium text-base">{item.userData.name}</p>
                  <p className="text-gray-600">
                    Booking on {slotDateFormat(item.slotDate)}
                  </p>
                </div>
                {item.cancelled ? (
                  <p className="text-red-500 text-sm font-semibold">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 text-sm font-semibold">Completed</p>
                ) : (
                  <div className="flex gap-3">
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className="w-10 cursor-pointer hover:opacity-80"
                      src={assets.cancel_icon}
                      alt="Cancel"
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      className="w-10 cursor-pointer hover:opacity-80"
                      src={assets.tick_icon}
                      alt="Complete"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  )
}

export default DoctorDashboard
