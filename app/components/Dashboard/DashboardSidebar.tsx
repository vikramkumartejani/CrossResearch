'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconAnalysis() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 7.33333L3.66667 5.66667C4.34471 4.98863 4.68372 4.64961 5.09149 4.5744C5.25137 4.54491 5.4153 4.54491 5.57518 4.5744C5.98295 4.64961 6.32197 4.98863 7 5.66667C7.67807 6.3447 8.01707 6.68373 8.4248 6.75893C8.58473 6.7884 8.7486 6.7884 8.90853 6.75893C9.31627 6.68373 9.65527 6.3447 10.3333 5.66667L14 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 10V14M6 8.66667V14M10 10.6667V14M14 6V14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function IconMarketReport() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.33301 4.00016C1.33301 2.5274 2.52692 1.3335 3.99967 1.3335C5.47243 1.3335 6.66634 2.5274 6.66634 4.00016V12.0002C6.66634 13.4729 5.47243 14.6668 3.99967 14.6668C2.52692 14.6668 1.33301 13.4729 1.33301 12.0002V4.00016Z" stroke="currentColor" strokeWidth="1.2" />
            <path d="M6.66651 5.49504L8.87562 3.28593C9.91702 2.24453 11.6055 2.24453 12.6469 3.28593C13.6883 4.32733 13.6883 6.01577 12.6469 7.05717L6.2041 13.4999" stroke="currentColor" strokeWidth="1.2" />
            <path d="M4 14.6668L12 14.6668C13.4728 14.6668 14.6667 13.4729 14.6667 12.0002C14.6667 10.5274 13.4728 9.3335 12 9.3335L10.3333 9.3335" stroke="currentColor" strokeWidth="1.2" />
            <path d="M4.66634 12.0002C4.66634 12.3684 4.36786 12.6668 3.99967 12.6668C3.63148 12.6668 3.33301 12.3684 3.33301 12.0002C3.33301 11.632 3.63148 11.3335 3.99967 11.3335C4.36786 11.3335 4.66634 11.632 4.66634 12.0002Z" stroke="currentColor" strokeWidth="1.2" />
        </svg>
    )
}

function IconMacro() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 1.3335V14.6668" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M4.66699 5.00016C4.66699 4.37709 4.66699 4.06555 4.80097 3.8335C4.88874 3.68148 5.01497 3.55524 5.16699 3.46747C5.39904 3.3335 5.71058 3.3335 6.33366 3.3335H12.3337C12.9567 3.3335 13.2683 3.3335 13.5003 3.46747C13.6523 3.55524 13.7786 3.68148 13.8664 3.8335C14.0003 4.06555 14.0003 4.37709 14.0003 5.00016C14.0003 5.62324 14.0003 5.93478 13.8664 6.16683C13.7786 6.31885 13.6523 6.44509 13.5003 6.53285C13.2683 6.66683 12.9567 6.66683 12.3337 6.66683H6.33366C5.71058 6.66683 5.39904 6.66683 5.16699 6.53285C5.01497 6.44509 4.88874 6.31885 4.80097 6.16683C4.66699 5.93478 4.66699 5.62324 4.66699 5.00016Z" stroke="currentColor" strokeWidth="1.2" />
            <path d="M4.66699 11.0002C4.66699 10.3771 4.66699 10.0655 4.80097 9.8335C4.88874 9.68148 5.01497 9.55524 5.16699 9.46747C5.39904 9.3335 5.71058 9.3335 6.33366 9.3335H10.3337C10.9567 9.3335 11.2683 9.3335 11.5003 9.46747C11.6523 9.55524 11.7786 9.68148 11.8664 9.8335C12.0003 10.0655 12.0003 10.3771 12.0003 11.0002C12.0003 11.6232 12.0003 11.9348 11.8664 12.1668C11.7786 12.3188 11.6523 12.4451 11.5003 12.5329C11.2683 12.6668 10.9567 12.6668 10.3337 12.6668H6.33366C5.71058 12.6668 5.39904 12.6668 5.16699 12.5329C5.01497 12.4451 4.88874 12.3188 4.80097 12.1668C4.66699 11.9348 4.66699 11.6232 4.66699 11.0002Z" stroke="currentColor" strokeWidth="1.2" />
        </svg>
    )
}

