import React, { useEffect } from 'react'
import testImage from '../../../public/images/overview1.png'
import Payment from '../../components/Payment'
import { useSendGetPostByIdQuery } from '../../services/general_api'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar'
import { useSelector } from 'react-redux'
import { jwtDecode } from 'jwt-decode'
import { useSendCreateConversationMutation } from '../../services/general_api'

const ShopId = () => {

    const {access} = useSelector(state => state.auth)
    const decoded_access = jwtDecode(access)

    const EMAIL = decoded_access.email
    const first_user = decoded_access.user_id

    const location = useLocation()
    const navigate = useNavigate()
    
    const pathname = location.pathname; // getting the pathname here
    
    const match = pathname.match(/\/shop\/(\d+)/); //  here a regex to get the number (id) from pathname
    
    const number = match ? parseInt(match[1], 10) : null; // here we get the match
    
    const API_URL = "http://localhost:8000"
    
    const {data:post, isLoading} =  useSendGetPostByIdQuery(number) // fetching data
    const [sendCreateConversation, data] = useSendCreateConversationMutation()

    if (isLoading) {
        return <div>loading lol </div>
    }


    const HandleContactSeller  = async (first_user, second_user) => {

        const input = { 
            "first_user":first_user,
            "second_user" : second_user
        }
        let response = await sendCreateConversation(input).unwrap()
        if (response.status === 200) {
            navigate('/contact-us')
        }
    }


  return (
    <div className='flex flex-col lg:flex-row w-screen h-full rounded-t-2xl border-[#f2f2f2]  '> 

    <Navbar />    
        <div className='lg:w-2/4 w-full h-full ml-2 mt-16 border-2 border-[#f2f2f2] border-solid  rounded-2xl'>

            <div className='flex flex-col'>

                <h1 className="w-full mt-4 text-4xl font-bold text-center text-black break-all h-36">
                    {post?.title}
                 </h1>

                <div className='grid w-full place-content-center'>
                 <img src={`${API_URL}${post?.image}`} width={550} height={430} className='rounded-xl  w-[550px] h-[430px]' />
                </div>
                
                <div className='flex flex-row items-center justify-between w-full h-24 mt-6 '>

                    <p  className=" h-[43px] ml-4 text-center text-black text-2xl font-semibold">
                        {post?.author}
                    </p>

                    <button onClick={()=>HandleContactSeller(first_user, post?.user)} className='text-xl font-medium transition-opacity border-2 border-gray-100 border-solid shadow-lg  rounded-2xl w-60 h-14 hover:opacity-70 active:opacity-50'>Contact the seller </button>

                    <div className='mr-4'>
                        <img width={48} height={48} src={testImage} className='w-12 h-12 rounded-full ' />
                    </div>

                </div>

                <p className=" mt-14  w-full h-[117px] text-center text-black text-[28px] font-normal">
                    {post?.description}
                </p>



            </div>
        </div>
        <div className='grid w-full h-full pt-16 mb-10 lg:relative lg:w-2/4 place-content-center'>

                <div className='flex top-[110px] right-[180px] lg:fixed w-[400px] rounded-2xl shadow-2xl h-[550px]  flex-col justify-between '>

                <h1 className=" p-4 w-full h-[43px] text-center text-black text-2xl font-bold">
                price  : ${post?.price}     
                </h1>

                <p className=" px-4 w-full h-[117px] text-center text-black text-[28px] font-normal">
                when buying a product you get access to the source code where you can copy it and use it in ur projects .                    
                </p>

                <div className='grid p-4 place-content-center'>
                    <Payment product_id={post?.id} EMAIL={EMAIL} price={post?.price} />
                </div>


                </div>

        </div>

</div>
  )
}

export default ShopId