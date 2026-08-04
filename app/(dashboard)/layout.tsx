import DashboardSidebar from '../components/Dashboard/DashboardSidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex h-screen bg-[#070711] overflow-hidden'>
            <DashboardSidebar />

            <div className='flex flex-col flex-1 min-w-0 lg:pl-[268px] min-h-0'>
                <main className='flex-1 overflow-y-auto pt-18 lg:pt-6 min-h-0 dashboard-scroll'>
                    {children}
                    <p className='border-t border-[#FFFFFF0D] mt-6 py-3 px-4 text-center text-[#838388] text-[12px] sm:text-[14px] leading-[20px] font-normal'>
                        Market intelligence • Not investment advice • Users remain solely responsible for all investment decisions and associated risks
                    </p>
                </main>
            </div>
        </div>
    )
}
