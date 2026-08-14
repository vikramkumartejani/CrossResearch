'use client'

import { Toaster } from 'sonner'

export default function AppToaster() {
  return (
    <Toaster
      theme="dark"
      position="top-center"
      offset={88}
      gap={8}
      visibleToasts={3}
      duration={3800}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            'w-[min(380px,calc(100vw-32px))] flex items-center gap-3 rounded-full border border-[#FFFFFF18] bg-[#16161F]/95 px-3.5 py-2.5 shadow-[0_16px_48px_rgba(0,0,0,0.55)] backdrop-blur-md',
          title: 'text-[13px] font-medium leading-[18px] text-white pr-1',
          description: 'mt-0.5 text-[12px] leading-4 text-white/50',
          icon: 'flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFFFFF10] [&>svg]:h-[15px] [&>svg]:w-[15px]',
          success:
            'border-[#2CB37B44] [&>[data-icon]]:bg-[#2CB37B1F] [&>[data-icon]]:text-[#2CB37B]',
          error:
            'border-[#E25C3F44] [&>[data-icon]]:bg-[#E25C3F1F] [&>[data-icon]]:text-[#E25C3F]',
          info: 'border-[#88C4FF33] [&>[data-icon]]:bg-[#88C4FF1A] [&>[data-icon]]:text-[#88C4FF]',
          warning:
            'border-[#E8B84A44] [&>[data-icon]]:bg-[#E8B84A1F] [&>[data-icon]]:text-[#E8B84A]',
          closeButton:
            'absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border border-white/10 bg-[#16161F] text-white/45 hover:text-white',
        },
      }}
    />
  )
}
