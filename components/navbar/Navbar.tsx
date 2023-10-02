'use client'

import { SafeUser } from '@/types'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

interface UserMenuProps {
    currentUser: SafeUser | null
  }


export default function Navbar({currentUser}:UserMenuProps) {


  return (
    <header>
         <nav className='bg-teal-800 flex justify-between px-4 py-6 shadow-xl'>
            <div className='text-1xl font-bold text-center text-green-300 uppercase'>{currentUser?.name}</div>

            <div className="text-1xl font-bold text-center text-yellow-400">BLOGGERSZZ</div>

            <div className='flex gap-4 text-1xl font-bold text-center text-gray-300'>
            <Link href='/'>Home</Link>
            <Link href={currentUser ? '/create': '/register'}>Create</Link>
            {currentUser ? <button onClick={() => signOut()}>Sign out</button> : <Link href='/register'>Register</Link>}
            </div>
        </nav>
    </header>
  )
}