'use client';

import { useState } from 'react';

export default function ContactSection() {
    const [selectedDate, setSelectedDate] = useState(27);
    const [selectedTime, setSelectedTime] = useState('04:00 PM');

    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const calendarDates = [
        [null, null, null, 1, 2, 3, 4],
        [5, 6, 7, 8, 9, 10, 11],
        [12, 13, 14, 15, 16, 17, 18],
        [19, 20, 21, 22, 23, 24, 25],
        [26, 27, 28, 29, 30, null, null],
    ];

    const availableTimes = [
        '09:00 AM', '10:00 AM', '11:00 AM',
        '12:00 PM', '04:00 PM', '06:00 PM',
        '08:00 PM', '09:00 PM', '10:00 PM',
    ];

    return (
        <section className="relative w-full py-[120px] px-6">
            <div className="relative z-10 mx-auto max-w-[1640px]">
                {/* Top: heading left, subtext right */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-[72px]">
                    <div>
                        {/* Badge */}
                        <div className="mb-6 inline-flex">
                            <div className="bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-[16px] py-[9px] rounded-[100px] text-[18px] leading-[22px] font-normal font-inter">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="7.5" cy="7.5" r="7.5" fill="#88C4FF" />
                                    <circle cx="7.5" cy="7.5" r="5.5" fill="#21314F" />
                                    <circle cx="7.5" cy="7.5" r="3.5" fill="#88C4FF" />
                                </svg>
                                Contact Us
                            </div>
                        </div>

                        <h2 className="text-[73.18px] leading-[88px] font-normal tracking-[-2.93px] bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                            Drop Us a Message <br /> Get in touch!
                        </h2>
                    </div>

                    <div className="flex items-end pb-2 lg:pt-[80px]">
                        <p className="text-white/60 text-[22px] leading-[160%] font-normal max-w-[500px]">
                            Drop us a message and connect with our team for support, inquiries, or collaboration opportunities anytime.
                        </p>
                    </div>
                </div>

                {/* Big unified booking card */}
                <div className="bg-[#0D1B2E] border border-[#FFFFFF14] rounded-[24px] overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_320px]">
                        
                        {/* Column 1 — Profile info */}
                        <div className="border-r border-[#FFFFFF0F] p-7 flex flex-col gap-5">
                            {/* Avatar */}
                            <div
                                className="w-[60px] h-[60px] rounded-full flex items-center justify-center text-white text-[26px] font-bold flex-shrink-0"
                                style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}
                            >
                                F
                            </div>

                            <div>
                                <p className="text-white/50 text-[13px] mb-[2px]">Alex Fisher</p>
                                <h3 className="text-white text-[18px] font-semibold leading-[1.3] mb-2">
                                    Design Workshop
                                </h3>
                                <p className="text-white/40 text-[13px] leading-[1.5]">
                                    A Longer Chat To Run Through Design.
                                </p>
                            </div>

                            <div className="flex flex-col gap-[10px] mt-1">
                                {/* Duration */}
                                <div className="flex items-center gap-2 text-white/50 text-[13px]">
                                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3"/>
                                        <path d="M8 4.5V8L10.5 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                                    </svg>
                                    3 Mins
                                </div>

                                {/* Video */}
                                <div className="flex items-center gap-2 text-white/50 text-[13px]">
                                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="2.5" y="4" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.3"/>
                                        <path d="M10.5 6.5L14 5V11L10.5 9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    Call Video
                                </div>

                                {/* Timezone */}
                                <div className="flex items-center gap-2 text-white/50 text-[13px]">
                                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3"/>
                                        <path d="M2 8H14M8 2C9.5 4 10 6 10 8C10 10 9.5 12 8 14C6.5 12 6 10 6 8C6 6 6.5 4 8 2Z" stroke="currentColor" strokeWidth="1.3"/>
                                    </svg>
                                    America/New_Work
                                </div>
                            </div>
                        </div>

                        {/* Column 2 — Calendar */}
                        <div className="border-r border-[#FFFFFF0F] p-7">
                            {/* Month header */}
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-white text-[18px] font-medium">
                                    Nov <span className="text-white/40 font-normal">2026</span>
                                </h3>
                                <div className="flex gap-2">
                                    <button className="w-7 h-7 rounded-md bg-[#FFFFFF0D] hover:bg-[#FFFFFF1A] flex items-center justify-center transition-colors">
                                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 12L6 8L10 4" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </button>
                                    <button className="w-7 h-7 rounded-md bg-[#FFFFFF0D] hover:bg-[#FFFFFF1A] flex items-center justify-center transition-colors">
                                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 4L10 8L6 12" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Days of week */}
                            <div className="grid grid-cols-7 mb-2">
                                {daysOfWeek.map((day) => (
                                    <div key={day} className="text-center text-white/30 text-[11px] font-medium tracking-[0.04em] py-1">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Dates */}
                            <div className="grid grid-cols-7 gap-y-1">
                                {calendarDates.flat().map((date, i) => (
                                    <button
                                        key={i}
                                        onClick={() => date && setSelectedDate(date)}
                                        disabled={!date}
                                        className={`
                                            h-9 w-9 mx-auto rounded-full text-[13px] font-medium transition-all
                                            ${!date ? 'invisible' : ''}
                                            ${date === selectedDate
                                                ? 'bg-[#3B82F6] text-white'
                                                : 'text-white/60 hover:bg-[#FFFFFF12] hover:text-white'
                                            }
                                        `}
                                    >
                                        {date}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Column 3 — Times + Get in touch */}
                        <div className="p-7 flex flex-col gap-6">
                            {/* Available Times */}
                            <div>
                                <h4 className="text-white text-[15px] font-medium mb-4">Available Times</h4>
                                <div className="grid grid-cols-3 gap-2">
                                    {availableTimes.map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => setSelectedTime(t)}
                                            className={`
                                                px-1 py-2 rounded-lg text-[12px] font-medium transition-all whitespace-nowrap
                                                ${selectedTime === t
                                                    ? 'bg-[#3B82F6] text-white'
                                                    : 'bg-[#FFFFFF0D] text-white/60 hover:bg-[#FFFFFF18]'
                                                }
                                            `}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-[#FFFFFF0F]" />

                            {/* Get in touch */}
                            <div>
                                <h4 className="text-white text-[15px] font-medium mb-1">Get in touch</h4>
                                <p className="text-white/40 text-[12px] leading-[1.6] mb-5">
                                    Contact us for expert guidance and answers to your questions
                                </p>

                                {/* Social icons */}
                                <div className="flex gap-2 mb-5">
                                    {/* Telegram */}
                                    <a href="#" className="w-9 h-9 rounded-lg bg-[#FFFFFF0D] hover:bg-[#FFFFFF18] flex items-center justify-center transition-colors">
                                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21.8 2.9L2.3 10.4C1.1 10.9 1.1 11.6 2.1 11.9L7 13.5L18.2 6.3C18.8 5.9 19.3 6.1 18.9 6.5L9.7 14.8H9.7L9.4 19.9C9.8 19.9 10 19.7 10.2 19.5L12.5 17.3L17.4 21C18.3 21.5 19 21.2 19.2 20.1L22 4C22.3 2.6 21.4 2 21.8 2.9Z" fill="white" fillOpacity="0.6"/>
                                        </svg>
                                    </a>

                                    {/* Instagram */}
                                    <a href="#" className="w-9 h-9 rounded-lg bg-[#FFFFFF0D] hover:bg-[#FFFFFF18] flex items-center justify-center transition-colors">
                                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="1.8" strokeOpacity="0.6"/>
                                            <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.8" strokeOpacity="0.6"/>
                                            <circle cx="17.5" cy="6.5" r="1.2" fill="white" fillOpacity="0.6"/>
                                        </svg>
                                    </a>

                                    {/* LinkedIn */}
                                    <a href="#" className="w-9 h-9 rounded-lg bg-[#FFFFFF0D] hover:bg-[#FFFFFF18] flex items-center justify-center transition-colors">
                                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" fill="white" fillOpacity="0.6"/>
                                            <rect x="2" y="9" width="4" height="12" fill="white" fillOpacity="0.6"/>
                                            <circle cx="4" cy="4" r="2" fill="white" fillOpacity="0.6"/>
                                        </svg>
                                    </a>
                                </div>

                                {/* Contact Form button */}
                                <button className="w-full bg-white text-[#0a0f1a] px-5 py-[10px] rounded-[100px] text-[14px] font-medium inline-flex items-center justify-center gap-2 hover:bg-white/90 transition-colors">
                                    Contact Form
                                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