function IconSignal() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_584_1540)">
                <path d="M14.6663 8.00016C14.6663 11.6821 11.6816 14.6668 7.99967 14.6668C4.31778 14.6668 1.33301 11.6821 1.33301 8.00016C1.33301 4.31826 4.31778 1.3335 7.99967 1.3335C11.6816 1.3335 14.6663 4.31826 14.6663 8.00016Z" stroke="currentColor" strokeWidth="1.2" />
                <path d="M2 5.33863C2 5.33863 3.95811 7.33347 6.95811 7.33347C9 7.33347 10.0838 6.15142 11 5.83733C12.7219 5.24702 14 5.33863 14 5.33863" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M1.99958 9.33864C1.99958 9.33864 3.39217 9.24702 5.2684 9.83733C6.26672 10.1514 7.44761 11.3335 9.67247 11.3335C11.6803 11.3335 13.2598 10.5808 14.1797 10.0002" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </g>
            <defs>
                <clipPath id="clip0_584_1540">
                    <rect width="16" height="16" fill="white" />
                </clipPath>
            </defs>
        </svg>
    )
}

function IconReliefSignals() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.588 9.62713L13.1871 9.59317L13.1863 9.58274L12.588 9.62713ZM3.43585 9.56751L2.83807 9.51459L2.83726 9.52632L3.43585 9.56751ZM4.68626 14.2755L4.37698 14.7897H4.37698L4.68626 14.2755ZM3.57506 13.0367L3.03205 13.292H3.03205L3.57506 13.0367ZM12.4105 13.059L12.9513 13.3187H12.9513L12.4105 13.059ZM11.3001 14.2813L11.6073 14.7967H11.6073L11.3001 14.2813ZM8.01005 14.6668V14.0668C7.10758 14.0668 6.47191 14.0662 5.97923 14.0205C5.49467 13.9755 5.21104 13.891 4.99555 13.7614L4.68626 14.2755L4.37698 14.7897C4.81198 15.0513 5.29914 15.1625 5.8683 15.2153C6.42934 15.2674 7.13032 15.2668 8.01005 15.2668V14.6668ZM3.43585 9.56751L2.83726 9.52632C2.7745 10.4384 2.72428 11.1606 2.7343 11.7414C2.74443 12.3288 2.81564 12.8316 3.03205 13.292L3.57506 13.0367L4.11807 12.7815C4.00481 12.5406 3.94292 12.2313 3.93412 11.7207C3.9252 11.2036 3.97022 10.5418 4.03443 9.6087L3.43585 9.56751ZM4.68626 14.2755L4.99555 13.7614C4.6189 13.5348 4.31228 13.1947 4.11807 12.7815L3.57506 13.0367L3.03205 13.292C3.32511 13.9155 3.79219 14.4379 4.37698 14.7897L4.68626 14.2755ZM12.588 9.62713L11.9889 9.66107C12.0413 10.5845 12.0779 11.2392 12.0631 11.7506C12.0484 12.2553 11.984 12.5611 11.8696 12.7992L12.4105 13.059L12.9513 13.3187C13.1697 12.864 13.2457 12.3668 13.2626 11.7853C13.2792 11.2105 13.2382 10.4957 13.187 9.59318L12.588 9.62713ZM8.01005 14.6668V15.2668C8.87983 15.2668 9.57313 15.2674 10.1285 15.2161C10.6922 15.164 11.1749 15.0544 11.6073 14.7967L11.3001 14.2813L10.9929 13.7659C10.7785 13.8937 10.4973 13.9769 10.0181 14.0212C9.53075 14.0662 8.90243 14.0668 8.01005 14.0668V14.6668ZM12.4105 13.059L11.8696 12.7992C11.6736 13.2074 11.3675 13.5427 10.9929 13.7659L11.3001 14.2813L11.6073 14.7967C12.1889 14.4501 12.6554 13.9349 12.9513 13.3187L12.4105 13.059ZM12.0314 2.2904L11.4505 2.44037C11.4628 2.48792 11.467 2.58878 11.3669 2.76566C11.2655 2.94488 11.0779 3.16067 10.7897 3.39124C10.2149 3.85103 9.33037 4.29731 8.2709 4.59199L8.43167 5.17004L8.59245 5.7481C9.77094 5.42032 10.8112 4.91075 11.5393 4.32831C11.9025 4.03776 12.2109 3.71085 12.4113 3.35666C12.6131 3.00012 12.7251 2.57684 12.6124 2.14043L12.0314 2.2904ZM8.43167 5.17004L8.2709 4.59199C7.21106 4.88676 6.23187 4.95873 5.51637 4.85937C5.15746 4.80953 4.89534 4.72079 4.72611 4.62113C4.56099 4.52388 4.51973 4.43981 4.50804 4.39454L3.92708 4.54451L3.34613 4.69447C3.45937 5.13316 3.7639 5.44708 4.11713 5.65512C4.46626 5.86074 4.89505 5.98461 5.35131 6.04797C6.26615 6.17501 7.41433 6.07578 8.59245 5.7481L8.43167 5.17004ZM3.92708 4.54451L4.50804 4.39454C4.49576 4.34699 4.49152 4.24613 4.59161 4.06925C4.69303 3.89002 4.88061 3.67423 5.16884 3.44366C5.74361 2.98388 6.62816 2.5376 7.68763 2.24292L7.52686 1.66486L7.36608 1.08681C6.18759 1.41458 5.14733 1.92416 4.41924 2.5066C4.05603 2.79714 3.74767 3.12406 3.54724 3.47825C3.34548 3.83479 3.23347 4.25806 3.34613 4.69447L3.92708 4.54451ZM7.52686 1.66486L7.68763 2.24292C8.74747 1.94814 9.72666 1.87618 10.4422 1.97554C10.8011 2.02538 11.0632 2.11411 11.2324 2.21378C11.3975 2.31103 11.4388 2.39509 11.4505 2.44037L12.0314 2.2904L12.6124 2.14043C12.4992 1.70174 12.1946 1.38783 11.8414 1.17979C11.4923 0.974162 11.0635 0.850301 10.6072 0.786941C9.69238 0.659901 8.5442 0.759129 7.36608 1.08681L7.52686 1.66486ZM3.43585 9.56751L4.03351 9.62041L4.50536 4.2898L3.9077 4.2369L3.31004 4.184L2.83818 9.5146L3.43585 9.56751ZM12.0563 2.45989L11.4579 2.50428L11.9896 9.67151L12.588 9.62713L13.1863 9.58274L12.6547 2.4155L12.0563 2.45989Z" fill="currentColor" />
            <path d="M3.49707 8.87298L3.07192 9.29636C3.59691 9.82353 4.90046 10.6003 7.9994 10.6003V10.0003V9.40032C5.08585 9.40032 4.14254 8.67085 3.92222 8.4496L3.49707 8.87298ZM7.9994 10.0003V10.6003C11.1802 10.6003 12.4694 9.78168 12.9658 9.25626L12.5296 8.84424L12.0935 8.43222C11.9044 8.63236 10.9894 9.40032 7.9994 9.40032V10.0003Z" fill="currentColor" />
        </svg>
    )
}

