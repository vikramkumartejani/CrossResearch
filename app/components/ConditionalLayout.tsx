'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatWidget from './ChatWidget';

const AUTH_PATHS = ['/login', '/signup', '/forgot-password', '/onboarding', '/support', '/affiliate/signup']
const DASHBOARD_PATHS = ['/analysis', '/market-report', '/macro-nowcast', '/macro-signals', '/relief-signals', '/options-positioning', '/seasonality-flow', '/crypto-btc', '/geopolitical', '/news', '/tutorial', '/education-center', '/trading-strategies', '/help-center', '/contact-support', '/affiliate-center']

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isAuth = AUTH_PATHS.some((p) => pathname.startsWith(p))
    const isDashboard = DASHBOARD_PATHS.some((p) => pathname.startsWith(p))
    const hideShell = isAuth || isDashboard

    return (
        <>
            {!hideShell && <Navbar />}
            {children}
            {!hideShell && <Footer />}
            <ChatWidget />
        </>
    );
}
