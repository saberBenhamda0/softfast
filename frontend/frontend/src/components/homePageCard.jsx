import React from 'react'

const HomePageCard = (props) => {
  return (
    <div className='flex flex-col border-2 border-[#999999] transition-shadow hover:shadow-lg border-solid lg:h-1/4 rounded-2xl'>
    <h1 class=" mt-6 lg:h-1/4  text-center  text-black text-2xl font-bold">{props.title}</h1>
    <p class=" mb-6 mx-4 text-center h-full text-black text-xl font-normal">{props.description}</p>
  </div>
    )
}

export default HomePageCard