function IconOptions() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.99967 12.6668C4.12706 12.6668 3.19075 12.6668 2.51815 12.2174C2.22698 12.0229 1.97698 11.7729 1.78242 11.4817C1.33301 10.8091 1.33301 9.87278 1.33301 8.00016C1.33301 6.12755 1.33301 5.19124 1.78242 4.51864C1.97698 4.22747 2.22698 3.97747 2.51815 3.78291C3.19075 3.3335 4.12706 3.3335 5.99967 3.3335L9.99967 3.3335C11.8723 3.3335 12.8086 3.3335 13.4812 3.78291C13.7724 3.97747 14.0224 4.22747 14.2169 4.51864C14.6663 5.19124 14.6663 6.12755 14.6663 8.00016C14.6663 9.87278 14.6663 10.8091 14.2169 11.4817C14.0224 11.7729 13.7724 12.0229 13.4812 12.2174C12.8086 12.6668 11.8723 12.6668 9.99967 12.6668H5.99967Z" stroke="currentColor" strokeWidth="1.2" />
            <path d="M6 6C4.89543 6 4 6.89543 4 8C4 9.10457 4.89543 10 6 10" stroke="currentColor" strokeWidth="1.2" />
            <path d="M10 6C11.1046 6 12 6.89543 12 8C12 9.10457 11.1046 10 10 10" stroke="currentColor" strokeWidth="1.2" />
            <path d="M6 3.3335V12.3335" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M10 3.3335V12.3335" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
    )
}

