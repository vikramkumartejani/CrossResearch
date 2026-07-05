import React from 'react'
import Hero from '../components/Affiliate/Hero'
import LogoSlider from '../components/LogoSlider'
import CTA from '../components/Home/CTA'
import TestimonialsSection from '../components/Home/TestimonialsSection'
import TheEdgeYouareGivingThem from '../components/Affiliate/TheEdgeYouareGivingThem'
import GetInTouch from '../components/Affiliate/GetInTouch'
import ThePackage from '../components/Affiliate/ThePackage'
import WhoThisIsFor from '../components/Affiliate/WhoThisIsFor'
import PowerfulTools from '../components/Affiliate/PowerfulTools'

const page = () => {
    return (
        <div>
            <Hero />
            <LogoSlider />
            <PowerfulTools/>
            <WhoThisIsFor/>
            <ThePackage/>
            <TheEdgeYouareGivingThem />
            <TestimonialsSection />
            <GetInTouch />
            <div className='pb-16 md:pb-20 lg:pb-28 xl:pb-[170px] pt-16 lg:pt-20 xl:pt-[111px]'>
                <CTA />
            </div>
        </div>
    )
}

export default page