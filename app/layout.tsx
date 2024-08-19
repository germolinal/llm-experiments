import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'GenAI UX',
  description: '...'
}

function Topbar () {
  return <nav className={styles.topbar}>
    <a href="/" >Home</a>
  </nav>
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={styles.body}>
        <Topbar />

        {children}
      </body>
    </html>
  )
}
