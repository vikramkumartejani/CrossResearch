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

            {/* Ellipse 14 — left glow + Ellipse 13 — right glow (between LogoSlider & CostsDefineProfit) */}
            <div className="relative">
                <div aria-hidden="true" className="absolute pointer-events-none" style={{
                    width: '833px', height: '533px',
                    left: '-339px', top: '-200px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    filter: 'blur(250px)',
                    zIndex: 0,
                }} />
                <div aria-hidden="true" className="absolute pointer-events-none" style={{
                    width: '833px', height: '533px',
                    right: '-339px', top: '-200px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    filter: 'blur(250px)',
                    zIndex: 0,
                }} />
                <div className="relative" style={{ zIndex: 1 }}>
                    <CostsDefineProfit/>
                </div>
            </div>
            {/* Ellipse 1 (left) + Ellipse 2 (right) — top of TopRatedBrokers */}
            <div className="relative">
                <div aria-hidden="true" className="absolute pointer-events-none" style={{
                    width: '977px', height: '625px',
                    left: '-305px', top: '100px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    filter: 'blur(250px)',
                    zIndex: 0,
                }} />
                <div aria-hidden="true" className="absolute pointer-events-none" style={{
                    width: '977px', height: '669.55px',
                    right: '-305px', top: '100px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    filter: 'blur(250px)',
                    transform: 'rotate(-26.89deg)',
                    zIndex: 0,
                }} />
                <div className="relative bg-[#FFFFFF03]" style={{ zIndex: 1 }}>
                    <TopRatedBrokers/>
                </div>
            </div>
            <div className='mb-[110px] pt-[105px] relative'>
                {/* Ellipse 3 — left bottom glow */}
                <div aria-hidden="true" className="absolute pointer-events-none" style={{
                    width: '977px', height: '446px',
                    left: '-512px', bottom: '-300px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    filter: 'blur(250px)',
                    transform: 'rotate(-20.7deg)',
                    zIndex: 0,
                }} />
                {/* Ellipse 12 — right bottom glow */}
                <div aria-hidden="true" className="absolute pointer-events-none" style={{
                    width: '977px', height: '446px',
                    right: '-512px', bottom: '-300px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    filter: 'blur(250px)',
                    transform: 'rotate(-20.7deg)',
                    zIndex: 0,
                }} />
                <div className="relative" style={{ zIndex: 1 }}>
                    <CTA />
                </div>
            </div>
        </div>
    )
}

export default page