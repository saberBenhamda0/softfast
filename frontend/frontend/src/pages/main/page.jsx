import overview1 from '/images/overview1.png'
import websiteoverview from '/images/websiteOverview.png'
import { motion } from 'framer-motion'
import reactLogo from '/images/reactLogo.png'
import HomePageCard from '../../components/homePageCard.jsx'
import Navbar from '../../components/navbar'
import hero_section from '/hero_section.svg'
import { useNavigate } from 'react-router-dom'
import angularLogo from '/images/angularLogo.png'
import vueLogo from '/images/vueLogo.png'

const FrameWorkCard = ({title, logo, description}) =>  {
  return (
    <div className='flex mb-4 h-full mx-2 border-solid rounded-xl border-2 border-[#999999] flex-col items-center'>
    <h1 className="text-2xl font-bold text-center text-black">{title}</h1>
    <img src={logo} className='w-16 h-16 rounded-full' />
    <p className="text-center mb-48 text-black text-[28px] font-normal">{description}</p>
  </div>
  )
}

export default function Main() {
  const navigate = useNavigate()
  return (
    <div className='w-screen h-full '>
    <Navbar />

    <div className="flex flex-col-reverse w-full h-full overflow-hidden bg-white mb-14 mt-28 lg:flex-row">
      <div className='w-full h-full px-10 mt-10 lg:mt-0 lg:w-1/2'>
        <div className='w-full '>
          <h1 className="mb-5 font-bold text-center text-black text-7xl lg:text-9xl">Copy</h1>
          <h1 className="mb-5 font-bold text-center text-black text-7xl lg:text-9xl">Past</h1>
          <h1 className="mb-5 font-bold text-center text-black text-7xl lg:text-9xl">Deploy</h1>
        </div>
        <div className='mt-10'>
          <p className="text-2xl font-normal text-center text-black lg:text-3xl">Effortless Website Development with SoftFast: Explore a Vast Component Library for Rapid Creations!</p>
        </div>
        <div className='flex flex-row items-center justify-between mt-10'>
          <button onClick={()=>navigate("/shop")} className='border-solid h-16 w-28 rounded-xl active:opacity-60 hover:opacity-70 border-2 text-black border-[#999999]'>Start Browsing</button>
          <button onClick={()=>navigate("/login")} className='h-16 text-white bg-black border-2 border-solid w-28 active:opacity-60 rounded-xl hover:opacity-70'>Share your work</button>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center w-full h-full px-10 lg:w-1/2'>
        <img src={hero_section} />
      </div>
    </div>

    <div className='flex flex-col w-full h-full mb-20 overflow-hidden lg:flex-row lg:h-screen'>
      <div className='w-full h-full px-10 mb-6 lg:mb-0 lg:w-1/2'>
        <div className="text-center text-black text-[40px] font-bold mb-10">Every component is already made for you</div>
        <div className='relative flex flex-col items-center justify-center'>
          <motion.div whileHover={{ scale: 1.1 }}>
            <img className='  z-0 h-[268px] rounded-xl shadow-xl' src={overview1} />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>
            <img className='lg:ml-20 z-10 top-0 h-[268px] rounded-xl shadow-xl' src={websiteoverview} />
          </motion.div>
        </div>
      </div>
      <div className='flex flex-col justify-between w-full h-screen px-10 lg:w-1/2'>
        <HomePageCard title="No install needed" description="Effortless Website Development with SoftFast: Explore a Vast Component Library for Rapid Creations!" />
        <HomePageCard title="Easy integration with your projects" description="Effortless Website Development with SoftFast: Explore a Vast Component Library for Rapid Creations!" />
        <HomePageCard title="High quality work" description="Effortless Website Development with SoftFast: Explore a Vast Component Library for Rapid Creations!" />
      </div>
    </div>

    <div className='flex flex-col items-center w-full h-full min-h-screen mt-6 bg-white'>
      <div className="text-center text-black text-[40px] font-bold mb-10">Work with the language you already love</div>
      <div className='flex flex-col items-center justify-between w-full px-10 lg:flex-row'>
        <FrameWorkCard title="React" logo={reactLogo} description="Declarative, component-based library for building user interfaces that efficiently updates and renders UI components through a virtual DOM. Ideal for creating dynamic, single-page applications (SPA) with reusable components." />
        <FrameWorkCard title="Angular" logo={angularLogo} description="Robust, full-featured framework for building dynamic web applications, utilizing two-way data binding and dependency injection to optimize development. It features a powerful CLI and a component-based architecture." />
        <FrameWorkCard title="Vue" logo={vueLogo} description="Progressive, incrementally-adoptable framework for building user interfaces, combining declarative rendering with a reactive data binding system. It features a flexible, component-based architecture and a simple, yet powerful API."/>
      </div>
    </div>
    </div>
  )
}
