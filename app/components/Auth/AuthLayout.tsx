import AuthRightPanel from "./AuthRightPanel";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="relative min-h-screen w-full grid bg-[#0A0F1C] grid-col-2 xl:grid-cols-[1fr_700px] 2xl:grid-cols-[1fr_970px] p-4 sm:p-5 overflow-hidden">

            {/* Ellipse 13 - left top glow */}
            <div aria-hidden="true" className="absolute pointer-events-none w-[500px] sm:w-[787px] h-[300px] sm:h-[504px] top-[-150px] sm:top-[-100px] blur-[100px] sm:blur-[250px]" style={{
                left: '-150px',
                background: 'rgba(34, 126, 217, 0.4)',
                zIndex: 0,
            }} />

            {/* Ellipse 14 - left bottom glow */}
            <div aria-hidden="true" className="absolute pointer-events-none bottom-[-100px] sm:bottom-[-300px] w-[400px] sm:w-[818px] h-[200px] sm:h-[324px] blur-[100px] sm:blur-[250px]" style={{
                left: '-256px',
                background: 'rgba(34, 126, 217, 0.4)',
                zIndex: 0,
            }} />

            {/* Left - form */}
            <div className="relative z-10 w-full flex flex-col justify-center lg:pr-5">
                <div className="max-w-[616px] mx-auto w-full">
                    {children}
                </div>
            </div>

            {/* Right - decorative panel, hidden on mobile */}
            <div className="hidden lg:flex relative z-10 w-full h-full min-h-[calc(100vh-2rem)]">
                <AuthRightPanel />
            </div>
        </div>
    );
}
