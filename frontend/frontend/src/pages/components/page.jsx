import React, { useState, useEffect } from 'react'
import Accordion from '../../components/Accordion'
import Navbar from '../../components/navbar'
import { useNavigate } from 'react-router-dom'
import { LiveProvider, LiveError, LivePreview } from 'react-live';
import {motion} from 'framer-motion'
import SyntaxHighlighter from 'react-syntax-highlighter';

const Components = () => {


    let codes = [
        {
            component: `
            () => 
                  <div>
                    Click Me
                  </div>
              
          `,
          snippet: `
          () => 
            <div>
              Click Me
            </div>
        
          `,
        },
        {
            component: `
          () => {
            const [click, setClicked] = React.useState(0);
            return (
              <motion.div className='w-[686px] origin-top h-[100% + 100px]'>
                <div className='relative w-full h-6 overflow-hidden bg-black rounded-t-2xl'></div>
                <SyntaxHighlighter language="jsx">
                  {'bla bla bla'}
                </SyntaxHighlighter>
              </motion.div>
            );
          }
          `,
          snippet: `
          const [click, setClicked] = React.useState(0);
          return (
            <motion.div className='w-[686px] origin-top h-[100% + 100px]'>
              <div className='relative w-full h-6 overflow-hidden bg-black rounded-t-2xl'></div>
              <SyntaxHighlighter language="jsx">
                {'bla bla bla'}
              </SyntaxHighlighter>
            </motion.div>
          )
          `,
        }
      ];
      
    

    


    let navigate = useNavigate()

    const [itemClicked, setItemClicked] = useState([])
    
    
    
    const components = [
        {title:"buttons", href:"/components/buttons"},
        {title:"layouts", href:"/components/layouts"},
        {title:"inputs",href:"/components/inputs"},
        {title:"searsh-bar", href:"/components/searsh-bar"},
    ]
    
    useEffect(() => {
        setItemClicked(components.map(() => false));
        
    }, []); 

    
  return (
    <div className='flex flex-row '>
        <Navbar />
        <div className='w-3/4 mt-24 pl-[25vw] h-full'>
            {codes.map((index, code) => {

            return (
                <div key={index} className=''>
                    <Accordion index={index} component={code.component} snippet={code.snippet} />
                </div>
            )
            })}

        </div>
        <div className='fixed w-1/4 h-full mt-16 bg-slate-100 hover:overflow-auto '>
        <main className='flex flex-col items-center align-middle'>

            <h3  className='font-bold text-[25px] '>general </h3>

            {components.map((component, index)=> {
                return(
                <ol
               onClick={()=>setItemClicked((prev)=> {
                const newClicked = components.map(() => false);
                newClicked[index] = true;
                return newClicked;
               })}
               
                className={itemClicked[index] === true ? 'mt-2 cursor-pointer text-red-400' : 'mt-2 cursor-pointer hover:opacity-70' }  key={index}>
                    {component.title}
                </ol>
            )})}

        </main>
        </div>
    </div>
  )
}

export default Components