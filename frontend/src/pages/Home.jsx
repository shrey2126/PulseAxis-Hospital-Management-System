import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div>
      <div data-aos="fade-down" data-aos-duration="1000">
        <Header />
      </div>

      <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
        <SpecialityMenu />
      </div>

      <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
        <TopDoctors />
      </div>

      <div data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="600">
        <Banner />
      </div>
    </div>
  )
}

export default Home
