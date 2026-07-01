'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

const AUTH_PATHS = ['/login', '/signup', '/forgot-password'];

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuth = AUTH_PATHS.some((p) => pathname.startsWith(p));

    return (
        <>
            {!isAuth && <Navbar />}
            {children}
            {!isAuth && <Footer />}
        </>
    );
}
