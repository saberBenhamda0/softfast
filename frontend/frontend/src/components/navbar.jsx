import React, { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setJwtToken } from '../features/authSlice'
import {jwtDecode} from 'jwt-decode'
import { useSendRefreshTokenMutation } from '../services/general_api'

const Navbar = () => {
  const [jwt, setJwt] = useState('')
  const {access, refresh} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  let [sendRefreshToken] = useSendRefreshTokenMutation()

  console.log(access)
  const handleSendRefreshToken = async () => {
    const DECODE_JWT = jwtDecode(access)

    if (DECODE_JWT) {
      let time_now = new Date().getTime() / 1000;

      let jwt_is_valid = DECODE_JWT.exp - time_now - 250  // we check if use time still valid in the jwt
  
      if (jwt_is_valid < 0)  {
          try  {
            let response = await sendRefreshToken({refresh: `${refresh}`}).unwrap()
  
    
            if (response.status === 200) {
              dispatch(setJwtToken(response.data))
              console.log("good")
            }
    
          }
          catch (err) {
              console.log(err.data)
              dispatch(setJwtToken({
                access:"",
                refresh:""
              }))
              navigate("/login")
            }
          
      }
    }
  
  }
  
  useEffect(() =>  {

    handleSendRefreshToken()
  }, [access])

  


  const HandleLogout =  () => { 
    dispatch(setJwtToken({
      access:"",
      refresh:""
    }))

    navigate("/")
  }

  return (
    <nav  className='fixed top-0 right-0 z-50 flex flex-row-reverse justify-between w-full h-16 border-solid border-b-[1px] bg-white border-[#999999]'>
    <div  className=' w-1/4 h-full mr-0 lg:mr-10  text-[#999999]'>
{
      access
       ?
       <div className='flex flex-col items-end justify-center w-full h-full'>
         <button onClick={HandleLogout} className='border-solid h-10 w-24 rounded-xl active:opacity-60  hover:opacity-70 border-2 text-black border-[#999999]'>logout</button>
       </div>
      :
      <div className='flex flex-row items-center justify-end h-full mr-3'>
      <button
      onClick={()=>navigate("/login")}
        className='border-solid text-sm lg:text-xl h-10 w-28 rounded-xl lg:mr-6 active:opacity-60  hover:opacity-70 border-2 text-black border-[#999999]'>
          login
      </button>

      <button
       onClick={()=>navigate("/signup")}
        className='h-10 text-sm text-white bg-black border-2 border-solid lg:text-xl w-28 active:opacity-60 rounded-xl hover:opacity-70'>
        Sign Up
      </button>
      </div>
      }
    </div>
    <div className='flex flex-row-reverse w-2/4 lg:w-1/3'>
      <div className='flex flex-row justify-between  w-3/4 text-[#999999] '>
        <button  onClick={access ? ()=>navigate('/shop') : ()=>navigate("/login")} className='hover:text-[#666666]  text-sm lg:text-base font-roboto ml-2'>Shop</button>
        <button onClick={access ? ()=>navigate('/pricing') : ()=>navigate("/login")} className='hover:text-[#666666]  text-sm lg:text-base ml-2'>pricing</button>
        <button onClick={access ? ()=>navigate('/contact-us') : ()=>navigate("/login")} className='hover:text-[#666666]  text-sm lg:text-base ml-2'>contact-us</button>
      </div>
    <div className='flex flex-col items-center justify-center mr-0 w-60 lg:mr-10 '>
      <img
      onClick={()=>navigate("/")}
      src='../../public/icons/logo.svg' alt='logo' className='h-full cursor-pointer w-60' />
    </div>
    </div>

  </nav>  )
}

export default Navbar