function IconSeason() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_584_1552)">
                <path d="M7.99967 1.3335C11.6816 1.3335 14.6663 4.31826 14.6663 8.00016C14.6663 11.6821 11.6816 14.6668 7.99967 14.6668C4.31778 14.6668 1.33301 11.6821 1.33301 8.00016C1.33301 6.13523 2.09877 4.44916 3.33301 3.23921" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M3.33301 8.00016C3.33301 10.5775 5.42235 12.6668 7.99967 12.6668C10.577 12.6668 12.6663 10.5775 12.6663 8.00016C12.6663 5.42283 10.577 3.3335 7.99967 3.3335" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M8 10.6668C9.47276 10.6668 10.6667 9.47292 10.6667 8.00016C10.6667 6.5274 9.47276 5.3335 8 5.3335" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </g>
            <defs>
                <clipPath id="clip0_584_1552">
                    <rect width="16" height="16" fill="white" />
                </clipPath>
            </defs>
        </svg>
    )
}
function IconCrypto() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.9987 14.6673C11.6806 14.6673 14.6654 11.6825 14.6654 8.00065C14.6654 4.31875 11.6806 1.33398 7.9987 1.33398C4.3168 1.33398 1.33203 4.31875 1.33203 8.00065C1.33203 11.6825 4.3168 14.6673 7.9987 14.6673Z" stroke="currentColor" strokeWidth="1.2" />
            <path d="M6.33203 10.6673V5.33398" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M7.33203 5.33333V4M8.9987 5.33333V4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M7.33203 11.9993V10.666M8.9987 11.9993V10.666" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M6.33203 8H9.66536C10.2176 8 10.6654 8.44773 10.6654 9V9.66667C10.6654 10.2189 10.2176 10.6667 9.66536 10.6667H5.33203" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5.33203 5.33398H9.66536C10.2176 5.33398 10.6654 5.7817 10.6654 6.33398V7.00065C10.6654 7.55292 10.2176 8.00065 9.66536 8.00065H6.33203" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}
