'use client';

import Image from '@/lib/CldImage';
import { useEffect, useMemo, useState } from 'react';
import CalendlyButton from '@/app/components/CalendlyButton';
import {
    openCalendlyPopup,
    getCalendlyUrl,
    type CalendlySlot,
} from '@/lib/calendly';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

type LiveTime = { start: string; label: string };

function startOfDay(d: Date) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function buildMonthGrid(year: number, monthIndex: number): (number | null)[] {
    const first = new Date(year, monthIndex, 1);
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const startPad = first.getDay(); // 0 = Sun
    const cells: (number | null)[] = [];
    for (let i = 0; i < startPad; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
}

function todayParts() {
    const now = new Date();
    return { year: now.getFullYear(), monthIndex: now.getMonth(), day: now.getDate() };
}

function pad2(n: number) {
    return String(n).padStart(2, '0');
}

function browserTimeZone() {
    try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York';
    } catch {
        return 'America/New_York';
    }
}

export default function ContactSection() {
    const initial = todayParts();
    const [viewYear, setViewYear] = useState(initial.year);
    const [viewMonthIndex, setViewMonthIndex] = useState(initial.monthIndex);
    const [selectedYear, setSelectedYear] = useState(initial.year);
    const [selectedMonthIndex, setSelectedMonthIndex] = useState(initial.monthIndex);
    const [selectedDay, setSelectedDay] = useState(initial.day);
    const [selectedStart, setSelectedStart] = useState<string | null>(null);
    const [selectedLabel, setSelectedLabel] = useState<string>('');
    const [liveTimes, setLiveTimes] = useState<LiveTime[]>([]);
    const [availableDates, setAvailableDates] = useState<Set<string>>(new Set());
    const [timesLoading, setTimesLoading] = useState(false);
    const [timesError, setTimesError] = useState<string | null>(null);
    const [tz] = useState(browserTimeZone);

    const calendarCells = useMemo(
        () => buildMonthGrid(viewYear, viewMonthIndex),
        [viewYear, viewMonthIndex]
    );

    const today = startOfDay(new Date());
    const selectedDateStr = `${selectedYear}-${pad2(selectedMonthIndex + 1)}-${pad2(selectedDay)}`;
    const viewMonthStr = `${viewYear}-${pad2(viewMonthIndex + 1)}`;

    const slot: CalendlySlot | null = selectedStart
        ? {
              year: selectedYear,
              month: selectedMonthIndex + 1,
              day: selectedDay,
              timeLabel: selectedLabel,
              timeZone: tz,
              startIso: selectedStart,
          }
        : null;

    // Month availability (which days have open slots)
    useEffect(() => {
        let cancelled = false;
        async function loadMonth() {
            try {
                const res = await fetch(
                    `/api/calendly/availability?month=${encodeURIComponent(viewMonthStr)}&timezone=${encodeURIComponent(tz)}`,
                    { cache: 'no-store' }
                )
                const body = await res.json().catch(() => ({}))
                if (cancelled) return
                const next = new Set<string>()
                for (const d of body.days || []) {
                    if (d?.available && d?.date) next.add(d.date)
                }
                setAvailableDates(next)
            } catch {
                if (!cancelled) setAvailableDates(new Set())
            }
        }
        void loadMonth()
        return () => {
            cancelled = true
        }
    }, [viewMonthStr, tz])

    // Day times
    useEffect(() => {
        let cancelled = false
        async function loadTimes() {
            setTimesLoading(true)
            setTimesError(null)
            setLiveTimes([])
            setSelectedStart(null)
            setSelectedLabel('')
            try {
                const res = await fetch(
                    `/api/calendly/availability?date=${encodeURIComponent(selectedDateStr)}&timezone=${encodeURIComponent(tz)}`,
                    { cache: 'no-store' }
                )
                const body = await res.json().catch(() => ({}))
                if (cancelled) return
                if (!res.ok) {
                    setTimesError(typeof body.error === 'string' ? body.error : 'Could not load times')
                    return
                }
                const times = Array.isArray(body.times) ? (body.times as LiveTime[]) : []
                setLiveTimes(times)
                if (times.length) {
                    setSelectedStart(times[0].start)
                    setSelectedLabel(times[0].label)
                }
            } catch {
                if (!cancelled) setTimesError('Could not load available times')
            } finally {
                if (!cancelled) setTimesLoading(false)
            }
        }
        void loadTimes()
        return () => {
            cancelled = true
        }
    }, [selectedDateStr, tz])

    function shiftMonth(delta: number) {
        const d = new Date(viewYear, viewMonthIndex + delta, 1);
        setViewYear(d.getFullYear());
        setViewMonthIndex(d.getMonth());
    }

    function pickDay(day: number) {
        setSelectedYear(viewYear);
        setSelectedMonthIndex(viewMonthIndex);
        setSelectedDay(day);
    }

    function isPastDay(day: number) {
        const cell = startOfDay(new Date(viewYear, viewMonthIndex, day));
        return cell.getTime() < today.getTime();
    }

    function dayHasSlots(day: number) {
        const key = `${viewYear}-${pad2(viewMonthIndex + 1)}-${pad2(day)}`;
        // Until month data loads, allow clicking future weekdays
        if (availableDates.size === 0) return true;
        return availableDates.has(key);
    }

    async function bookSlot(time?: LiveTime) {
        const pick = time || (selectedStart && selectedLabel
            ? { start: selectedStart, label: selectedLabel }
            : null);
        if (!pick) return;
        setSelectedStart(pick.start);
        setSelectedLabel(pick.label);
        const nextSlot: CalendlySlot = {
            year: selectedYear,
            month: selectedMonthIndex + 1,
            day: selectedDay,
            timeLabel: pick.label,
            timeZone: tz,
            startIso: pick.start,
        };
        const opened = await openCalendlyPopup(getCalendlyUrl(), nextSlot).catch(() => false);
        if (!opened) {
            const url = getCalendlyUrl();
            if (url) window.open(url, '_blank', 'noopener,noreferrer');
        }
    }

    return (
        <section id="contact" className="relative w-full pt-20 lg:pt-[120px] xl:pt-[170px] px-4 sm:px-6">
            {/* Ellipse 6 – left glow */}
            <div
                aria-hidden="true"
                className="lg:block hidden absolute pointer-events-none z-0 w-[500px] h-[230px] md:w-[700px] md:h-[320px] lg:w-[977.2px] lg:h-[446.65px]
                        -left-48 md:-left-64 lg:-left-[400px] top-[400px] sm:top-[200px] -rotate-[20.4deg] bg-[#227ED966]
                       blur-[160px] md:blur-[200px] lg:blur-[250px]"
            />

            {/* Ellipse 5 – right glow */}
            <div
                aria-hidden="true"
                className="absolute pointer-events-none z-0 w-[400px] h-[230px] md:w-[700px] md:h-[320px] lg:w-[977.2px] lg:h-[446.65px]
                        -right-60 lg:-right-[400px] top-[100px] lg:-rotate-[20.4deg] bg-[#227ED966]
                        blur-[80px] md:blur-[200px] lg:blur-[250px]"
            />
            <div className="relative z-10 mx-auto max-w-[1560px]">

                {/* Badge */}
                <div className="mb-6 bg-[#88C4FF1A] text-[#88C4FF] inline-flex items-center gap-2 pl-3.5 pr-[16px] py-[9px] rounded-[100px] text-[14px] sm:text-[18px] leading-5 sm:leading-[22px] font-normal font-inter">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <circle cx="7.5" cy="7.5" r="7.5" fill="#88C4FF" />
                        <circle cx="7.5" cy="7.5" r="5.5" fill="#21314F" />
                        <circle cx="7.5" cy="7.5" r="3.5" fill="#88C4FF" />
                    </svg>
                    Contact Us
                </div>

                {/* Heading row */}
                <div className="flex lg:flex-row flex-col items-start lg:items-center justify-between gap-6 lg:gap-10 mb-10 lg:mb-16">
                    <h2 className="text-left font-normal text-3xl sm:text-4xl md:text-5xl xl:text-[54px] leading-tight xl:leading-[62px] bg-[linear-gradient(176.19deg,#B1D8FF_-8.19%,#FFFFFF_107.43%)] bg-clip-text text-transparent">
                        Drop Us a Message <br className='sm:block hidden' /> Get in touch!
                    </h2>
                    <p className="text-white/70 text-[14px] sm:text-[20px] leading-5 sm:leading-[32px] font-normal max-w-[596px]">
                        Drop us a message and connect with our team for support, inquiries, or collaboration opportunities anytime.
                    </p>
                </div>

                {/* Booking card */}
                <div className="border border-[#FFFFFF0D] bg-[#FFFFFF05] rounded-[40px] sm:rounded-[60px] lg:rounded-[80px] p-4 sm:p-6 overflow-hidden">
                    <div className='bg-[#FFFFFF08] rounded-[40px] sm:rounded-[60px]'>
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[300px_1fr_400px] 2xl:grid-cols-[353px_1fr_474px]">
                            {/* ── Col 1 : Profile ── */}
                            <div className="lg:border-r border-[#FFFFFF0D] pl-5 sm:pl-10 py-5 sm:py-10 flex flex-col">
                                {/* Avatar */}
                                <div className="mb-8 sm:mb-10 w-[60px] h-[60px] rounded-full flex items-center justify-center">
                                    <Image src='/assets/profile.svg' alt='profile' width={60} height={60} />
                                </div>

                                <div className='mb-6'>
                                    <p className="text-white/60 text-[16px] leading-[18px] mb-2 font-normal">Alex Fisher</p>
                                    <h3 className="text-white text-[20px] sm:text-[24px] font-semibold leading-[26px] mb-3">
                                        Design Workshop
                                    </h3>
                                    <p className="text-white/60 text-[14px] sm:text-[16px] font-normal leading-[21px]">
                                        A Longer Chat To Run Through <br className='sm:block hidden' /> Design.
                                    </p>
                                </div>

                                <div className="flex flex-col gap-2.5 sm:gap-4">
                                    {/* Duration */}
                                    <div className="flex items-center gap-2">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M12 22C16.9706 22 21 17.9706 21 13C21 8.02944 16.9706 4 12 4C7.02944 4 3 8.02944 3 13C3 17.9706 7.02944 22 12 22ZM12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V13C12.75 13.4142 12.4142 13.75 12 13.75C11.5858 13.75 11.25 13.4142 11.25 13V9C11.25 8.58579 11.5858 8.25 12 8.25Z" fill="white" fillOpacity="0.6" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M9.25 2C9.25 1.58579 9.58579 1.25 10 1.25H14C14.4142 1.25 14.75 1.58579 14.75 2C14.75 2.41421 14.4142 2.75 14 2.75H10C9.58579 2.75 9.25 2.41421 9.25 2Z" fill="white" fillOpacity="0.6" />
                                        </svg>
                                        <span className='text-white/60 text-[16px] leading-[21px] font-normal'>30 Mins</span>
                                    </div>
                                    {/* Video */}
                                    <div className="flex items-center gap-2">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M2 12.5V11.5C2 8.21252 2 6.56878 2.90796 5.46243C3.07418 5.25989 3.25989 5.07418 3.46243 4.90796C4.56878 4 6.21252 4 9.5 4C12.7875 4 14.4312 4 15.5376 4.90796C15.7401 5.07418 15.9258 5.25989 16.092 5.46243C16.7936 6.3173 16.9531 7.49303 16.9893 9.50002L17.6584 9.17082C19.6042 8.19788 20.5772 7.7114 21.2886 8.15107C22 8.59075 22 9.67853 22 11.8541V12.1459C22 14.3215 22 15.4093 21.2886 15.8489C20.5772 16.2886 19.6042 15.8021 17.6584 14.8292L16.9893 14.5C16.9531 16.507 16.7936 17.6827 16.092 18.5376C15.9258 18.7401 15.7401 18.9258 15.5376 19.092C14.4312 20 12.7875 20 9.5 20C6.21252 20 4.56878 20 3.46243 19.092C3.25989 18.9258 3.07418 18.7401 2.90796 18.5376C2 17.4312 2 15.7875 2 12.5ZM13.5607 9.56066C14.1464 8.97487 14.1464 8.02513 13.5607 7.43934C12.9749 6.85355 12.0251 6.85355 11.4393 7.43934C10.8536 8.02513 10.8536 8.97487 11.4393 9.56066C12.0251 10.1464 12.9749 10.1464 13.5607 9.56066Z" fill="white" fillOpacity="0.6" />
                                        </svg>
                                        <span className='text-white/60 text-[16px] leading-[21px] font-normal'>Call Video</span>
                                    </div>
                                    {/* Timezone */}
                                    <div className="flex items-center gap-2">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M2.02783 11.25C2.41136 6.07745 6.72957 2 12.0001 2C11.1693 2 10.4295 2.36421 9.82093 2.92113C9.21541 3.47525 8.70371 4.24878 8.28983 5.16315C7.87352 6.08292 7.55013 7.15868 7.33126 8.32611C7.1558 9.26194 7.04903 10.2485 7.01344 11.25H2.02783ZM2.02783 12.75H7.01344C7.04903 13.7515 7.1558 14.7381 7.33126 15.6739C7.55013 16.8413 7.87351 17.9171 8.28983 18.8368C8.70371 19.7512 9.21541 20.5247 9.82093 21.0789C10.4295 21.6358 11.1693 22 12.0001 22C6.72957 22 2.41136 17.9226 2.02783 12.75Z" fill="white" fillOpacity="0.6" />
                                            <path d="M12.0001 3.39535C11.7251 3.39535 11.3699 3.51236 10.9567 3.89042C10.5406 4.27126 10.1239 4.86815 9.75585 5.68137C9.3902 6.4892 9.09329 7.46441 8.88897 8.55419C8.72806 9.41242 8.62824 10.3222 8.59321 11.25H15.4071C15.372 10.3222 15.2722 9.41242 15.1113 8.5542C14.907 7.46441 14.6101 6.48921 14.2444 5.68137C13.8763 4.86815 13.4597 4.27126 13.0435 3.89042C12.6304 3.51236 12.2751 3.39535 12.0001 3.39535Z" fill="white" fillOpacity="0.6" />
                                            <path d="M8.88897 15.4458C9.09329 16.5356 9.3902 17.5108 9.75585 18.3186C10.1239 19.1319 10.5406 19.7287 10.9567 20.1096C11.3698 20.4876 11.7251 20.6047 12.0001 20.6047C12.2751 20.6047 12.6304 20.4876 13.0435 20.1096C13.4597 19.7287 13.8763 19.1319 14.2444 18.3186C14.6101 17.5108 14.907 16.5356 15.1113 15.4458C15.2722 14.5876 15.372 13.6778 15.4071 12.75H8.59321C8.62824 13.6778 8.72806 14.5876 8.88897 15.4458Z" fill="white" fillOpacity="0.6" />
                                            <path d="M12.0001 2C12.831 2 13.5708 2.36421 14.1793 2.92113C14.7849 3.47525 15.2966 4.24878 15.7104 5.16315C16.1267 6.08292 16.4501 7.15868 16.669 8.32612C16.8445 9.26194 16.9512 10.2485 16.9868 11.25H21.9724C21.5889 6.07745 17.2707 2 12.0001 2Z" fill="white" fillOpacity="0.6" />
                                            <path d="M16.669 15.6739C16.4501 16.8413 16.1267 17.9171 15.7104 18.8368C15.2966 19.7512 14.7849 20.5247 14.1793 21.0789C13.5708 21.6358 12.831 22 12.0001 22C17.2707 22 21.5889 17.9226 21.9724 12.75H16.9868C16.9512 13.7515 16.8445 14.7381 16.669 15.6739Z" fill="white" fillOpacity="0.6" />
                                        </svg>
                                        <span className='text-white/60 text-[16px] leading-[21px] font-normal'>{tz.replace(/_/g, ' ')}</span>
                                    </div>
                                </div>
                            </div>

                            {/* ── Col 2 : Calendar ── */}
                            <div className="xl:border-r border-[#FFFFFF0D] p-5 sm:py-10 sm:pl-10 2xl:pl-[57px] sm:pr-10 2xl:pr-[43px]">
                                {/* Month nav */}
                                <div className="flex items-center justify-between mb-5 sm:mb-[26px]">
                                    <h3 className="text-white text-[20px] sm:text-[24px] leading-[26px] font-semibold">
                                        {MONTH_SHORT[viewMonthIndex]}{' '}
                                        <span className="text-white/60 font-normal text-[14px]">{viewYear}</span>
                                    </h3>
                                    <div className="flex gap-2.5">
                                        <button
                                            type="button"
                                            aria-label="Previous month"
                                            onClick={() => shiftMonth(-1)}
                                            className="w-[35px] h-[35px] rounded-full bg-[#FFFFFF]/5 flex items-center justify-center cursor-pointer"
                                        >
                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9.375 11.25L5.625 7.5L9.375 3.75" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                        <button
                                            type="button"
                                            aria-label="Next month"
                                            onClick={() => shiftMonth(1)}
                                            className="w-[35px] h-[35px] rounded-full bg-[#FFFFFF]/5 flex items-center justify-center cursor-pointer"
                                        >
                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5.625 11.25L9.375 7.5L5.625 3.75" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Day headers */}
                                <div className="grid grid-cols-7 gap-4 sm:gap-[35.67px] mb-4 sm:mb-[15px]">
                                    {DAYS_OF_WEEK.map((d) => (
                                        <div key={d} className="text-center text-white/60 text-[14px] leading-[15px] font-normal">
                                            {d}
                                        </div>
                                    ))}
                                </div>

                                {/* Date cells */}
                                <div className="grid grid-cols-7 gap-4 sm:gap-[35.67px] gap-y-4 sm:gap-y-[33px]">
                                    {calendarCells.map((date, i) => {
                                        const colIndex = i % 7; // 0=SUN, 6=SAT
                                        const isWeekend = colIndex === 0 || colIndex === 6;
                                        const isPast = date != null && isPastDay(date);
                                        const noSlots = date != null && !isPast && !isWeekend && !dayHasSlots(date);
                                        const isUnavailable = !date || isWeekend || isPast || noSlots;
                                        const isSelected =
                                            date === selectedDay &&
                                            viewYear === selectedYear &&
                                            viewMonthIndex === selectedMonthIndex;
                                        const isSelectable = date != null && !isWeekend && !isPast && !noSlots;

                                        return (
                                            <button
                                                key={`${viewYear}-${viewMonthIndex}-${i}`}
                                                type="button"
                                                onClick={() => isSelectable && pickDay(date!)}
                                                disabled={isUnavailable}
                                                className={[
                                                    "h-8 sm:h-9 w-9 sm:w-[53px] mx-auto text-[13px] sm:text-[14px] rounded-lg leading-[15px] font-normal transition-all",
                                                    !date ? "invisible" : "",
                                                    isUnavailable && date ? "text-white/30 cursor-not-allowed" : "",
                                                    isSelected
                                                        ? "bg-[#88C4FF] text-black font-semibold border border-[#FFFFFF0D] cursor-pointer"
                                                        : isSelectable
                                                            ? "bg-[#FFFFFF08] text-white border border-[#FFFFFF0D] cursor-pointer hover:bg-[#FFFFFF18]"
                                                            : "",
                                                ].join(" ")}
                                            >
                                                {date}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* ── Col 3 : Times + Get in touch ── */}
                            <div className="flex flex-col p-5 sm:pt-10 sm:pb-[35.5px] sm:pr-10 sm:pl-10 2xl:pl-[52px]">
                                {/* Available Times */}
                                <h4 className="text-white text-[16px] sm:text-[18px] leading-[20px] font-semibold mb-4">Available Times</h4>

                                <div className="mb-5 sm:mb-7 grid grid-cols-3 gap-3">
                                    {timesLoading && (
                                        <p className="col-span-3 text-white/50 text-[13px] leading-[18px]">
                                            Loading available times…
                                        </p>
                                    )}
                                    {!timesLoading && timesError && (
                                        <p className="col-span-3 text-[#E25C3F] text-[13px] leading-[18px]">
                                            {timesError}
                                        </p>
                                    )}
                                    {!timesLoading && !timesError && liveTimes.length === 0 && (
                                        <p className="col-span-3 text-white/50 text-[13px] leading-[18px]">
                                            No open times on this day. Pick another date.
                                        </p>
                                    )}
                                    {!timesLoading &&
                                        liveTimes.map((t) => (
                                            <button
                                                key={t.start}
                                                type="button"
                                                onClick={() => void bookSlot(t)}
                                                className={[
                                                    "px-2 py-2.5 sm:py-3 rounded-lg text-[13px] sm:text-[14px] leading-[15px] font-normal transition-all whitespace-nowrap cursor-pointer border border-[#FFFFFF0D]",
                                                    selectedStart === t.start
                                                        ? "bg-[#88C4FF] text-black font-semibold"
                                                        : "bg-[#FFFFFF08] text-white",
                                                ].join(" ")}
                                            >
                                                {t.label}
                                            </button>
                                        ))}
                                </div>

                                {/* Get in touch */}
                                <div>
                                    <h4 className="text-white text-[16px] sm:text-[18px] leading-[20px] font-semibold mb-3">Get in touch</h4>
                                    <p className="text-white/60 text-[14px] leading-[18px] font-normal mb-5">
                                        Contact us for expert guidance and answers<br className='sm:block hidden' />to your questions
                                    </p>

                                    {/* Social icons */}
                                    <div className="flex gap-3 mb-5">
                                        {/* Telegram */}
                                        <a
                                            href="#"
                                            aria-label="Telegram"
                                            className="w-12 h-12 rounded-full bg-[#FFFFFF0D] border border-[#FFFFFF0D] flex items-center justify-center transition-colors"
                                        >
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M19.7747 4.42997C20.0218 4.32596 20.2923 4.29008 20.558 4.32608C20.8237 4.36208 21.0749 4.46863 21.2854 4.63465C21.4959 4.80067 21.6581 5.02008 21.7551 5.27005C21.852 5.52002 21.8802 5.79141 21.8367 6.05597L19.5687 19.813C19.3487 21.14 17.8927 21.901 16.6757 21.24C15.6577 20.687 14.1457 19.835 12.7857 18.946C12.1057 18.501 10.0227 17.076 10.2787 16.062C10.4987 15.195 13.9987 11.937 15.9987 9.99997C16.7837 9.23897 16.4257 8.79997 15.4987 9.49997C13.1967 11.238 9.5007 13.881 8.2787 14.625C7.2007 15.281 6.6387 15.393 5.9667 15.281C4.7407 15.077 3.6037 14.761 2.6757 14.376C1.4217 13.856 1.4827 12.132 2.6747 11.63L19.7747 4.42997Z" fill="white" />
                                            </svg>
                                        </a>
                                        {/* Instagram */}
                                        <a
                                            href="#"
                                            aria-label="Instagram"
                                            className="w-12 h-12 rounded-full bg-[#FFFFFF0D] border border-[#FFFFFF0D] flex items-center justify-center transition-colors"
                                        >
                                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.28601 10.9216C7.28601 8.91105 8.9164 7.28076 10.9281 7.28076C12.9399 7.28076 14.5711 8.91105 14.5711 10.9216C14.5711 12.9321 12.9399 14.5624 10.9281 14.5624C8.9164 14.5624 7.28601 12.9321 7.28601 10.9216ZM5.31667 10.9216C5.31667 14.0189 7.82892 16.5297 10.9281 16.5297C14.0274 16.5297 16.5396 14.0189 16.5396 10.9216C16.5396 7.82422 14.0274 5.31348 10.9281 5.31348C7.82892 5.31348 5.31667 7.82422 5.31667 10.9216ZM15.4504 5.09112C15.4503 5.35033 15.5271 5.60375 15.6711 5.81933C15.8151 6.03491 16.0198 6.20298 16.2594 6.30227C16.499 6.40156 16.7627 6.42762 17.0171 6.37715C17.2715 6.32668 17.5052 6.20196 17.6887 6.01874C17.8721 5.83552 17.9971 5.60205 18.0478 5.34784C18.0985 5.09363 18.0727 4.8301 17.9735 4.59059C17.8743 4.35107 17.7063 4.14631 17.4908 4.00222C17.2752 3.85812 17.0216 3.78116 16.7623 3.78105H16.7618C16.4141 3.78121 16.0807 3.91927 15.8348 4.16491C15.589 4.41054 15.4507 4.74367 15.4504 5.09112ZM6.51317 19.8115C5.44772 19.763 4.86862 19.5856 4.48377 19.4358C3.97356 19.2373 3.60952 19.0008 3.22677 18.6189C2.84403 18.2369 2.6071 17.8734 2.40935 17.3635C2.25933 16.979 2.08185 16.4001 2.03342 15.3353C1.98044 14.1841 1.96986 13.8383 1.96986 10.9217C1.96986 8.00508 1.98132 7.66022 2.03342 6.50804C2.08194 5.44323 2.26073 4.86543 2.40935 4.47986C2.60798 3.96995 2.84455 3.60613 3.22677 3.22361C3.609 2.8411 3.97268 2.60432 4.48377 2.40668C4.86844 2.25675 5.44772 2.07938 6.51317 2.03098C7.66508 1.97803 8.01111 1.96746 10.9281 1.96746C13.8452 1.96746 14.1915 1.9789 15.3444 2.03098C16.4099 2.07947 16.988 2.25815 17.3738 2.40668C17.884 2.60432 18.2481 2.84162 18.6308 3.22361C19.0136 3.60561 19.2496 3.96995 19.4482 4.47986C19.5983 4.8643 19.7757 5.44323 19.8242 6.50804C19.8771 7.66022 19.8877 8.00508 19.8877 10.9217C19.8877 13.8383 19.8771 14.1831 19.8242 15.3353C19.7756 16.4001 19.5973 16.9789 19.4482 17.3635C19.2496 17.8734 19.013 18.2372 18.6308 18.6189C18.2486 19.0005 17.884 19.2373 17.3738 19.4358C16.9891 19.5857 16.4099 19.7631 15.3444 19.8115C14.1925 19.8644 13.8465 19.875 10.9281 19.875C8.0098 19.875 7.66473 19.8644 6.51317 19.8115ZM6.42269 0.0661411C5.25932 0.119089 4.46436 0.303445 3.77012 0.573427C3.05114 0.852233 2.44248 1.22628 1.83427 1.83317C1.22605 2.44006 0.852744 3.04931 0.573771 3.76786C0.303627 4.46212 0.11916 5.25617 0.0661808 6.41883C0.0123269 7.58334 0 7.95563 0 10.9216C0 13.8875 0.0123269 14.2598 0.0661808 15.4243C0.11916 16.5871 0.303627 17.381 0.573771 18.0753C0.852744 18.7934 1.22614 19.4034 1.83427 20.01C2.44239 20.6166 3.05114 20.9901 3.77012 21.2697C4.46567 21.5397 5.25932 21.7241 6.42269 21.777C7.5885 21.83 7.96041 21.8432 10.9281 21.8432C13.8959 21.8432 14.2684 21.8308 15.4336 21.777C16.597 21.7241 17.3915 21.5397 18.0862 21.2697C18.8047 20.9901 19.4138 20.6169 20.022 20.01C20.6302 19.4031 21.0027 18.7934 21.2825 18.0753C21.5526 17.381 21.738 16.587 21.7901 15.4243C21.8431 14.259 21.8554 13.8875 21.8554 10.9216C21.8554 7.95563 21.8431 7.58334 21.7901 6.41883C21.7371 5.25608 21.5526 4.46169 21.2825 3.76786C21.0027 3.04974 20.6293 2.44102 20.022 1.83317C19.4148 1.22531 18.8047 0.852233 18.087 0.573427C17.3915 0.303445 16.597 0.118215 15.4345 0.0661411C14.2693 0.0131933 13.8967 0 10.929 0C7.96128 0 7.5885 0.0123195 6.42269 0.0661411Z" fill="white" />
                                                <path d="M7.28601 10.9216C7.28601 8.91105 8.9164 7.28076 10.9281 7.28076C12.9399 7.28076 14.5711 8.91105 14.5711 10.9216C14.5711 12.9321 12.9399 14.5624 10.9281 14.5624C8.9164 14.5624 7.28601 12.9321 7.28601 10.9216ZM5.31667 10.9216C5.31667 14.0189 7.82892 16.5297 10.9281 16.5297C14.0274 16.5297 16.5396 14.0189 16.5396 10.9216C16.5396 7.82422 14.0274 5.31348 10.9281 5.31348C7.82892 5.31348 5.31667 7.82422 5.31667 10.9216ZM15.4504 5.09112C15.4503 5.35033 15.5271 5.60375 15.6711 5.81933C15.8151 6.03491 16.0198 6.20298 16.2594 6.30227C16.499 6.40156 16.7627 6.42762 17.0171 6.37715C17.2715 6.32668 17.5052 6.20196 17.6887 6.01874C17.8721 5.83552 17.9971 5.60205 18.0478 5.34784C18.0985 5.09363 18.0727 4.8301 17.9735 4.59059C17.8743 4.35107 17.7063 4.14631 17.4908 4.00222C17.2752 3.85812 17.0216 3.78116 16.7623 3.78105H16.7618C16.4141 3.78121 16.0807 3.91927 15.8348 4.16491C15.589 4.41054 15.4507 4.74367 15.4504 5.09112ZM6.51317 19.8115C5.44772 19.763 4.86862 19.5856 4.48377 19.4358C3.97356 19.2373 3.60952 19.0008 3.22677 18.6189C2.84403 18.2369 2.6071 17.8734 2.40935 17.3635C2.25933 16.979 2.08185 16.4001 2.03342 15.3353C1.98044 14.1841 1.96986 13.8383 1.96986 10.9217C1.96986 8.00508 1.98132 7.66022 2.03342 6.50804C2.08194 5.44323 2.26073 4.86543 2.40935 4.47986C2.60798 3.96995 2.84455 3.60613 3.22677 3.22361C3.609 2.8411 3.97268 2.60432 4.48377 2.40668C4.86844 2.25675 5.44772 2.07938 6.51317 2.03098C7.66508 1.97803 8.01111 1.96746 10.9281 1.96746C13.8452 1.96746 14.1915 1.9789 15.3444 2.03098C16.4099 2.07947 16.988 2.25815 17.3738 2.40668C17.884 2.60432 18.2481 2.84162 18.6308 3.22361C19.0136 3.60561 19.2496 3.96995 19.4482 4.47986C19.5983 4.8643 19.7757 5.44323 19.8242 6.50804C19.8771 7.66022 19.8877 8.00508 19.8877 10.9217C19.8877 13.8383 19.8771 14.1831 19.8242 15.3353C19.7756 16.4001 19.5973 16.9789 19.4482 17.3635C19.2496 17.8734 19.013 18.2372 18.6308 18.6189C18.2486 19.0005 17.884 19.2373 17.3738 19.4358C16.9891 19.5857 16.4099 19.7631 15.3444 19.8115C14.1925 19.8644 13.8465 19.875 10.9281 19.875C8.0098 19.875 7.66473 19.8644 6.51317 19.8115ZM6.42269 0.0661411C5.25932 0.119089 4.46436 0.303445 3.77012 0.573427C3.05114 0.852233 2.44248 1.22628 1.83427 1.83317C1.22605 2.44006 0.852744 3.04931 0.573771 3.76786C0.303627 4.46212 0.11916 5.25617 0.0661808 6.41883C0.0123269 7.58334 0 7.95563 0 10.9216C0 13.8875 0.0123269 14.2598 0.0661808 15.4243C0.11916 16.5871 0.303627 17.381 0.573771 18.0753C0.852744 18.7934 1.22614 19.4034 1.83427 20.01C2.44239 20.6166 3.05114 20.9901 3.77012 21.2697C4.46567 21.5397 5.25932 21.7241 6.42269 21.777C7.5885 21.83 7.96041 21.8432 10.9281 21.8432C13.8959 21.8432 14.2684 21.8308 15.4336 21.777C16.597 21.7241 17.3915 21.5397 18.0862 21.2697C18.8047 20.9901 19.4138 20.6169 20.022 20.01C20.6302 19.4031 21.0027 18.7934 21.2825 18.0753C21.5526 17.381 21.738 16.587 21.7901 15.4243C21.8431 14.259 21.8554 13.8875 21.8554 10.9216C21.8554 7.95563 21.8431 7.58334 21.7901 6.41883C21.7371 5.25608 21.5526 4.46169 21.2825 3.76786C21.0027 3.04974 20.6293 2.44102 20.022 1.83317C19.4148 1.22531 18.8047 0.852233 18.087 0.573427C17.3915 0.303445 16.597 0.118215 15.4345 0.0661411C14.2693 0.0131933 13.8967 0 10.929 0C7.96128 0 7.5885 0.0123195 6.42269 0.0661411Z" fill="white" />
                                            </svg>
                                        </a>
                                        {/* LinkedIn */}
                                        <a
                                            href="#"
                                            aria-label="LinkedIn"
                                            className="w-12 h-12 rounded-full bg-[#FFFFFF0D] border border-[#FFFFFF0D] flex items-center justify-center transition-colors"
                                        >
                                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0 1.56563C0 0.70145 0.723477 0 1.61532 0H20.241C21.1331 0 21.8563 0.70145 21.8563 1.56563V20.2909C21.8563 21.1553 21.1331 21.8563 20.241 21.8563H1.61532C0.723562 21.8563 0 21.1554 0 20.2912V1.56537V1.56563Z" fill="white" />
                                                <path d="M6.64171 18.2911V8.45133H3.37112V18.2911H6.64205H6.64171ZM5.0071 7.10811C6.14738 7.10811 6.85728 6.35253 6.85728 5.40827C6.83594 4.4425 6.14738 3.70801 5.02879 3.70801C3.90942 3.70801 3.17834 4.4425 3.17834 5.40819C3.17834 6.35245 3.88799 7.10802 4.98567 7.10802H5.00684L5.0071 7.10811ZM8.45202 18.2911H11.7224V12.7967C11.7224 12.503 11.7437 12.2086 11.8301 11.9988C12.0664 11.411 12.6045 10.8025 13.5083 10.8025C14.6914 10.8025 15.165 11.7048 15.165 13.0277V18.2911H18.4352V12.6493C18.4352 9.62705 16.822 8.22065 14.6702 8.22065C12.9061 8.22065 12.1313 9.20665 11.7008 9.87822H11.7226V8.45167H8.4522C8.49488 9.37476 8.45194 18.2914 8.45194 18.2914L8.45202 18.2911Z" fill="#141414" />
                                            </svg>
                                        </a>
                                    </div>

                                    {/* Contact Form button → Calendly popup (layout unchanged) */}
                                    <CalendlyButton
                                        calendlySlot={slot}
                                        disabled={!slot}
                                        className="inline-flex items-center gap-[7px] bg-white text-black px-[23.16px] h-[41.5px] rounded-full text-[12px] leading-[14px] font-semibold hover:bg-white/10 hover:text-white transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        Contact Form
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.32349 10.5831L11.3938 6.51273L7.32349 2.44238M11.3938 6.51273H1.625" stroke="currentColor" strokeWidth="1.08543" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </CalendlyButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
