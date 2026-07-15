'use client'
import { useRef, useEffect, useState } from 'react'

// Simple sparkline data matching the image shape (drops sharply then flattens low with a bump at end)
const SPARKLINE_DATA = [3.4, 3.1, 2.6, 2.2, 1.8, 1.4, 1.1, 0.9, 0.88, 0.88, 0.88, 0.88, 0.88, 0.90, 0.88, 0.92, 0.88, 0.90, 0.91, 0.88, 0.95, 0.88]
const X_LABELS = ['-48', '-36', '-24', '-12']

function Sparkline({ data }: { data: number[] }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const dpr = window.devicePixelRatio || 1
        const W = canvas.offsetWidth
        const H = canvas.offsetHeight
        canvas.width = W * dpr
        canvas.height = H * dpr
        ctx.scale(dpr, dpr)

        const min = Math.min(...data)
        const max = Math.max(...data)
        const range = max - min || 1
        const padT = 6
        const padB = 6

        const xStep = W / (data.length - 1)

        const toY = (v: number) => padT + ((max - v) / range) * (H - padT - padB)

        // Gradient fill
        const grad = ctx.createLinearGradient(0, 0, 0, H)
        grad.addColorStop(0, 'rgba(136,196,255,0.18)')
        grad.addColorStop(1, 'rgba(136,196,255,0)')

        ctx.beginPath()
        data.forEach((v, i) => {
            const x = i * xStep
            const y = toY(v)
            if (i === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
        })
        // close fill path
        const fillPath = new Path2D()
        data.forEach((v, i) => {
            const x = i * xStep
            const y = toY(v)
            if (i === 0) fillPath.moveTo(x, y)
            else fillPath.lineTo(x, y)
        })
        fillPath.lineTo((data.length - 1) * xStep, H)
        fillPath.lineTo(0, H)
        fillPath.closePath()
        ctx.fillStyle = grad
        ctx.fill(fillPath)

        // Line
        ctx.beginPath()
        data.forEach((v, i) => {
            const x = i * xStep
            const y = toY(v)
            if (i === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
        })
        ctx.strokeStyle = '#88C4FF'
        ctx.lineWidth = 1.5
        ctx.stroke()

        // End dot
        const lastX = (data.length - 1) * xStep
        const lastY = toY(data[data.length - 1])
        ctx.beginPath()
        ctx.arc(lastX, lastY, 4, 0, Math.PI * 2)
        ctx.fillStyle = '#ffffff'
        ctx.fill()
        ctx.strokeStyle = '#88C4FF'
        ctx.lineWidth = 1.5
        ctx.stroke()
    }, [data])

    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
}

