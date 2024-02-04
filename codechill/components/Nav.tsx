import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

const Nav = (props: Props) => {
  return (
    <div className='w-full h-[5%] px-10 py-6 flex items-center justify-between -z-10'>
        <Link href='/'>
        <div className='flex gap-2 items-center'>
            <div className='relative h-10 w-10'>
                <Image src='/black.png' alt='logo' layout='fill' objectFit='contain' />
            </div>
            <h3>IsWiseChoice?</h3>
        </div>
        </Link>
        <Link href='/about'><h5 className='items-center'>About Us</h5></Link>
    </div>
  )
}

export default Nav