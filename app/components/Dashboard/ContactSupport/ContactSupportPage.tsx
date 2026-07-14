'use client'

import { useState } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

type Status = 'Open' | 'In Progress' | 'Resolved' | 'Closed'

interface Ticket {
    id: string
    subject: string
    category: string
    status: Status
    updated: string
    msgs: number
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const TICKETS: Ticket[] = [
    { id: 'TCK-2417', subject: 'Macro Nowcast value seems delayed vs Atlanta Fed', category: 'Data & Signals', status: 'Open', updated: 'Apr 23, 2026', msgs: 3 },
    { id: 'TCK-2408', subject: 'Cannot enable MFA on my Workspace', category: 'Account & Auth', status: 'In Progress', updated: 'Apr 21, 2026', msgs: 5 },
    { id: 'TCK-2359', subject: 'Button alignment issue on dashboard', category: 'User Interface', status: 'Resolved', updated: 'Apr 20, 2026', msgs: 2 },
    { id: 'TCK-2384', subject: 'Slow loading times in the app', category: 'Performance', status: 'Open', updated: 'Apr 19, 2026', msgs: 4 },
    { id: 'TCK-2305', subject: 'Rate limit reached on API calls', category: 'API Services', status: 'In Progress', updated: 'Apr 18, 2026', msgs: 3 },
    { id: 'TCK-2391', subject: 'Push notifications not working on iOS', category: 'Notifications', status: 'Resolved', updated: 'Apr 17, 2026', msgs: 1 },
    { id: 'TCK-2401', subject: 'Discrepancy in recent invoice', category: 'Billing', status: 'Open', updated: 'Apr 16, 2026', msgs: 4 },
    { id: 'TCK-2372', subject: 'Suspected unauthorized access attempt', category: 'Security', status: 'In Progress', updated: 'Apr 15, 2026', msgs: 5 },
    { id: 'TCK-2368', subject: 'Feedback on recent UI changes', category: 'User Experience', status: 'Closed', updated: 'Apr 14, 2026', msgs: 2 },
    { id: 'TCK-2410', subject: 'Issues with third-party integration setup', category: 'Integrations', status: 'In Progress', updated: 'Apr 13, 2026', msgs: 3 },
    { id: 'TCK-2425', subject: 'Error in data reporting', category: 'Analytics', status: 'Open', updated: 'Apr 12, 2026', msgs: 4 },
    { id: 'TCK-2409', subject: 'Screen reader compatibility issues', category: 'Accessibility', status: 'Resolved', updated: 'Apr 11, 2026', msgs: 1 },
    { id: 'TCK-2437', subject: 'Missing API documentation for new features', category: 'Documentation', status: 'Open', updated: 'Apr 10, 2026', msgs: 5 },
]

// ─── Status badge ─────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<Status, string> = {
    'Open': 'text-[#6B7280]',
    'In Progress': 'text-[#A16207]',
    'Resolved': 'text-[#2CB37B]',
    'Closed': 'text-[#E25C3F]',
}

