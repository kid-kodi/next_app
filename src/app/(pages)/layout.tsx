import Infobar from '@/components/global/Infobar';
import Sidebar from '@/components/layout/Sidebar';
import React from 'react'

type Props = { children: React.ReactNode; }

export default function layout({ children }: Props) {
  return (
    <div className='h-screen overflow-hidden flex gap-3'>
      <Sidebar />
      <main className='flex-1 p-4'>
        {children}
      </main>
    </div>
  )
}