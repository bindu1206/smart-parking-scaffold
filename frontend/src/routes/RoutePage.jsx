
import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function RoutePage(){
  const { slotId } = useParams()
  const nav = useNavigate()
  return (
    <div style={{padding:20,maxWidth:420,margin:'0 auto'}}>
      <h3>Route to Slot {slotId}</h3>
      <div style={{height:240,border:'1px solid #ccc',display:'flex',alignItems:'center',justifyContent:'center'}}>Map placeholder</div>
      <button onClick={()=>nav('/')} style={{marginTop:12,width:'100%',padding:12}}>Back to Home</button>
    </div>
  )
}
