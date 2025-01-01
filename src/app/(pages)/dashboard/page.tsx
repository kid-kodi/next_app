'use client';

import { logout } from '@/api/auth'
import { Button } from '@/components/ui/button'
import React from 'react'

type Props = {}

export default function DashBoardPage({}: Props) {
  
  
  const handleLogout = async () => {
    await logout()
  }


  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}