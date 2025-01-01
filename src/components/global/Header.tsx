"use client";

import React from 'react'
import { Button } from '../ui/button';
import { useUser } from '@/providers/UserProvider';
import { useRouter } from 'next/navigation';

type Props = {}

export default function Header({ }: Props) {
    const { logout } = useUser();
    const router = useRouter();

    const handleLogout = () => {
        logout()
        router.replace("/login")
    }
    return (
        <div>Header <Button onClick={handleLogout}>Logout</Button></div>
    )
}