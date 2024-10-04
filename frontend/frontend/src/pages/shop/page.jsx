import React, { useState, useEffect } from 'react'
import ShopCard from '../../components/ShopCard'
import searchIcon from '../../../public/icons/search.svg'
import Navbar from '../../components/navbar'
import { useSendGetPostQuery } from '../../services/general_api'

const Shop = () => {
  const [search, setSearch] = useState("")
  const [clicked, setClicked] = useState(false)

  let {data:posts, isLoading} = useSendGetPostQuery() 



  return (
    <div className='flex flex-col w-screen h-screen'>
      <Navbar />
        <div className='grid place-content-center mt-14 w-screen h-24 text-[#999999] '>
        <div className='flex flex-row'>
        <input   value={search} onChange={(e)=>setSearch(e.target.value)} name='search' className='h-10 bg-white border-solid border-[1px] border-[#999999] w-96 rounded-l-2xl  placeholder:text-start placeholder:p-4 placeholder:font-Roboto placeholder:text-black placeholder:text-[15px] focus:text-start focus:p-4 focus:font-Roboto focus:text-black placeholder:font-normal focus:text-[20px] focus:font-bold' type='text' placeholder='enter keywords to searsh' />
        <img src={searchIcon}  className='w-12 h-10 bg-black cursor-pointer rounded-r-2xl' />
        </div>
      </div>
      <div className='flex flex-col items-center'>
        <div className='flex flex-wrap justify-center w-11/12 h-full mt-5 lg:justify-between '>
      {posts?.map((post, index)=>{
        return(
         <ShopCard id={post.id} key={index} src={post.image} type={post.componentType} user={post.author} price={post.price} />
        )
      })}
        
        </div>
      </div>
    </div>
  )
}

export default Shop