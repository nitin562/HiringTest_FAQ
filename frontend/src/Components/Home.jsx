import React from 'react'
import Nav from './Nav'
import { Route, Routes } from 'react-router-dom'

import NewFaq from './NewFaq'
import FaqList from './FaqList'

export default function Home() {
  return (
    <div className='w-full h-full flex flex-col bg-[#000957] overflow-hidden'>
        <Nav/>
        <Routes>
            <Route path="/" element={<FaqList/>}/>
            <Route path="/new" element={<NewFaq/>}/>
        </Routes>
    </div>
  )
}
