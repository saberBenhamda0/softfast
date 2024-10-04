import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion'
import directionIcon from '../../public/icons/circle_chev_down.svg'
import copyIcon from '../../public/icons/import.svg'
import { LivePreview, LiveError, LiveProvider } from 'react-live';

const Accordion   = (props) => {

    

  const menuVars = { 
    initial:{
        scaleY:0,
    },
    animate:{
        scaleY:1,
        transition:{
            duration:0.5,
            ease:[0.12, 0, 0.39, 0]
        }
    },
    exit:{
        scaleY:0,
        transition:{
            delay:0.3,
            duration:0.5,
            ease:[0.22, 1, 0.36, 1]
        }
    }
}

  const [clicked , setClicked] = useState(false)
  const [copied , setCopied] = useState(false)

  const HandleClick = () => { 
    setClicked(!clicked)
    {clicked ? null : setCopied(false)}
  }

  const HandleCopy = () => {
    navigator.clipboard.writeText(props.snippet)
    setCopied(true)
    setTimeout(()=>{
      setCopied(false)
    }, 10000)

  }
  const scope = {Accordion} 

  return (

    <div
              key={props.key}
              variants={menuVars}
              initial="initial"
              animate="animate"
              exit="exit"
    className='flex flex-col items-center w-full h-full pt-6 mb-6 ml-6 align-middle border-2 border-solid rounded-2xl border-slate-100 '>
      <div className='flex flex-col w-full h-full transition-all duration-300 ease-linear rounded-xl hover:opacity-70 '>
            <LiveProvider code={props.component} scope={{motion, SyntaxHighlighter}} >
                <LiveError />   {/* Show errors if any */}
                <LivePreview /> {/* Render the code */}
            </LiveProvider>
      <div className='flex flex-col items-end justify-end w-full h-10 mb-2 '>
        
          <img onClick={HandleClick} src={directionIcon} className={clicked ? "w-6 mr-10 mb-4 h-6 cursor-pointer transition duration-150 ease-out rotate-180" : 'w-6 mb-4 cursor-pointer mr-10 h-6 transition duration-150 ease-out '}  />
        </div>
      </div>
      <AnimatePresence>

{    clicked &&
          <motion.div 
          variants={menuVars}
           initial="initial"
           animate="animate"
           exit="exit"
          className='w-[686px] origin-top  h-[100% + 100px] '>
            
            <div
            className='relative w-full h-6 overflow-hidden bg-black rounded-t-2xl'>
                <img onClick={HandleCopy} src={copyIcon}  className={copied ? "w-6  absolute right-14 h-6 " : 'w-6 h-6  absolute right-12 '}/>
                <p className='absolute text-white right-2 '>{copied ? "copied" : "copy"}</p>
            </div>
                <SyntaxHighlighter language="jsx" style={atomOneDark}>
              {props.snippet}
                </SyntaxHighlighter>
        
        </motion.div> }
        </AnimatePresence>

    </div>
  );
};

export default Accordion