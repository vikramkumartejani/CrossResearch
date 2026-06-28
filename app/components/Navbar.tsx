"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Algo", href: "/algo" },
    { label: "Investing", href: "/investing" },
    {
        label: "Trading Desk",
        href: "/trading-desk",
        hasDropdown: true,
        items: ["Futures", "Options", "Spot Markets", "Order Flow"],
    },
    {
        label: "Features",
        href: "/features",
        hasDropdown: true,
        items: ["Market Regime", "Macro Intelligence", "Algo Signals", "Screener"],
    },
    {
        label: "About",
        href: "/about",
        hasDropdown: true,
        items: ["Team", "Careers", "Press", "Contact"],
    },
];

export default function Navbar() {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleMouseEnter = (label: string) => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setOpenDropdown(label);
    };

    const handleMouseLeave = () => {
        closeTimer.current = setTimeout(() => {
            setOpenDropdown(null);
        }, 150);
    };

    const toggleMobileDropdown = (label: string) => {
        setMobileDropdown(prev => (prev === label ? null : label));
    };

    const closeMobileMenu = () => {
        setMobileOpen(false);
        setMobileDropdown(null);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 mx-4 sm:mx-6">
            <div className="mx-auto w-full max-w-[1920px]">
                <nav className="my-5 sm:my-6 h-[50px] bg-[#181F30] relative flex items-center justify-between border border-[#FFFFFF1A] rounded-[210px] pl-5 sm:pl-[26px] pr-[9px]">
                    {/* Logo */}
                    <Link href="/">
                        <Image src="/assets/logo.svg" alt="Logo" width={34.94} height={30} />
                    </Link>

                    {/* Desktop nav links — absolutely centred */}
                    <ul className="absolute left-1/2 -translate-x-1/2 h-full hidden xl:flex items-center gap-8" role="navigation" aria-label="Main navigation">
                        {NAV_LINKS.map((link) => (
                            <li
                                key={link.label}
                                className="relative h-full flex items-center"
                                onMouseEnter={() => link.hasDropdown && handleMouseEnter(link.label)}
                                onMouseLeave={() => link.hasDropdown && handleMouseLeave()}
                            >
                                <Link
                                    href={link.href}
                                    className="flex items-center gap-3 text-[#E8FCFFCC] text-nowrap text-[18px] leading-[22px] font-normal transition-colors duration-150 font-inter"
                                    aria-haspopup={link.hasDropdown ? "true" : undefined}
                                    aria-expanded={openDropdown === link.label ? "true" : undefined}
                                >
                                    {link.label}
                                    {link.hasDropdown && (
                                        <svg
                                            width="13" height="8"
                                            viewBox="0 0 13 8" fill="none"
                                            className={`transition-transform duration-200 ${openDropdown === link.label ? "rotate-180" : "rotate-0"}`}
                                        >
                                            <path d="M1 1L6.5 6.5L12 1" stroke="#E8FCFF" strokeOpacity="0.8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                </Link>

                                {/* Desktop Dropdown */}
                                {link.hasDropdown && openDropdown === link.label && (
                                    <div
                                        className="absolute left-0 top-full mt-1 py-1.5 rounded-lg min-w-[176px] bg-[#1C2437]/80 border border-[#ffffff12]"
                                        role="menu"
                                        onMouseEnter={() => {
                                            if (closeTimer.current) clearTimeout(closeTimer.current);
                                        }}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {link.items?.map((item) => (
                                            <Link
                                                key={item}
                                                href={`${link.href}/${item.toLowerCase().replace(/\s+/g, "-")}`}
                                                className="block px-4 py-2 text-[16px] leading-[20px] font-normal transition-colors duration-150 text-[#E8FCFFCC] hover:text-white"
                                                role="menuitem"
                                            >
                                                {item}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>

                    {/* Desktop CTA Buttons */}
                    <div className="hidden xl:flex items-center gap-[7px]">
                        <Link
                            href="/signin"
                            className="px-[28px] py-[5px] text-white text-[18px] leading-[22px] font-medium font-inter"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/get-access"
                            className="px-3 py-[5px] text-[#070711] bg-white text-[18px] leading-[22px] font-medium font-inter rounded-[100px] shadow-[0px_4px_4px_0px_#00000040]"
                        >
                            Get Access
                        </Link>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className="xl:hidden flex flex-col gap-[5px] p-2 mr-1 rounded-lg"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label={mobileOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileOpen}
                        style={{ color: "rgba(255,255,255,0.8)" }}
                    >
                        <span className="block w-6 h-[2.5px] bg-current rounded-full transition-all duration-200" style={{ transform: mobileOpen ? "translateY(7.5px) rotate(45deg)" : "none" }} />
                        <span className="block w-6 h-[2.5px] bg-current rounded-full transition-all duration-200" style={{ opacity: mobileOpen ? 0 : 1 }} />
                        <span className="block w-6 h-[2.5px] bg-current rounded-full transition-all duration-200" style={{ transform: mobileOpen ? "translateY(-7.5px) rotate(-45deg)" : "none" }} />
                    </button>
                </nav>

                {/* Mobile Menu */}
                {mobileOpen && (
                    <div className="mb-4 rounded-2xl bg-[#181F30] border border-[#ffffff14] overflow-hidden">
                        <ul className="py-2.5">
                            {NAV_LINKS.map((link) => (
                                <li key={link.label}>
                                    {link.hasDropdown ? (
                                        <>
                                            {/* Dropdown trigger row */}
                                            <button
                                                className="w-full flex items-center justify-between px-5 py-2.5 text-[16px] font-medium transition-colors duration-150"
                                                style={{ color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-inter)" }}
                                                onClick={() => toggleMobileDropdown(link.label)}
                                                aria-expanded={mobileDropdown === link.label}
                                            >
                                                <span>{link.label}</span>
                                                <svg
                                                    width="12" height="8"
                                                    viewBox="0 0 13 8" fill="none"
                                                    className="transition-transform duration-200"
                                                    style={{ transform: mobileDropdown === link.label ? "rotate(180deg)" : "rotate(0deg)" }}
                                                >
                                                    <path d="M1 1L6.5 6.5L12 1" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>

                                            {/* Dropdown items */}
                                            {mobileDropdown === link.label && (
                                                <ul className="pb-1">
                                                    {link.items?.map((item) => (
                                                        <li key={item}>
                                                            <Link
                                                                href={`${link.href}/${item.toLowerCase().replace(/\s+/g, "-")}`}
                                                                className="block pl-6.5 pr-5 py-2 text-[15px] leading-5 transition-colors duration-150 text-white/70 hover:text-white"
                                                                onClick={closeMobileMenu}
                                                            >
                                                                - {item}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </>
                                    ) : (
                                        <Link
                                            href={link.href}
                                            className="block px-5 py-2.5 text-[16px] font-medium transition-colors duration-150"
                                            style={{ color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-inter)" }}
                                            onClick={closeMobileMenu}
                                        >
                                            {link.label}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>

                        {/* Divider */}
                        <div className="mx-5 h-px bg-white/10" />

                        {/* Mobile CTA buttons */}
                        <div className="px-5 py-5 flex flex-col gap-3">
                            <Link
                                href="/signin"
                                className="text-center py-3 text-[15px] font-medium rounded-full transition-colors duration-150 border border-[#ffffff26] text-[#ffffffbf] font-inter"
                                onClick={closeMobileMenu}
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/get-access"
                                className="text-center py-3 text-[15px] font-semibold rounded-full transition-colors duration-150 font-inter bg-white text-[#070711]"
                                onClick={closeMobileMenu}
                            >
                                Get Access
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
