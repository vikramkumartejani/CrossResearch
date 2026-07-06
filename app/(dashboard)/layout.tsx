import DashboardSidebar from '../components/Dashboard/DashboardSidebar'
import DashboardHeader from '../components/Dashboard/DashboardHeader'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex min-h-screen bg-[#070711]'>
            {/* Sidebar */}
            <DashboardSidebar />

            {/* Main content */}
            <div className='flex flex-col flex-1 min-w-0 lg:pl-[280px]'>
                <DashboardHeader />
                <main className='flex-1 px-4 lg:px-6 pt-6 overflow-auto'>
                    {children}
                    <div className='my-6 flex items-center justify-center flex-wrap gap-x-1 text-center text-[#838388] text-[14px] leading-[20px] font-normal'>Market intelligence <div className='bg-[#838388] rounded-full w-[5px] h-[5px]' />
                        not investment advice <div className='bg-[#838388] rounded-full w-[5px] h-[5px]' />
                        Users remain solely responsible for all investment decisions and associated risks
                    </div>
                </main>
            </div>
        </div>
    )
}
