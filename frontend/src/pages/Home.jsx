import Navbar from '../components/Navbar'
import Hero from '../components/Here'
import Blogs from '../components/Blogs'
import Fotter from '../components/Fotter'
import Features from "../components/Features"
import Stats from "../components/Stats"
import Testimonials from "../components/Testimonials"
import CallToAction from '../components/CallToAction'
import Newsletter from "../components/NewsLetter"


const Home = () => {
  return (
    <>
      <Navbar/>
      <Hero/>
      <Blogs/>
      <Features />
      <Stats />
      <Testimonials />
      <CallToAction />
      <Newsletter />
      <Fotter/>
    </>
  )
}

export default Home