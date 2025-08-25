import { useEffect, useContext } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AllAppointments = () => {
  const { aToken, appointments, cancelAppointment, getAllAppointments } = useContext(AdminContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className="w-full max-w-7xl mx-auto p-5">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">All Appointments</h2>

      <div className="bg-white border rounded-xl shadow-md overflow-hidden">
        {/* Header Row */}
        <div className="hidden sm:grid grid-cols-[0.5fr_2.5fr_1fr_2fr_2fr_1fr_1fr] py-4 px-6 bg-gray-100 font-semibold text-gray-700 text-sm">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Appointment Rows */}
        <div className="max-h-[75vh] overflow-y-auto divide-y">
          {appointments.map((item, index) => (
            <div
              key={index}
              className="flex flex-wrap justify-between sm:grid sm:grid-cols-[0.5fr_2.5fr_1fr_2fr_2fr_1fr_1fr] items-center px-6 py-4 text-gray-600 hover:bg-gray-50 transition"
            >
              {/* Index */}
              <p className="max-sm:hidden">{index + 1}</p>

              {/* Patient */}
              <div className="flex items-center gap-3">
                <img src={item.userData.image} className="w-10 h-10 rounded-full object-cover" alt="" />
                <p className="font-medium text-gray-800">{item.userData.name}</p>
              </div>

              {/* Age */}
              <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>

              {/* Date & Time */}
              <p className="text-sm">
                {slotDateFormat(item.slotDate)}, {item.slotTime}
              </p>

              {/* Doctor */}
              <div className="flex items-center gap-3">
                <img src={item.docData.image} className="w-10 h-10 rounded-full bg-gray-100 object-cover" alt="" />
                <p className="font-medium">{item.docData.name}</p>
              </div>

              {/* Fees */}
              <p className="font-semibold text-gray-700">
                {currency}
                {item.amount}
              </p>

              {/* Action */}
              {item.cancelled ? (
                <p className="text-red-500 text-sm font-semibold">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-500 text-sm font-semibold">Completed</p>
              ) : (
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform"
                  src={assets.cancel_icon}
                  alt="Cancel"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AllAppointments
