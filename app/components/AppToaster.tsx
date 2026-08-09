'use client'

import { Toaster } from 'sonner'

export default function AppToaster() {
  return (
    <Toaster
      theme="dark"
      position="top-center"
      offset={20}
      gap={10}
      visibleToasts={3}
      duration={3200}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            'w-[min(420px,calc(100vw-24px))] flex items-start gap-3 rounded-2xl border border-white/10 bg-[#12121A]/95 px-4 py-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md',
          title: 'text-[14px] font-medium leading-5 text-white',
          description: 'mt-0.5 text-[12px] leading-4 text-white/55',
          actionButton:
            'ml-auto shrink-0 rounded-full bg-[#88C4FF] px-3 py-1.5 text-[12px] font-semibold text-black',
          cancelButton:
            'ml-auto shrink-0 rounded-full border border-white/15 px-3 py-1.5 text-[12px] text-white/70',
          closeButton:
            'absolute right-2.5 top-2.5 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 hover:bg-white/10 hover:text-white',
          success: 'border-[#62A381]/35',
          error: 'border-[#E25C3F]/40',
          info: 'border-[#88C4FF]/30',
          warning: 'border-[#E8B84A]/35',
          icon: 'mt-0.5 text-white/80',
        },
      }}
    />
  )
}
