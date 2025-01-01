import Link from 'next/link'
import React from 'react'

type Props = {}

export default function Sidebar({ }: Props) {
  return (
    <div className='h-full bg-gray-100 overflow-y-auto h-[2000px] p-4 w-[300px]'>
      <h2 className='text-lg font-bold'>Mon Comptable</h2>
      <div className='flex-1 flex flex-col gap-4 mt-4'>
        <Link href="/dashboard">
          Dashboard
        </Link>
        <Link href="/customers">
          Clients
        </Link>
        <Link href="/team">
          Utilisateurs
        </Link>
      </div>
    </div>
  )
}