import type { Metadata } from 'next'
import './globals.css'
import styles from './page.module.css'
import { Topbar } from './topbar'

export const metadata: Metadata = {
  title: 'GenAI UX',
  description: '...'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={styles.body}>
        <Topbar>{children}</Topbar>
      </body>
    </html>
  )
}
