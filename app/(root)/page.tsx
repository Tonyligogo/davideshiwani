import HireMeSection from './components/hire-me-section'
import HeroSection from './components/landing-page-sections/hero-section'
import AboutSection from './components/landing-page-sections/about-section'
import ToolsSection from './components/landing-page-sections/tools-section'
import AllProjects from './components/landing-page-sections/all-projects'
import BlogsSection from './components/landing-page-sections/blogs-section'

const Home = () => {
  return (
    <main className='bg-black relative grid-bg'
    >
        <HeroSection/>
        <AboutSection/>
        <ToolsSection/>
        <AllProjects/>
        <BlogsSection/>
        <HireMeSection/>
    </main>
  )
}

export default Home

 