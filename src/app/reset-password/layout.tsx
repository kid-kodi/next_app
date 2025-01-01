import React from 'react'

type Props = { children: React.ReactNode; }

export default function layout({ children }: Props) {
	return (
		<div className='h-screen flex flex-col items-center justify-center gap-3'>{children}</div>
	)
}