import React from 'react'
import { FaQuestionCircle } from "react-icons/fa";
export default function Nav() {
  return (
    <div className='w-full min-h-[3rem] border-b-[2px] flex items-center px-5 border-b-[#0be3ff8b] justify-between backdrop-blur-sm bg-slate-500/50'>

            <FaQuestionCircle className='text-xl'/>
     

            <div className='flex items-center gap-4'>
                <span className='font-Quicksand text-md bg-[#020237] border-[1px] border-[#15036f] hover:border-[#51ffa5] px-4 p-1 rounded-lg text-[#fff] hover:text-[#51ffa5] duration-300 transition-all cursor-pointer' >Projects</span>
            </div>
        </div>
  )
}
