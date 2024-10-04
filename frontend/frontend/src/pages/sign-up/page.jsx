import React from 'react'
import Navbar from '../../components/navbar'
import { useSendSignUpRequestMutation } from '../../services/auth_api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



function SignUp() {


    const EmailPasswordComponent = () => {

        const navigate = useNavigate()
        const [EmailPasswordinputs, setEmailPasswordInputs] = useState({})

        const [sendSignUpRequest, isLoading] = useSendSignUpRequestMutation()

        const handleChange = (event) => {
            const {name, value} = event.target;
            setEmailPasswordInputs((prevEmailPasswordInputs)=> ({
                ...prevEmailPasswordInputs,
                [name]:value
            }))
            console.log(EmailPasswordinputs)
             }

        const handleClick = async ()  => { 
            let response = await sendSignUpRequest(EmailPasswordinputs).unwrap()
            if (response.status === 201 ){ 
                navigate("/login")
            }

            else if (response.status !== 201) { 
                console.log(response.response)
            }
        }
        return (
        <div className='flex flex-col items-center justify-center w-full h-full bg-slate-100 '>
             <div className="lg:w-5/12 h-[700px] bg-white w-11/12 rounded-2xl shadow-2xl flex flex-col items-center">
                  <h1 className="w-full pt-6 my-5 text-3xl font-extrabold text-center text-black lg:text-5xl">Sign Up </h1>
                  <h2 className="w-full lg:text-3xl text-xl mb-10 text-center text-black text-[25px] pt-6 font-normal">Hey, Enter your detail to sign Up </h2>
                    <input value={EmailPasswordinputs.email} onChange={handleChange} name='email' className="w-5/6 h-[78px] pt-6 pb-6 bg-white rounded-xl placeholder:text-start placeholder:p-4 placeholder:font-Roboto placeholder:text-black  border-solid border-[1px] border-[#999999] placeholder:text-[20px] placeholder:font-bold focus:text-start focus:p-4 focus:font-Roboto focus:text-black focus:text-[20px] focus:font-bold" placeholder='email' type='text'></input>
                    <input value={EmailPasswordinputs.username} onChange={handleChange} name='username' className="w-5/6 h-[78px] pt-6 pb-6 bg-white rounded-xl placeholder:text-start placeholder:p-4 placeholder:font-Roboto placeholder:text-black  border-solid border-[1px] border-[#999999] placeholder:text-[20px] placeholder:font-bold focus:text-start focus:p-4 focus:font-Roboto focus:text-black focus:text-[20px] focus:font-bold" placeholder='username' type='text'></input>
                    <input value={EmailPasswordinputs.password}  onChange={handleChange} name='password' className="w-5/6 h-[78px] pt-6 pb-6 bg-white rounded-xl placeholder:text-start mt-5 placeholder:p-4 placeholder:font-Roboto placeholder:text-black  border-solid border-[1px] border-[#999999] placeholder:text-[20px] placeholder:font-bold focus:text-start focus:p-4 focus:font-Roboto focus:text-black focus:text-[20px] focus:font-bold" placeholder='password' type='password'></input>
                    <input value={EmailPasswordinputs.confirme_password}  onChange={handleChange} name='confirme_password' className="w-5/6 h-[78px] pt-6 pb-6 bg-white rounded-xl mt-5 placeholder:text-start placeholder:p-4 placeholder:font-Roboto placeholder:text-black  border-solid border-[1px] border-[#999999] placeholder:text-[20px] placeholder:font-bold focus:text-start focus:p-4 focus:font-Roboto focus:text-black focus:text-[20px] focus:font-bold" placeholder='confirme_password' type='password'></input>
                    {EmailPasswordinputs.password===EmailPasswordinputs.confirme_password ? null : <span className='text-red-400'> password not matching  </span>}
                  <button onClick={()=>handleClick()} className="w-9/12 h-20 mt-10 hover:opacity-80 active:opacity-70 bg-black hover:bg-custom-black-dark active rounded-xl text-white text-[20px] font-bold">SignUp</button>
      
              </div>
      
        </div> 
        )
    }   
     
    
    return(
        <div>
        <Navbar />
        <div className= "w-full h-full min-h-screen py-24 bg-slate-100 ">
            <EmailPasswordComponent /> 
        </div>
        </div>
        )  
}

export default SignUp