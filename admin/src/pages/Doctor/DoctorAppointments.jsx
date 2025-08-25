import { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  return (
    <div className="w-full max-w-7xl mx-auto p-5">
      <p className="mb-5 text-2xl font-semibold text-gray-700">All Appointments</p>

      <div className="bg-white border rounded-lg shadow-md text-sm max-h-[80vh] overflow-y-auto">
        {/* Table header (hidden on mobile) */}
        <div className="hidden md:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-4 py-4 px-6 border-b bg-gray-50 text-gray-700 font-medium">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Rows */}
        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:grid md:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-4 items-center text-gray-600 py-4 px-6 border-b hover:bg-gray-50 transition"
          >
            {/* Index (hidden on mobile) */}
            <p className="hidden md:block">{index + 1}</p>

            {/* Patient */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <img src={item.userData.image} className="w-10 h-10 rounded-full object-cover" alt="" />
              <p className="font-medium">{item.userData.name}</p>
            </div>

            {/* Payment */}
            <div>
              <p className="text-xs inline-block border border-cyan-500 px-3 py-0.5 rounded-full">
                {item.payment ? 'Online' : 'Cash'}
              </p>
            </div>

            {/* Age */}
            <p className="hidden md:block">{calculateAge(item.userData.dob)}</p>

            {/* Date & Time */}
            <p className="w-full md:w-auto">
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>

            {/* Fees */}
            <p className="font-medium">
              {currency}{item.amount}
            </p>

            {/* Actions */}
            {item.cancelled ? (
              <p className="text-red-400 text-xs font-semibold">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-500 text-xs font-semibold">Completed</p>
            ) : (
              <div className="flex gap-3">
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className="w-12 cursor-pointer hover:scale-110 transition"
                  src={assets.cancel_icon}
                  alt="Cancel"
                />
                <img
                  onClick={() => completeAppointment(item._id)}
                  className="w-12 cursor-pointer hover:scale-110 transition"
                  src={assets.tick_icon}
                  alt="Complete"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorAppointments
