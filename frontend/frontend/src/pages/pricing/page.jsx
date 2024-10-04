import React from 'react'
import Navbar from '../../components/navbar'
import logo from '/icons/logo.svg'
import Subsciptionsbutton from '../../components/Subsciptionsbutton'
import { useSelector } from 'react-redux'
import { jwtDecode } from 'jwt-decode'

const Pricing = () => {

    const {access} = useSelector((state) => state.auth)
  
    const decoded_jwt = jwtDecode(access)

    const USERNAME = decoded_jwt.username
    const EMAIL = decoded_jwt.email

    function getCurrentTimePlusOneHourFormatted() {
        const currentTime = new Date();
    
        // Add one hour (in milliseconds)
        const oneHourLater = new Date(currentTime.getTime() + 60 * 60 * 1000);
        
        // Format the date in the required format
        const formattedTime = oneHourLater.toISOString(); // ISO format: YYYY-MM-DDTHH:mm:ss.sssZ
        
        // Get milliseconds and ensure only three digits
        const milliseconds = oneHourLater.getMilliseconds().toString().padStart(3, '0'); // Ensure three digits
    
        // Construct the final formatted string with correct milliseconds
        return formattedTime.replace(/\.\d{3}Z$/, `.${milliseconds}Z`);  // Replace milliseconds
    }


    

  return (
    <div className='flex flex-col items-center justify-center w-full min-h-screen lg:flex-row '>
        <Navbar />
        <div className='w-1/4 shadow-lg flex flex-col justify-start items-start my-3 border-2 mr-4 bg-[#F8F9FA] border-[#3498DB] border-t-8  border-solid h-full min-h-[30rem]'>
            <div className='flex flex-col items-center justify-start w-full h-full min-h-1/3 '>
                <img src={logo} className='w-20 h-20 ' />
                <h1 className='text-2xl my-2 font-bold text-[#343A40] '>Hobbies plan</h1>
                <p className='text-sm w-11/12 text-[#343A40] '>Unlock the essentials to kickstart your projects! The Hobbies Plan offers access to a selection of premium code components, perfect for freelancers, hobbyists, and developers who work on personal projects. With easy integration and detailed documentation, you’ll have everything you need to build faster and smarter. Start small, grow big, and enjoy full community support along the way.</p>
            </div>
            <div className='flex flex-col items-center justify-center w-full my-10 h-1/3 '>
                <h2 className='text-3xl font-bold text-black '>$5/month</h2>
                <span className='text-[#6C757D] mt-2 mb-6 '>or 50$ per year</span>
                <Subsciptionsbutton type="Hobbies plan" price="5.00" current_time={getCurrentTimePlusOneHourFormatted()} USERNAME={USERNAME} EMAIL={EMAIL} />


            </div>

        </div>

        <div className='w-1/4 shadow-lg flex flex-col justify-start my-3 items-start border-2 mr-4 bg-[#F8F9FA] border-[#FF5733] border-t-8  border-solid h-full min-h-[30rem]'>
            <div className='flex flex-col items-center justify-start w-full h-full min-h-1/3 '>
                <img src={logo} className='w-20 h-20 ' />
                <h1 className='text-2xl my-2 font-bold text-[#343A40] '>Proffesional plan</h1>
                <p className='text-sm w-11/12 text-[#343A40] '>Take your development to the next level with the Professional Plan. Get full access to an extensive library of advanced code components, tailored for developers, startups, and growing teams working on commercial projects. Enjoy priority support, regular updates, and exclusive tools designed to optimize your workflow and boost productivity. Perfect for those who need scalable solutions and performance-driven components to meet the demands of professional-grade projects.</p>
            </div>
            <div className='flex flex-col items-center justify-center w-full my-10 h-1/3 '>
                <h2 className='text-3xl font-bold text-black '>$20/month</h2>
                <span className='text-[#6C757D] mt-2 mb-6 '>or 199$ per year</span>
                <Subsciptionsbutton type="Proffesional plan" price="20.00" current_time={getCurrentTimePlusOneHourFormatted()} USERNAME={USERNAME} EMAIL={EMAIL} />

            </div>

        </div>

    </div>
  )
}

export default Pricing