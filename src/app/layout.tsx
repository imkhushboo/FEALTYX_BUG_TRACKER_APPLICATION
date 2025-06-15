// src/app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import { Providers } from '../redux/provider'
import { Toaster } from 'react-hot-toast';


export const metadata = {
  title: 'Bug Tracker',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <Toaster
            position="top-right" // You can adjust position
            reverseOrder={false}
            toastOptions={{
              className: '',
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
