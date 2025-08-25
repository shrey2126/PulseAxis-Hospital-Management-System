import { assets } from '../assets/assets'
import { MapPin, Phone, Mail, Briefcase } from 'lucide-react' // icons

const Contact = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen px-6 md:px-20">

      {/* Heading */}
      <div 
        className="text-center text-3xl pt-10 text-teal-500 font-light tracking-wider"
        data-aos="fade-down"
      >
        <p>
          CONTACT <span className="text-gray-800 font-semibold">US</span>
        </p>
        <div 
          className="w-20 h-1 bg-black mx-auto mt-3 rounded" 
          data-aos="zoom-in"
          data-aos-delay="200"
        ></div>
      </div>

      {/* Main Content */}
      <div 
        className="my-16 flex flex-col justify-center md:flex-row gap-12 mb-28 items-center"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        
        {/* Left Image */}
        <img 
          className="w-full md:max-w-[400px] rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500" 
          src={assets.contact_image} 
          alt="Contact Us"
          data-aos="zoom-in-right"
          data-aos-delay="400"
        />

        {/* Right Content */}
        <div 
          className="flex flex-col justify-center items-start gap-6 bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-md w-full md:w-[450px]"
          data-aos="zoom-in-left"
          data-aos-delay="500"
        >
          
          <p className="font-semibold text-xl text-gray-700 flex items-center gap-2">
            <MapPin size={22} /> OUR OFFICE
          </p>
          <p className="text-gray-500 leading-relaxed">
            Bhakti Circle <br /> Nikol , Ahmedabad.
          </p>

          <p className="font-semibold text-xl text-gray-700 flex items-center gap-2">
            <Phone size={22} /> CONTACT
          </p>
          <p className="text-gray-500">
            Tel: (+123) 456-7890 <br /> 
            <Mail className="inline mr-2" size={18}/> pulseaxishospitals@gmail.com
          </p>

          <p className="font-semibold text-xl text-gray-700 flex items-center gap-2">
            <Briefcase size={22} /> CAREERS
          </p>
          <p className="text-gray-500">Learn more about our teams and job openings.</p>
          
          <button 
            className="border border-black px-8 py-3 text-sm font-medium rounded-xl hover:bg-cyan-500 hover:text-white transition-all duration-500"
            data-aos="flip-up"
            data-aos-delay="600"
          >
            Explore Jobs
          </button>
        </div>
      </div>

    </div>
  )
}

export default Contact
