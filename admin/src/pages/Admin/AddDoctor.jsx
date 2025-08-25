import { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')

  const { backendUrl } = useContext(AppContext)
  const { aToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (!docImg) {
        return toast.error('Image Not Selected')
      }

      const formData = new FormData()
      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', Number(fees))
      formData.append('about', about)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

      const { data } = await axios.post(
        backendUrl + '/api/admin/add-doctor',
        formData,
        { headers: { aToken } }
      )

      if (data.success) {
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setPassword('')
        setEmail('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setAbout('')
        setFees('')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className="m-5 w-full flex flex-col items-center"
    >
      <h2 className="mb-6 text-2xl font-bold text-gray-800">➕ Add New Doctor</h2>

      <div className="bg-white px-8 py-8 border rounded-xl shadow-md w-full max-w-5xl">
        {/* Upload Section */}
        <div className="flex items-center gap-6 mb-10 text-gray-600">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              className="w-20 h-20 bg-gray-100 rounded-full object-cover border"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Upload"
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p className="text-sm text-gray-500">
            Upload doctor’s profile picture
          </p>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="border rounded-lg px-3 py-2 w-full"
                type="text"
                placeholder="Dr. John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border rounded-lg px-3 py-2 w-full"
                type="email"
                placeholder="doctor@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border rounded-lg px-3 py-2 w-full"
                type="password"
                placeholder="Set password"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Experience</label>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="border rounded-lg px-3 py-2 w-full"
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
                <option value="4 Years">4 Years</option>
                <option value="5 Years">5 Years</option>
                <option value="6 Years">6 Years</option>
                <option value="7 Years">7 Years</option>
                <option value="8 Years">8 Years</option>
                <option value="9 Years">9 Years</option>
                <option value="10 Years">10 Years</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Fees</label>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                className="border rounded-lg px-3 py-2 w-full"
                type="number"
                placeholder="Consultation fees"
                required
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium">Speciality</label>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className="border rounded-lg px-3 py-2 w-full"
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Degree</label>
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                className="border rounded-lg px-3 py-2 w-full"
                type="text"
                placeholder="MBBS, MD, etc."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Address</label>
              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                className="border rounded-lg px-3 py-2 w-full mb-2"
                type="text"
                placeholder="Address line 1"
                required
              />
              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                className="border rounded-lg px-3 py-2 w-full"
                type="text"
                placeholder="Address line 2"
                required
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-6">
          <label className="block text-sm font-medium">About Doctor</label>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className="w-full border rounded-lg px-3 py-2"
            rows={4}
            placeholder="Write a short description about the doctor..."
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 transition text-white px-8 py-3 rounded-full font-semibold shadow-md"
          >
            Add Doctor
          </button>
        </div>
      </div>
    </form>
  )
}

export default AddDoctor
