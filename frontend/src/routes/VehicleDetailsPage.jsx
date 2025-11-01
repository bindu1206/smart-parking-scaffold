
import React, {useState} from 'react'

export default function VehicleDetailsPage(){
  const [vehicle, setVehicle] = useState('')
  const [data, setData] = useState(null)
  async function fetchDetails(){
    if(!vehicle) return alert('enter vehicle no')
    const res = await fetch('/api/user/'+encodeURIComponent(vehicle))
    const json = await res.json().catch(()=>({error:'server error'}))
    setData(json)
  }
  return (
    <div style={{padding:20,maxWidth:420,margin:'0 auto'}}>
      <h3>My Vehicle</h3>
      <input value={vehicle} onChange={e=>setVehicle(e.target.value)} placeholder='Enter Vehicle Registration No.' style={{width:'100%',padding:10}}/>
      <button onClick={fetchDetails} style={{marginTop:10,width:'100%',padding:12}}>Fetch</button>
      {data && <div style={{marginTop:12,padding:12,border:'1px solid #ddd'}}>
        <div>Vehicle: {data.vehicleNumber}</div>
        <div>Slot: {data.slotId}</div>
        <div>Status: {data.status}</div>
      </div>}
    </div>
  )
}
