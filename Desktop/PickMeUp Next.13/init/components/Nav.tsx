import Image from 'next/image'
import React from 'react'
import { ModeToggle } from './ui/toggleMode'
import Link from 'next/link'

const Nav = () => {
  return (
    <div className='flex gap-5 justify-between items-center'>
        <Link href={"/"}>
            <Image
                src="/PickMeUp logo SVG.svg"
                alt="PickMeUp Logo"
                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                width={100}
                height={24}
                priority
            />
        </Link>
        <ModeToggle />
    </div>
  )
}

export default Nav