export default function BeliefShockDetection() {
    return (
        <div className="bg-[#16161F] p-4 flex flex-col">
            {/* Tag */}
            <p className="text-[#838388] text-[12px] leading-[17px] font-normal mb-2">01 / Conviction</p>

            {/* Title */}
            <h3 className="text-white text-[18px] leading-[22px] font-medium mb-2">Belief Shock Detection</h3>

            {/* Description */}
            <p className="text-[#838388] text-[12px] leading-[17px] mb-4">
                A statistically tuned filter on cross-venue probability moves. We surface only moves that break through structural thresholds.
            </p>

            <div className="flex flex-1 min-h-0">
                {/* <div className="flex flex-col justify-between text-left flex-shrink-0 max-h-[160px]">
                    {['3.4', '2.55', '1.7', '0.85', '0'].map((v) => (
                        <span key={v} className="text-[#838388] text-[12px] leading-[14px] font-normal">{v}</span>
                    ))}
                </div>

                <div className="flex-1 flex flex-col min-w-0">
                    <svg width="474" height="158" viewBox="0 0 474 158" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.8">
                            <path floodOpacity="evenodd" clipRule="evenodd" d="M10 10V11L474 11V10L10 10Z" fill="white" fillOpacity="0.1" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M10 59V60L474 60V59L10 59Z" fill="white" fillOpacity="0.1" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M10 108V109L474 109V108L10 108Z" fill="white" fillOpacity="0.1" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M10 157V158L474 158V157L10 157Z" fill="white" fillOpacity="0.5" />
                        </g>
                        <rect x="10" y="123.521" width="461.969" height="34.4793" fill="url(#paint0_linear_584_5014)" />
                        <path d="M310.352 123.536H426.579C428.789 123.536 430.579 125.327 430.579 127.536V139.862C430.579 142.071 432.37 143.862 434.579 143.862H471.005" stroke="white" strokeOpacity="0.1" strokeWidth="3" stroke-dasharray="6 6" />
                        <path d="M29.2571 74.6945L30.7131 74.3693L30.7108 74.3597L30.7083 74.3502L29.2571 74.6945ZM292.488 121.752L293.608 120.784L292.488 121.752ZM253.48 112.86L254.621 113.862L253.48 112.86ZM245.637 121.841L244.496 120.839L245.637 121.841ZM196.196 120.659L197.573 120.1L196.196 120.659ZM190.225 106.675L188.847 107.233L190.225 106.675ZM179.996 103.473L179.183 104.713L179.996 103.473ZM151.521 100.822L152.857 101.54L151.521 100.822ZM140.985 121.082L139.65 120.365L140.985 121.082ZM70.1069 121.323L68.8878 122.166L70.1069 121.323ZM284.809 112.949L283.689 113.918L284.809 112.949ZM42.473 110.507L42.1192 109.042L42.473 110.507ZM29.2571 74.6945L30.7083 74.3502L13.4825 8.42713L12.0312 8.77148L10.58 9.11584L27.8058 75.0389L29.2571 74.6945ZM29.2571 74.6945L27.801 75.0197L35.8926 107.71L37.3487 107.385L38.8048 107.06L30.7131 74.3693L29.2571 74.6945ZM42.473 110.507L42.8267 111.973C46.1891 111.243 50.1876 110.636 53.7127 110.635C55.4757 110.635 57.0652 110.787 58.373 111.122C59.6933 111.461 60.6015 111.954 61.1511 112.542L62.2355 111.534L63.32 110.525C62.214 109.342 60.678 108.636 59.0499 108.218C57.4093 107.797 55.546 107.636 53.6362 107.636C49.8157 107.637 45.5885 108.288 42.1192 109.042L42.473 110.507ZM62.2355 111.534L61.1511 112.542C64.2238 115.83 67.1147 119.653 68.8878 122.166L70.1069 121.323L71.3259 120.48C69.5083 117.903 66.526 113.956 63.32 110.525L62.2355 111.534ZM73.5776 123.167L73.6155 124.667H137.564L137.526 123.167L137.488 121.668H73.5397L73.5776 123.167ZM140.985 121.082L142.321 121.8L152.857 101.54L151.521 100.822L150.186 100.104L139.65 120.365L140.985 121.082ZM154.981 98.737L155.019 100.237H171.718L171.68 98.737L171.642 97.2375H154.943L154.981 98.737ZM173.948 99.4296L173.135 100.669L179.183 104.713L179.996 103.473L180.808 102.234L174.76 98.1898L173.948 99.4296ZM182.263 104.166L182.301 105.665H186.488L186.45 104.166L186.412 102.666H182.225L182.263 104.166ZM190.225 106.675L188.847 107.233L194.818 121.217L196.196 120.659L197.573 120.1L191.603 106.116L190.225 106.675ZM199.971 123.167L200.009 124.667H242.733L242.695 123.167L242.657 121.668H199.933L199.971 123.167ZM245.637 121.841L246.779 122.843L254.621 113.862L253.48 112.86L252.339 111.858L244.496 120.839L245.637 121.841ZM256.422 111.534L256.46 113.033H281.758L281.72 111.534L281.682 110.034H256.384L256.422 111.534ZM284.809 112.949L283.689 113.918L291.367 122.721L292.488 121.752L293.608 120.784L285.929 111.98L284.809 112.949ZM295.576 123.167L295.614 124.667H319.65L319.612 123.167L319.575 121.668H295.538L295.576 123.167ZM292.488 121.752L291.367 122.721C292.444 123.955 293.997 124.667 295.614 124.667L295.576 123.167L295.538 121.668C294.803 121.668 294.097 121.344 293.608 120.784L292.488 121.752ZM253.48 112.86L254.621 113.862C255.082 113.335 255.75 113.033 256.46 113.033L256.422 111.534L256.384 110.034C254.823 110.034 253.352 110.697 252.339 111.858L253.48 112.86ZM242.695 123.167L242.733 124.667C244.294 124.667 245.765 124.004 246.779 122.843L245.637 121.841L244.496 120.839C244.035 121.366 243.367 121.668 242.657 121.668L242.695 123.167ZM196.196 120.659L194.818 121.217C195.707 123.301 197.763 124.667 200.009 124.667L199.971 123.167L199.933 121.668C198.912 121.668 197.978 121.047 197.573 120.1L196.196 120.659ZM186.45 104.166L186.488 105.665C187.509 105.665 188.443 106.286 188.847 107.233L190.225 106.675L191.603 106.116C190.713 104.032 188.658 102.666 186.412 102.666L186.45 104.166ZM179.996 103.473L179.183 104.713C180.111 105.334 181.198 105.665 182.301 105.665L182.263 104.166L182.225 102.666C181.724 102.666 181.23 102.516 180.808 102.234L179.996 103.473ZM151.521 100.822L152.857 101.54C153.274 100.736 154.104 100.237 155.019 100.237L154.981 98.737L154.943 97.2375C152.93 97.2375 151.105 98.3371 150.186 100.104L151.521 100.822ZM137.526 123.167L137.564 124.667C139.577 124.667 141.402 123.567 142.321 121.8L140.985 121.082L139.65 120.365C139.233 121.168 138.403 121.668 137.488 121.668L137.526 123.167ZM70.1069 121.323L68.8878 122.166C69.9652 123.693 71.719 124.667 73.6155 124.667L73.5776 123.167L73.5397 121.668C72.6851 121.668 71.853 121.227 71.3259 120.48L70.1069 121.323ZM171.68 98.737L171.718 100.237C172.22 100.237 172.713 100.387 173.135 100.669L173.948 99.4296L174.76 98.1898C173.832 97.5693 172.746 97.2375 171.642 97.2375L171.68 98.737ZM281.72 111.534L281.758 113.033C282.493 113.033 283.199 113.357 283.689 113.918L284.809 112.949L285.929 111.98C284.853 110.746 283.3 110.034 281.682 110.034L281.72 111.534ZM37.3487 107.385L35.8926 107.71C36.663 110.823 39.8432 112.621 42.8267 111.973L42.473 110.507L42.1192 109.042C40.6217 109.367 39.1479 108.446 38.8048 107.06L37.3487 107.385Z" fill="#88C4FF" />
                        <g filter="url(#filter0_dd_584_5014)">
                            <rect x="312" y="115.464" width="16" height="16" rx="8" fill="white" />
                            <rect x="313" y="116.464" width="14" height="14" rx="7" stroke="#2A2A2A" strokeWidth="2" />
                        </g>
                        <g filter="url(#filter1_dd_584_5014)">
                            <rect x="4" y="2" width="16" height="16" rx="8" fill="white" />
                            <rect x="5" y="3" width="14" height="14" rx="7" stroke="#2A2A2A" strokeWidth="2" />
                        </g>
                        <defs>
                            <filter id="filter0_dd_584_5014" x="308" y="113.464" width="24" height="24" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="2" />
                                <feGaussianBlur stdDeviation="2" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0.196487 0 0 0 0 0.196487 0 0 0 0 0.279476 0 0 0 0.06 0" />
                                <feBlend mode="multiply" in2="BackgroundImageFix" result="effect1_dropShadow_584_5014" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="2" />
                                <feGaussianBlur stdDeviation="1" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0.196487 0 0 0 0 0.196487 0 0 0 0 0.279476 0 0 0 0.06 0" />
                                <feBlend mode="multiply" in2="effect1_dropShadow_584_5014" result="effect2_dropShadow_584_5014" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_584_5014" result="shape" />
                            </filter>
                            <filter id="filter1_dd_584_5014" x="0" y="0" width="24" height="24" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="2" />
                                <feGaussianBlur stdDeviation="2" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0.196487 0 0 0 0 0.196487 0 0 0 0 0.279476 0 0 0 0.06 0" />
                                <feBlend mode="multiply" in2="BackgroundImageFix" result="effect1_dropShadow_584_5014" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="2" />
                                <feGaussianBlur stdDeviation="1" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0.196487 0 0 0 0 0.196487 0 0 0 0 0.279476 0 0 0 0.06 0" />
                                <feBlend mode="multiply" in2="effect1_dropShadow_584_5014" result="effect2_dropShadow_584_5014" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_584_5014" result="shape" />
                            </filter>
                            <linearGradient id="paint0_linear_584_5014" x1="240.985" y1="123.521" x2="240.985" y2="158" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#88C4FF" stop-opacity="0.15" />
                                <stop offset="1" stop-color="#88C4FF" stop-opacity="0" />
                            </linearGradient>
                        </defs>
                    </svg>

                    <div className="flex justify-between">
                        {X_LABELS.map((l) => (
                            <span key={l} className="text-[#838388] text-[12px] leading-[14px] font-normal">{l}</span>
                        ))}
                    </div>
                </div> */}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
                <span className="text-[#838388] text-[12px] leading-[14px]">Last 48h · 2h buckets</span>
                <span className="text-[#88C4FF] text-[12px] leading-[14px] font-medium">
                    3 structural shocks
                </span>
            </div>
        </div>
    )
}
