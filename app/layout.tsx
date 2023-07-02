import NavBar from '@/components/NavBar'
import './globals.css'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Car-ShowCase',
  description: 'Dealing with Cars',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='relative'>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
