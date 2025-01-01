'use client';

import { logout } from '@/api/auth'
import { Button } from '@/components/ui/button'
import React from 'react'

type Props = {}

export default function DashBoardPage({}: Props) {
  
  
  const handleLogout = async () => {
    await logout()
  }

  // const getCurrentUser = async () => {
  //   const user = await getUser()
  //   console.log(user)
  // }

  // getCurrentUser()



  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}