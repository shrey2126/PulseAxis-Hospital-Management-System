import { assets } from '../assets/assets'
import { HeartPulse, Clock, Users } from "lucide-react";

const About = () => {
  return (
    <div className="px-6 md:px-12 lg:px-20 py-12">

      {/* Header */}
      <div className="text-center mb-12" data-aos="fade-up">
        <h2 className="text-4xl font-bold text-gray-800">
          About <span className="text-teal-500">PulseAxis</span>
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          PulseAxis is your trusted healthcare partner, combining technology with care to
          bring doctors and patients closer than ever before.
        </p>
      </div>

      {/* About Content */}
      <div className="my-10 flex flex-col md:flex-row gap-12 items-center">
        <img 
          className="w-full md:max-w-[400px] rounded-xl shadow-lg hover:scale-105 transition-transform duration-500" 
          src={assets.about_image} 
          alt="About PulseAxis"
          data-aos="fade-right" 
        />
        <div 
          className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 text-lg leading-relaxed"
          data-aos="fade-left"
        >
          <p>
            At <span className="font-semibold text-teal-600">PulseAxis</span>, we understand the 
            challenges of scheduling doctor appointments, managing health records, and finding 
            the right specialists. Our platform simplifies this process, empowering patients 
            with easy access to care while supporting doctors with seamless management tools.
          </p>
          <p>
            We are committed to continuous innovation in healthcare technology. Whether you are 
            booking your first appointment or tracking ongoing care, PulseAxis ensures 
            <span className="font-semibold text-gray-800"> efficiency, trust, and personalized healthcare</span> 
            every step of the way.
          </p>
          <b className="text-gray-900 text-xl">Our Vision</b>
          <p>
            To bridge the gap between patients and healthcare providers, creating a 
            <span className="font-semibold text-teal-600"> connected, smart, and accessible healthcare ecosystem</span> 
            for all.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-center my-12" data-aos="fade-up">
        <h3 className="text-3xl font-bold text-gray-800">
          Why <span className="text-teal-500">Choose Us?</span>
        </h3>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-20">
        <div 
          className="border rounded-2xl p-8 flex flex-col items-center text-center gap-5 
                     hover:bg-teal-500 hover:text-white transition-all duration-300 shadow-md"
          data-aos="zoom-in" data-aos-delay="100"
        >
          <Clock className="w-12 h-12 text-teal-500 hover:text-white transition-colors" />
          <b className="text-lg">Efficiency</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>

        <div 
          className="border rounded-2xl p-8 flex flex-col items-center text-center gap-5 
                     hover:bg-teal-500 hover:text-white transition-all duration-300 shadow-md"
          data-aos="zoom-in" data-aos-delay="200"
        >
          <Users className="w-12 h-12 text-teal-500 hover:text-white transition-colors" />
          <b className="text-lg">Convenience</b>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>

        <div 
          className="border rounded-2xl p-8 flex flex-col items-center text-center gap-5 
                     hover:bg-teal-500 hover:text-white transition-all duration-300 shadow-md"
          data-aos="zoom-in" data-aos-delay="300"
        >
          <HeartPulse className="w-12 h-12 text-teal-500 hover:text-white transition-colors" />
          <b className="text-lg">Personalization</b>
          <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>
    </div>
  )
}

export default About;
