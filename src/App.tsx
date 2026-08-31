import { Analytics } from '@vercel/analytics/react'
import { Header } from './components/layout/Header/Header'
import { Footer } from './components/layout/Footer/Footer'
import { Hero } from './components/sections/Hero/Hero'
import { Problem } from './components/sections/Problem/Problem'
import { Context } from './components/sections/Context/Context'
import { HowItWorks } from './components/sections/HowItWorks/HowItWorks'
import { ProductPreview } from './components/sections/ProductPreview/ProductPreview'
import { Personalization } from './components/sections/Personalization/Personalization'
import { Assistant } from './components/sections/Assistant/Assistant'
import { NutritionLoop } from './components/sections/NutritionLoop/NutritionLoop'
import { Safety } from './components/sections/Safety/Safety'
import { FinalCTA } from './components/sections/FinalCTA/FinalCTA'

function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Перейти к содержимому
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <Problem />
        <Context />
        <HowItWorks />
        <ProductPreview />
        <Personalization />
        <Assistant />
        <NutritionLoop />
        <Safety />
        <FinalCTA />
      </main>
      <Footer />
      <Analytics />
    </>
  )
}

export default App
