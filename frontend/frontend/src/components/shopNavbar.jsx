"use client"
import React, { useEffect, useState, useContext} from 'react'
import logo from '../../public/icons/logo.svg'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Context } from '@/app/layout'

const ShopNavbar = () => {
  const [search, setSearch] = useState("")

  
  const [jwt, setJwt] = useState('')

  useEffect(()=> {
    let localStorageJwt = localStorage.getItem("jwt") 
    setJwt(localStorageJwt)

  },[])

  const router = useRouter()

  const handleLogout = () => {
    localStorage.clear()
    setJwt("")
    router.refresh()
    router.push('/')
  }



  return (
    <nav  className='fixed top-0 z-50 flex flex-row-reverse justify-between w-full h-16 border-solid border-b-[1px] bg-white border-[#999999]'>
    <div  className='flex flex-row justify-between items-center h-full w-56 mr-10  text-[#999999]'>
{
      jwt
       ?
        <button onClick={handleLogout} className='border-solid h-10 w-24 rounded-xl active:opacity-60  hover:opacity-70 border-2 text-black border-[#999999]'>logout</button>
      :
      <>
      <button  onClick={()=>{router.push('/login')}}
        className='border-solid h-10 w-24 rounded-xl active:opacity-60  hover:opacity-70 border-2 text-black border-[#999999]'>login</button>
      <button  onClick={()=>router.push('/sign-up')} className='w-24 h-10 text-white bg-black border-2 border-solid active:opacity-60 rounded-xl hover:opacity-70'>Sign Up</button>
      </>
      }
    </div>
    <div className='flex flex-row-reverse'>
      <div className='grid place-content-center  w-96 text-[#999999] '>
        <input   value={search} onChange={(e)=>setSearch(e.target.value)} name='search' className='h-10 bg-white   border-solid border-[1px] border-[#999999] w-96 rounded-2xl placeholder:text-start placeholder:p-4 placeholder:font-Roboto placeholder:text-black placeholder:text-[15px] focus:text-start focus:p-4 focus:font-Roboto focus:text-black placeholder:font-normal focus:text-[20px] focus:font-bold' type='text' placeholder='enter keywords to searsh' />
        <button onClick={HandleSubmit} className='w-6 h-6 bg-black' />
      </div>
    <div className='grid mb-4 mr-10 place-content-center w-52 '>
      <Image onClick={()=>router.push('/')} src={logo} className='w-24 h-24 cursor-pointer' />
    </div>
    </div>

  </nav>  )
}

export default ShopNavbar