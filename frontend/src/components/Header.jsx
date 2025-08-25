import { assets } from '../assets/assets'

const Header = () => {
    return (
        <div>
            {/* --------- Video Section --------- */}
            <div className="w-full h-[250px] sm:h-[350px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg mb-6">
                <video 
                    className="w-full h-full object-cover"
                    src="/src/assets/hospital_intro.mp4"  // <-- place your video in public/videos
                    autoPlay
                    loop
                    muted
                    playsInline
                />
            </div>

            {/* --------- Header Section --------- */}
            <div className='flex flex-col md:flex-row flex-wrap bg-teal-500 rounded-lg px-6 md:px-10 lg:px-20 '>
                
                {/* Header Left */}
                <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
                    <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
                       Redefining Healthcare <br />  for a Healthier Tomorrow
                    </p>
                    <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
                        <img className='w-28' src={assets.group_profiles} alt="" />
                        <p>
                            Seamless access to expert doctors, advanced care, 
                            <br className='hidden sm:block' /> 
                            and a healthier life with PulseAxis.
                        </p>
                    </div>
                    <a 
                        href='#speciality' 
                        className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-black text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'
                    >
                        Book appointment <img className='w-3' src={assets.arrow_icon} alt="" />
                    </a>
                </div>

                {/* Header Right */}
                <div className='md:w-1/2 relative'>
                    <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Header
