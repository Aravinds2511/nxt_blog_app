import Navbar from '@/components/navbar/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import getCurrentUser from './actions/getCurrentUser'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'next_Blog_App',
  description: 'a blogging app using next.js',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body className={`${inter.className} bg-teal-400`}>
        <Navbar currentUser={currentUser}/>
        {children}
        </body>
    </html>
  )
}
