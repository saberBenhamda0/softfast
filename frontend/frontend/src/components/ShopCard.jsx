import React from 'react'
import { useNavigate } from 'react-router-dom'


const ShopCard = (props) => {
  const navigate = useNavigate()


  const handleClick = (id) => {
    navigate(`/shop/${id}`)
  }


  const API_URL = "http://localhost:8000"
return (
    <div onClick={()=>handleClick(props.id)} className='w-[303px] mr-4 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow h-[388px] flex flex-col cursor-pointer  mt-10  '>
    <img src={`${API_URL}${props.src}`} height={266} width={303} className='  w-[303px] h-[266px] rounded-2xl' />
    <div className='  ml-2 w-full h-[122px] flex-col flex justify-between '>
      <h3 className='mt-2 text-lg text-[#222222] font-medium font-robot'>{props.type}</h3>
      <span className=' text-[#717171]'>{ props.user}</span>
      <h3 className='mb-2 text-lg font-semibold text-[#222222] font-robot'>the price is : {props.price}</h3>
    </div>
  </div>  )
}

export default ShopCard