function IconGeo() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.33203 14.0007H6.66536C4.1512 14.0007 2.89413 14.0007 2.11308 13.2196C1.33203 12.4386 1.33203 11.1815 1.33203 8.66732V6.66732C1.33203 4.15316 1.33203 2.89608 2.11308 2.11503C2.89413 1.33398 4.1512 1.33398 6.66536 1.33398H7.9987C10.5128 1.33398 11.77 1.33398 12.551 2.11503C13.332 2.89608 13.332 4.15316 13.332 6.66732V7.00065" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11.6033 9.60303C11.7448 9.2443 12.2525 9.2443 12.3941 9.60303L12.4185 9.66523C12.7641 10.5415 13.4578 11.2352 14.3341 11.5808L14.3963 11.6052C14.755 11.7468 14.755 12.2545 14.3963 12.396L14.3341 12.4205C13.4578 12.7661 12.7641 13.4598 12.4185 14.336L12.3941 14.3982C12.2525 14.757 11.7448 14.757 11.6033 14.3982L11.5788 14.336C11.2332 13.4598 10.5395 12.7661 9.66328 12.4205L9.60108 12.396C9.24235 12.2545 9.24235 11.7468 9.60108 11.6052L9.66328 11.5808C10.5395 11.2352 11.2332 10.5415 11.5788 9.66523L11.6033 9.60303Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4.66797 4.66602H10.0013M4.66797 7.66602H10.0013M4.66797 10.666H7.33464" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}
function IconNews() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.66797 13.1054V10.0043C1.66797 9.53152 1.66797 9.29506 1.7555 9.26886C1.84303 9.24259 1.9771 9.44619 2.24525 9.85326C3.17341 11.2625 4.73878 12.8278 6.14796 13.756C6.55507 14.0241 6.75864 14.1582 6.73237 14.2457C6.70617 14.3333 6.46972 14.3333 5.99688 14.3333H2.89582C2.317 14.3333 2.0276 14.3333 1.84778 14.1535C1.66797 13.9737 1.66797 13.6843 1.66797 13.1054Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
            <path d="M14.3323 2.89386V5.99492C14.3323 6.46777 14.3323 6.70422 14.2447 6.73042C14.1572 6.75668 14.0231 6.55312 13.755 6.146C12.8268 4.73682 11.2615 3.17146 9.85228 2.2433C9.44515 1.97515 9.24162 1.84108 9.26788 1.75355C9.29408 1.66602 9.53055 1.66602 10.0033 1.66602H13.1044C13.6832 1.66602 13.9726 1.66602 14.1525 1.84583C14.3323 2.02564 14.3323 2.31505 14.3323 2.89386Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
            <path d="M1.66797 2.93268V4.41668C1.66797 4.93442 1.66797 5.1933 1.76439 5.42608C1.86081 5.65886 2.04386 5.84191 2.40996 6.20801L9.79264 13.5907C10.1588 13.9568 10.3418 14.1398 10.5746 14.2363C10.8074 14.3327 11.0662 14.3327 11.584 14.3327H13.068C13.6651 14.3327 13.9636 14.3327 14.1492 14.1472C14.3346 13.9617 14.3346 13.6631 14.3346 13.066V11.582C14.3346 11.0643 14.3346 10.8054 14.2382 10.5726C14.1418 10.3398 13.9588 10.1568 13.5926 9.79068L6.20996 2.40801C5.84386 2.04191 5.66081 1.85886 5.42803 1.76244C5.19526 1.66602 4.93638 1.66602 4.41863 1.66602H2.93464C2.33752 1.66602 2.03897 1.66602 1.85347 1.85152C1.66797 2.03702 1.66797 2.33557 1.66797 2.93268Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
    )
}
function IconTutorial() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.66667 1.33301H7.33333C4.81917 1.33301 3.5621 1.33301 2.78105 2.11405C2 2.89511 2 4.15218 2 6.66634V9.33301C2 11.8471 2 13.1043 2.78105 13.8853C3.5621 14.6663 4.81917 14.6663 7.33333 14.6663H8.66667C11.1808 14.6663 12.4379 14.6663 13.2189 13.8853C14 13.1043 14 11.8471 14 9.33301V6.66634C14 4.15218 14 2.89511 13.2189 2.11405C12.4379 1.33301 11.1808 1.33301 8.66667 1.33301Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M14 8H2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M10 4.66699H6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M10 11.333H6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
    )
}
function IconEducationCenter() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.0013 12.0007C8.73768 12.0007 9.33464 11.4037 9.33464 10.6673C9.33464 9.93094 8.73768 9.33398 8.0013 9.33398C7.26492 9.33398 6.66797 9.93094 6.66797 10.6673C6.66797 11.4037 7.26492 12.0007 8.0013 12.0007Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2.33203 4H13.6653" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 6.66699H14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 6.66699V9.33366" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 9.33301V6.66634C2 4.15218 2 2.89511 2.78105 2.11405C3.5621 1.33301 4.81917 1.33301 7.33333 1.33301H8.66667C11.1808 1.33301 12.4379 1.33301 13.2189 2.11405C14 2.89511 14 4.15218 14 6.66634V9.33301C14 11.8471 14 13.1043 13.2189 13.8853C12.4379 14.6663 11.1808 14.6663 8.66667 14.6663H7.33333C4.81917 14.6663 3.5621 14.6663 2.78105 13.8853C2 13.1043 2 11.8471 2 9.33301Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}
function IconTradingStrategies() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.66797 10.7717L2.66799 5.22707C2.66799 3.9958 2.668 3.38017 3.01305 2.93107C3.3581 2.48198 3.95296 2.3234 5.14268 2.00623L7.48149 1.38273C7.60529 1.34972 7.73289 1.33301 7.86102 1.33301C8.67489 1.33301 9.33469 1.99276 9.33469 2.80661V13.1924C9.33469 14.0062 8.67495 14.666 7.86109 14.666C7.73289 14.666 7.60529 14.6492 7.48142 14.6162L5.14243 13.9925C3.95281 13.6752 3.358 13.5166 3.01298 13.0676C2.66796 12.6185 2.66796 12.0029 2.66797 10.7717Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7.33203 7.33301V8.66634" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11.668 13.3327C11.9777 13.3327 12.1326 13.3327 12.2613 13.307C12.7903 13.2018 13.2038 12.7884 13.309 12.2594C13.3346 12.1306 13.3346 11.9758 13.3346 11.666V4.33264C13.3346 4.02291 13.3346 3.86804 13.309 3.73926C13.2038 3.21031 12.7903 2.79683 12.2613 2.69163C12.1326 2.66602 11.9777 2.66602 11.668 2.66602" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}
function IconHelp() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.586 5.01267C7.36667 4.32933 8.63333 4.32933 9.414 5.01267C10.1953 5.696 10.1953 6.804 9.414 7.48733C9.27867 7.60667 9.12733 7.70467 8.96733 7.782C8.47067 8.02267 8.00067 8.448 8.00067 9V9.5M14 8C14 8.78793 13.8448 9.56815 13.5433 10.2961C13.2417 11.0241 12.7998 11.6855 12.2426 12.2426C11.6855 12.7998 11.0241 13.2417 10.2961 13.5433C9.56815 13.8448 8.78793 14 8 14C7.21207 14 6.43185 13.8448 5.7039 13.5433C4.97595 13.2417 4.31451 12.7998 3.75736 12.2426C3.20021 11.6855 2.75825 11.0241 2.45672 10.2961C2.15519 9.56815 2 8.78793 2 8C2 6.4087 2.63214 4.88258 3.75736 3.75736C4.88258 2.63214 6.4087 2 8 2C9.5913 2 11.1174 2.63214 12.2426 3.75736C13.3679 4.88258 14 6.4087 14 8ZM8 11.5H8.00533V11.5053H8V11.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}
function IconContact() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.268 5.00026H10.2346M12.468 5.00037H12.4346M10.3013 5.00026C10.3013 5.03708 10.2714 5.06693 10.2346 5.06693C10.1978 5.06693 10.168 5.03708 10.168 5.00026C10.168 4.96345 10.1978 4.93359 10.2346 4.93359C10.2714 4.93359 10.3013 4.96345 10.3013 5.00026ZM12.5013 5.00037C12.5013 5.03719 12.4714 5.06703 12.4346 5.06703C12.3978 5.06703 12.368 5.03719 12.368 5.00037C12.368 4.96355 12.3978 4.9337 12.4346 4.9337C12.4714 4.9337 12.5013 4.96355 12.5013 5.00037Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11.3333 8.37778C13.1741 8.37778 14.6667 6.94998 14.6667 5.18891C14.6667 3.42785 13.1741 2 11.3333 2C9.4926 2 8 3.42785 8 5.18891C8 6.03503 8.34447 6.80385 8.90627 7.37438C9.03 7.49998 9.1126 7.67158 9.07927 7.84825C9.02427 8.13705 8.8996 8.40645 8.71707 8.63098C9.19733 8.72031 9.69673 8.63985 10.125 8.41211C10.2761 8.33171 10.3521 8.29131 10.4055 8.28318C10.4589 8.27505 10.5355 8.28938 10.6885 8.31811C10.9011 8.35805 11.1169 8.37805 11.3333 8.37778Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6.66797 8.66602C6.66797 9.77062 5.77254 10.666 4.66797 10.666C3.5634 10.666 2.66797 9.77062 2.66797 8.66602C2.66797 7.56148 3.5634 6.66602 4.66797 6.66602C5.77254 6.66602 6.66797 7.56148 6.66797 8.66602Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7.9987 13.9993C7.9987 12.1584 6.50631 10.666 4.66536 10.666C2.82442 10.666 1.33203 12.1584 1.33203 13.9993" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

