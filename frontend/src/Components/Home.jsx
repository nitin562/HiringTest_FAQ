import React from 'react'
import Nav from './Nav'
import { Route, Routes } from 'react-router-dom'

import NewFaq from './NewFaq'
import FaqList from './FaqList'

export default function Home() {
  return (
    <div className='w-screen h-screen flex flex-col bg-[#0b1039] overflow-hidden'>
        <Nav/>
        <Routes>
            <Route path="/" element={<FaqList/>}/>
            <Route path="/new" element={<NewFaq/>}/>
        </Routes>
    </div>
  )
}
