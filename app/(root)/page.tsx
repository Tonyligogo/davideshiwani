import IntroSection from './components/intro-section'
import SkillsSection from './components/skills-section'
import HireMeSection from './components/hire-me-section'
import Hero from './components/hero'
import ProjectsSection from './components/projects'

const Home = () => {
  return (
    <main>
        <Hero/>
        <IntroSection/>
        <SkillsSection/>
        <ProjectsSection/>
        <HireMeSection/>
    </main>
  )
}

export default Home