// ─── Nav structure ────────────────────────────────────────────────────────────

const NAV_SECTIONS = [
    {
        label: 'WORK SPACE',
        items: [
            { label: 'Analysis', href: '/analysis', icon: <IconAnalysis /> },
            { label: 'Market Report', href: '/market-report', icon: <IconMarketReport /> },
        ],
    },
    {
        label: 'MACRO',
        items: [
            { label: 'Macro Nowcast', href: '/macro-nowcast', icon: <IconMacro /> },
            { label: 'Macro Signals', href: '/macro-signals', icon: <IconSignal /> },
            { label: 'Relief Signals', href: '/relief-signals', icon: <IconReliefSignals /> },
        ],
    },
    {
        label: 'FLOW & POSITIONING',
        items: [
            { label: 'Options Positioning', href: '/options-positioning', icon: <IconOptions /> },
            { label: 'Seasonality & Flow', href: '/seasonality-flow', icon: <IconSeason /> },
        ],
    },
    {
        label: 'CRYPTO',
        items: [
            { label: 'Crypto / BTC', href: '/crypto-btc', icon: <IconCrypto /> },
        ],
    },
    {
        label: 'INTELLIGENCE',
        items: [
            { label: 'Geopolitical', href: '/geopolitical', icon: <IconGeo /> },
            { label: 'News', href: '/news', icon: <IconNews /> },
        ],
    },
    {
        label: 'LEARNING',
        items: [
            { label: 'Tutorial', href: '/tutorial', icon: <IconTutorial /> },
            { label: 'Education Center', href: '/education-center', icon: <IconEducationCenter /> },
            { label: 'Trading Strategies', href: '/trading-strategies', icon: <IconTradingStrategies /> },
        ],
    },
    {
        label: 'SUPPORT',
        items: [
            { label: 'Help Center', href: '/help-center', icon: <IconHelp /> },
            { label: 'Contact Support', href: '/contact-support', icon: <IconContact /> },
        ],
    },
]

