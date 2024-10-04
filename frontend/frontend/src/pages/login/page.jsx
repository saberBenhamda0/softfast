import {  useState } from 'react'
import Navbar from '../../components/navbar'
import { useSendLoginRequestMutation } from '../../services/auth_api'
import { useDispatch } from 'react-redux'
import { setJwtToken } from '../../features/authSlice'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import Loading from '../../components/loading'


export default function Login() {

  const [inputs, setInputs] = useState({})
  const navigate =  useNavigate()
  const dispatch = useDispatch()
  
    
  const [sendLoginRequest, {isLoading}] = useSendLoginRequestMutation()

  const handleSubmit = async () => {
    try {
      const response = await sendLoginRequest(inputs).unwrap();

      
      if (response.status === 200) {
        toast.success("you login with success")
        dispatch(setJwtToken(response.data));
        navigate("/shop");
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (err) {
      toast.error(err?.detail);
    }
  }

  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  if (isLoading){
    return <Loading />
  }
  return(


    <div className= "flex flex-col items-center justify-start w-screen h-full min-h-screen bg-slate-100 pt-28">
        <Navbar />
        <div className="flex flex-col items-center justify-center w-11/12 h-full pb-20 bg-white shadow-2xl lg:w-5/12 rounded-2xl">
            <h1 className="pt-6 text-2xl font-extrabold text-center text-black lg:text-5xl">Login in </h1>
            <h2 className="pt-6 font-normal text-center text-black lg:text-3xl lg:w-2/3">Hey, Enter your detail to sign in to your account</h2>
                <div className='flex flex-col items-center justify-center w-full m-6'>
                <input value={inputs.username || ""} onChange={handleChange} name="username" className="w-5/6 h-16 pt-6 pb-6 bg-white rounded-xl placeholder:text-start placeholder:p-4 placeholder:font-Roboto placeholder:text-black  border-solid border-[1px] border-[#999999] placeholder:text-[20px] placeholder:font-bold focus:text-start focus:p-4 focus:font-Roboto focus:text-black focus:text-[20px] focus:font-bold" placeholder='username' type='text'></input>
                </div>
                <div  className='flex flex-col items-center justify-center w-full m-6'>
                <input value={inputs.password || ""}  onChange={handleChange} name="password" className="w-5/6 h-16 pt-6 pb-6 bg-white rounded-xl placeholder:text-start placeholder:p-4 placeholder:font-Roboto placeholder:text-black border-solid border-[1px] border-[#999999] placeholder:text-[20px] placeholder:font-bold focus:text-start focus:p-4 focus:font-Roboto focus:text-black focus:text-[20px] focus:font-bold" placeholder='password' type='password'></input>
                </div>
                <h4 className="flex break-all justify-start w-5/6 h-16 text-xl font-bold text-black ml-[25%] text-start">Having trouble in sign in ?</h4>
            <button onClick={()=> handleSubmit()} className="w-5/6 h-16 bg-black hover:bg-custom-black-dark active rounded-xl text-white text-[20px] font-bold">login</button>

        </div>



  </div>
  
  )
}
