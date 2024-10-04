import React from 'react'

const ComponentsType = (props) => {
  return (
    <div className='w-[83px] bg-yellow flex items-center mt-4  flex-col h-[48]'>
            <img src={props.src} className='w-6 h-6 ' />
        <span className='text-base font-medium font-roboto'>REACT</span>

    </div>
  )
}

export default ComponentsType