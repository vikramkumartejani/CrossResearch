import React from 'react'
import CTA from '../components/Home/CTA'

const page = () => {
    return (
        <div>
            <div className='relative pb-14 sm:pb-20 xl:pb-[170px] pt-10 sm:pt-[111px]'>
                {/* Ellipse 19 — left glow */}
                <div aria-hidden="true" className="lg:block hidden absolute pointer-events-none" style={{
                    width: '977px', height: '446px',
                    left: '-465px', bottom: '-600px',
                    background: 'rgba(34, 126, 217, 0.4)',
                    filter: 'blur(250px)',
                    transform: 'rotate(-20.7deg)',
                    zIndex: 0,
                }} />

                {/* Ellipse 20 — right glow */}
                <div aria-hidden="true" className="absolute pointer-events-none h-[300px] md:h-[446px] w-[400px] md:w-[977px] right-[-200px] md:right-[-465px] blur-[80px] md:blur-[250px]" style={{
                    bottom: '-320px',
                    background: 'rgba(34, 126, 217, 0.4)',
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