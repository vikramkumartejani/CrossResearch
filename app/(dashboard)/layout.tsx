import DashboardSidebar from '../components/Dashboard/DashboardSidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex min-h-screen bg-[#070711]'>
            {/* Sidebar */}
            <DashboardSidebar />

            {/* Main content */}
            <div className='flex flex-col flex-1 min-w-0 lg:pl-[268px]'>
                <main className='flex-1 px-4 lg:px-6 pt-6 overflow-auto'>
                    {children}
                    <p className='my-6 text-center text-[#838388] text-[14px] leading-[20px] font-normal'>
                        Market Intelligence • Not Investment Advice • Users Remain Solely Responsible For All Investment Decisions And Associated Risks
                    </p>
                </main>
            </div>
        </div>
    )
}