function StatusBadge({ status }: { status: Status }) {
    return (
        <span className={`text-[14px] leading-[18px] font-semibold ${STATUS_STYLES[status]}`}>
            {status}
        </span>
    )
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────

type TabKey = 'All' | 'Open' | 'In Progress' | 'Resolved' | 'Closed'

function getTabs(tickets: Ticket[]): { key: TabKey; label: string; count: number }[] {
    return [
        { key: 'All', label: 'All', count: tickets.length },
        { key: 'Open', label: 'Open', count: tickets.filter(t => t.status === 'Open').length },
        { key: 'In Progress', label: 'In Progress', count: tickets.filter(t => t.status === 'In Progress').length },
        { key: 'Resolved', label: 'Resolved', count: tickets.filter(t => t.status === 'Resolved').length },
        { key: 'Closed', label: 'Closed', count: tickets.filter(t => t.status === 'Closed').length },
    ]
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ContactSupportPage() {
    const [activeTab, setActiveTab] = useState<TabKey>('All')
    const tabs = getTabs(TICKETS)

    const filtered = activeTab === 'All'
        ? TICKETS
        : TICKETS.filter(t => t.status === activeTab)

    return (
        <div className='px-4 lg:px-6'>
            <div className='mb-3 flex items-center gap-1'>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.125 9C16.125 12.935 12.935 16.125 9 16.125C7.77893 16.125 6.62955 15.8178 5.625 15.2765C4.22383 14.5215 3.28097 15.2234 2.44944 15.3494C2.3233 15.3685 2.19768 15.3227 2.10748 15.2325C1.97056 15.0956 1.9445 14.8838 2.02013 14.7056C2.34649 13.9364 2.64615 12.4787 2.23756 11.25C2.00235 10.5428 1.875 9.78623 1.875 9C1.875 5.06497 5.06497 1.875 9 1.875C12.935 1.875 16.125 5.06497 16.125 9Z" stroke="#838388" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9.09427 9H9.00052M6.09375 9H6M12.0937 9H12M9.18802 9C9.18802 9.10358 9.1041 9.1875 9.00052 9.1875C8.89702 9.1875 8.81302 9.10358 8.81302 9C8.81302 8.89643 8.89702 8.8125 9.00052 8.8125C9.1041 8.8125 9.18802 8.89643 9.18802 9ZM6.1875 9C6.1875 9.10358 6.10355 9.1875 6 9.1875C5.89645 9.1875 5.8125 9.10358 5.8125 9C5.8125 8.89643 5.89645 8.8125 6 8.8125C6.10355 8.8125 6.1875 8.89643 6.1875 9ZM12.1875 9C12.1875 9.10358 12.1036 9.1875 12 9.1875C11.8964 9.1875 11.8125 9.10358 11.8125 9C11.8125 8.89643 11.8964 8.8125 12 8.8125C12.1036 8.8125 12.1875 8.89643 12.1875 9Z" stroke="#838388" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h2 className='text-[#838388] text-[12px] leading-3.5 font-medium'>Contact Support</h2>
            </div>

            <div className='flex items-center justify-between mb-5'>
                <div>
                    <h3 className='text-white text-[35px] font-medium leading-[42px] mb-2'>Your Tickets</h3>
                    <p className='text-[#838388] text-[12px] leading-[17px]'>
                        Open a new ticket, track conversations with the support desk, and search your Historical Requests.
                    </p>
                </div>
                <button className='flex items-center gap-1 h-[33px] px-6 bg-[#88C4FF] text-black text-[14px] leading-5 font-medium hover:bg-[#88C4FF]/90 transition-colors cursor-pointer'>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 3.75V14.25" stroke="black" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3.75 9H14.25" stroke="black" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    New Ticket
                </button>
            </div>

            {/* Tabs */}
            <div className='flex items-center gap-2 mb-5 bg-[#16161F] border border-[#FFFFFF0D] w-fit p-1'>
                {tabs.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`px-3 py-1 text-[14px] leading-5 transition-colors cursor-pointer ${activeTab === tab.key
                            ? 'text-white bg-[#FFFFFF0D] font-semibold'
                            : 'text-[#838388] hover:text-white/70 font-normal'
                            }`}
                    >
                        {tab.label} {tab.count}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className='w-full bg-[#16161F] border border-[#FFFFFF08] overflow-x-auto'>
                <table className='w-full border-collapse'>
                    <thead>
                        <tr className='border-b border-[#FFFFFF1A]'>
                            {['TICKET', 'SUBJECT', 'CATEGORY', 'STATUS', 'UPDATED', 'MSGS'].map(col => (
                                <th key={col} className='px-6 pt-6 pb-[17px] text-left text-[14px] leading-[17px] font-semibold text-white uppercase whitespace-nowrap'>
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((ticket, i) => (
                            <tr
                                key={ticket.id}
                                className={`cursor-pointer hover:bg-[#FFFFFF04] transition-colors ${i !== filtered.length - 1 ? 'border-b border-[#FFFFFF0D]' : ''}`}
                            >
                                <td className='px-6 py-5 text-[14px] leading-5 text-[#838388] font-normal whitespace-nowrap'>{ticket.id}</td>
                                <td className='px-6 py-5 text-[14px] leading-[17px] text-white font-medium'>{ticket.subject}</td>
                                <td className='px-6 py-5 text-[14px] leading-5 text-[#838388] font-normal whitespace-nowrap'>{ticket.category}</td>
                                <td className='px-6 py-5 whitespace-nowrap'><StatusBadge status={ticket.status} /></td>
                                <td className='px-6 py-5 text-[14px] leading-5 text-[#838388] font-normal whitespace-nowrap'>{ticket.updated}</td>
                                <td className='px-6 py-5 text-[14px] leading-5 text-[#838388] font-normal text-left whitespace-nowrap'>{ticket.msgs}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
