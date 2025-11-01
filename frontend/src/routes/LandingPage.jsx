
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function LandingPage(){
  const nav = useNavigate()
  return (
    <div className='app' style={{padding:20}}>
      <h2>Welcome to Smart Parking</h2>
      <button onClick={()=>nav('/allot')} style={{display:'block',width:'100%',padding:12,marginTop:12}}>🅿️ Allot Slot</button>
      <button onClick={()=>nav('/myvehicle')} style={{display:'block',width:'100%',padding:12,marginTop:8}}>🚗 Show My Vehicle</button>
      <button onClick={()=>nav('/exit')} style={{display:'block',width:'100%',padding:12,marginTop:8}}>🚪 Exit Parking</button>
    </div>
  )
}
