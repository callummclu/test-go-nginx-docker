import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="mb-1 text-3xl">Page under construction</h1>
      <p>visit the main site <a className='text-green-500' href="https://callummclu.co.uk">here</a></p>
    </main>
  )
}
