import Destination from '@/components/Destination'
import Languege from '@/components/Languege'
import Nav from '@/components/Nav'
import { Payment } from '@/components/payment'
import { ModeToggle } from '@/components/ui/toggleMode'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="p-5">
      <Destination />
    </main>
  )
}
