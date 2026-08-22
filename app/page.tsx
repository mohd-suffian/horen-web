import Hero        from '@/components/sections/Hero'
import StatsBar    from '@/components/sections/StatsBar'
import TrustStrip  from '@/components/sections/TrustStrip'
import Programmes  from '@/components/sections/Programmes'
import WhyHoren    from '@/components/sections/WhyHoren'
import AboutStrip  from '@/components/sections/AboutStrip'
import Testimonials from '@/components/sections/Testimonials'
import CtaBlock    from '@/components/sections/CtaBlock'

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <TrustStrip />
      <Programmes />
      <WhyHoren />
      <AboutStrip />
      <Testimonials />
      <CtaBlock />
    </>
  )
}