// ─── Component ────────────────────────────────────────────────────────────────

export default function DashboardSidebar() {
    const pathname = usePathname()
    const [mobileOpen, setMobileOpen] = useState(false)

    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    // Close on outside click
    useEffect(() => {
        function handler(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    const sidebarContent = (
        <div className='w-full flex flex-col h-full pt-4'>
            {/* User */}
            <div ref={ref} className='px-4 relative pb-6'>
                <button
                    onClick={() => setOpen(prev => !prev)}
                    className='w-full flex items-center justify-between gap-2 group cursor-pointer'
                >
                    {/* Avatar with online dot */}
                    <div className='flex items-center gap-2'>
                        <div className='relative flex-shrink-0'>
                            <div className='w-10 h-10 rounded-full bg-[#FFFFFF08] border border-[#FFFFFF1A] flex items-center justify-center text-white/60 text-[15px] font-medium leading-[12px]'>
                                SM
                            </div>
                            <span className='absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#62A381] border-1 border-[#0D1115]' />
                        </div>
                        {/* Name + role */}
                        <div className='block text-left'>
                            <p className='text-white text-[14px] leading-[17px] font-semibold'>Smith Murphy</p>
                            <p className='text-white/60 text-[11px] leading-[13px] font-normal mt-1'>Early Bird</p>
                        </div>
                    </div>
                    {/* Chevron */}
                    <svg className={`flex items-end justify-end text-white group-hover:text-white/70 transition-all duration-200 ml-2 ${open ? 'rotate-180' : 'rotate-0'}`} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                {/* Dropdown */}
                {open && (
                    <div className='absolute right-4 top-[calc(100%-16px)] w-[200px] bg-[#1E1E2A] border border-[#FFFFFF0F] rounded-md overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.4)] z-50'>
                        <Link
                            href='/login'
                            onClick={() => setOpen(false)}
                            className='flex items-center gap-2.5 w-full px-4 py-3 text-[13px] text-[#FF6B6B] hover:bg-[#FFFFFF08] transition-colors'
                        >
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                                <path d="M5.5 13H3a1 1 0 01-1-1V3a1 1 0 011-1h2.5M10 10.5L13 7.5M13 7.5L10 4.5M13 7.5H6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Logout
                        </Link>
                    </div>
                )}
            </div>

            {/* Nav sections */}
            <nav className='dashboard-nav flex-1 overflow-y-auto px-4'>
                {NAV_SECTIONS.map((section) => (
                    <div key={section.label} className='mb-5'>
                        <p className='text-white/60 text-[12px] leading-[14px] font-semibold uppercase mb-2.5'>
                            {section.label}
                        </p>
                        <ul className='space-y-1'>
                            {section.items.map((item) => {
                                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className={`border-l flex items-center gap-2 p-3 h-10 text-[14px] leading-[17px] transition-colors duration-150 group ${isActive
                                                ? 'bg-[#88C4FF26] text-[#88C4FF] font-semibold border-[#88C4FF]'
                                                : 'text-[#FFFFFF60] hover:text-white hover:bg-[#FFFFFF08] font-medium border-transparent'
                                                }`}
                                        >
                                            <span className={`flex-shrink-0 ${isActive ? 'text-[#88C4FF]' : 'text-[#9498A8] group-hover:text-white'} transition-colors`}>
                                                {item.icon}
                                            </span>
                                            {item.label}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                ))}
            </nav>

            {/* Bottom logo */}
            <div className='px-4 py-5 mt-auto'>
                <Image
                    src='/assets/full-logo.svg'
                    alt='CrossResearch'
                    width={218}
                    height={28}
                />
            </div>

        </div>
    )

    return (
        <>
            {/* Desktop sidebar — fixed */}
            <aside className='hidden lg:flex fixed top-0 left-0 h-full w-[268px] bg-[#16161F] border-r border-[#FFFFFF0F] flex-col z-40'>
                {sidebarContent}
            </aside>

            {/* Mobile toggle button */}
            <button
                className='lg:hidden fixed top-4 left-4 z-50 w-9 h-9 bg-[#0C1018] border border-[#FFFFFF14] rounded-lg flex items-center justify-center'
                onClick={() => setMobileOpen(true)}
                aria-label='Open menu'
            >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 4h12M2 8h12M2 12h12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            </button>

            {/* Mobile drawer */}
            {mobileOpen && (
                <>
                    <div className='fixed inset-0 bg-black/60 z-40' onClick={() => setMobileOpen(false)} />
                    <aside className='fixed top-0 left-0 h-full w-[260px] bg-[#0C1018] border-r border-[#FFFFFF0D] z-50 flex flex-col'>
                        <button
                            className='absolute top-4 right-4 text-white/60 hover:text-white'
                            onClick={() => setMobileOpen(false)}
                            aria-label='Close menu'
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </button>
                        {sidebarContent}
                    </aside>
                </>
            )}
        </>
    )
}
