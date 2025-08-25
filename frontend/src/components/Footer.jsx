import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-base'>

        {/* Logo + About */}
        <div>
          <img className='mb-5 w-44 sm:w-52' src={assets.logo} alt="PulseAxis Logo" />
          <p className='w-full md:w-2/3 text-gray-600 leading-7 text-sm sm:text-base'>
            <span className="font-semibold text-cyan-500">PulseAxis</span> is your trusted healthcare partner, 
            connecting patients with top doctors across multiple specialities.  
            Our mission is to make healthcare simple, accessible, and reliable for everyone.  
            Book appointments, explore medical services, and manage your health — all in one place.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className='text-2xl font-semibold mb-5 text-gray-800'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600 text-sm sm:text-base hover:[&>li]:text-primary cursor-pointer'>
            <li>Home</li>
            <li>About Us</li>
            <li>Services</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className='text-2xl font-semibold mb-5 text-gray-800'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600 text-sm sm:text-base'>
            <li>📞 +1-212-456-7890</li>
            <li>📧 support@pulseaxis.com</li>
            <li>📍 Bhakti Circle, Nikol, Ahmedabad-382350</li>
          </ul>
        </div>

      </div>

      {/* Bottom Strip */}
      <div>
        <hr className='border-gray-300' />
        <p className='py-5 text-sm sm:text-base text-gray-600 text-center'>
          © 2024 <span className="font-semibold text-cyan-500">PulseAxis</span> — All Rights Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer
