import CostsDefineProfit from '../components/BrokersAndPropFirm/CostsDefineProfit'
import Hero from '../components/BrokersAndPropFirm/Hero'
import TopRatedBrokers from '../components/BrokersAndPropFirm/TopRatedBrokers'
import CTA from '../components/Home/CTA'
import LogoSlider from '../components/LogoSlider'

const page = () => {
    return (
        <div>
            <Hero description="After years testing top brokers, we found one maximizing profits through low commissions and fast execution. Want details? Message us or sign up below." />
            <LogoSlider />
            <CostsDefineProfit/>
            <TopRatedBrokers/>
            <div className='mb-[110px]'>
                <CTA />
            </div>
        </div>
    )
}

export default page