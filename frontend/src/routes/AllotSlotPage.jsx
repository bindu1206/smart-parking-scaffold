
import React, {useState} from 'react'

export default function AllotSlotPage(){
  const [vehicle, setVehicle] = useState('')
  const [result, setResult] = useState(null)

  async function allot(){
    if(!vehicle) return alert('enter vehicle no')
    const res = await fetch('/api/user/allot', {method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify({vehicleNumber:vehicle})})
    const data = await res.json().catch(()=>({error:'server error'}))
    setResult(data)
  }

  return (
    <div style={{padding:20,maxWidth:420,margin:'0 auto'}}>
      <h3>Allot Slot</h3>
      <input value={vehicle} onChange={e=>setVehicle(e.target.value)} placeholder='Enter Vehicle Registration No.' style={{width:'100%',padding:10}}/>
      <button onClick={allot} style={{marginTop:10,width:'100%',padding:12}}>Allot Slot</button>
      {result && <div style={{marginTop:12, padding:12, border:'1px solid #ddd'}}>
        <div>Slot: {result.slotId || result.slot}</div>
        <div>Start: {result.startTime}</div>
      </div>}
    </div>
  )
}
