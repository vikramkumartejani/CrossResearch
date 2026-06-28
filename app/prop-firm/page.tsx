import Hero from '../components/BrokersAndPropFirm/Hero'
import RulesDefineSuccess from '../components/BrokersAndPropFirm/RulesDefineSuccess'
import TopPropFirm from '../components/BrokersAndPropFirm/TopPropFirm'
import CTA from '../components/Home/CTA'
import LogoSlider from '../components/LogoSlider'

const page = () => {
    return (
        <div>
            <Hero description="after testing the top prop firms and trading funded accounts onseelves we found the ones that cait truly boost your performance. For new traders or those with limited capital, prop firms can be a strong way to start and scale faster, but they require discipline, strong psychology, and solid risk management." descriptionMaxWidth="1022px" />
            <LogoSlider />
            <RulesDefineSuccess/>
            <TopPropFirm/>
            <div className='mb-[110px]'>
                <CTA />
            </div>
        </div>
    )
}

export default page