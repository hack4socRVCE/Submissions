"use client"
import React from 'react'
import Demo from '../Filter/Demo'
import { Input } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useChipsStore } from '@/store/useChipsStore'

const InputForm = () => {

  const router = useRouter()

  const [link, setLink] = React.useState<string>("")
  const chip = useChipsStore(state => state.chips)

  const handleSubmit = (e) => {
    e.preventDefault()
    const values = 'filters='+ chip.join(',')
    console.log(values)
    router.push(`/Analysis?link=${link}&`+values)
  }

  return (
   <>
   <form className='pt-6'>   
    <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="input__container">
  <div className="shadow__input"></div>
  <div className='flex gap-4 w-full b'>
  <Input type="text" name="text" className="input__search  px-5" placeholder="Paste your Amazon link here" onChange={(e) => setLink(e.target.value)}/>
  <Demo chips={[]} />
  </div>
  
  <button className="input__button__shadow" onClick={handleSubmit}>
  <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" height="20px" width="20px">
      <path d="M4 9a5 5 0 1110 0A5 5 0 014 9zm5-7a7 7 0 104.2 12.6.999.999 0 00.093.107l3 3a1 1 0 001.414-1.414l-3-3a.999.999 0 00-.107-.093A7 7 0 009 2z" fill-rule="evenodd" fill="#17202A"></path>
    </svg>
    </button>
</div>
</form>

    </>
  )
}

export default InputForm
