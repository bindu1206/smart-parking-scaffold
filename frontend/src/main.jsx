import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './routes/LandingPage.jsx'
import AllotSlotPage from './routes/AllotSlotPage.jsx'
import VehicleDetailsPage from './routes/VehicleDetailsPage.jsx'
import RoutePage from './routes/RoutePage.jsx'
import ExitPage from './routes/ExitPage.jsx'
import './index.css'

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/allot' element={<AllotSlotPage/>} />
        <Route path='/myvehicle' element={<VehicleDetailsPage/>} />
        <Route path='/route/:slotId' element={<RoutePage/>} />
        <Route path='/exit' element={<ExitPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<App/>)