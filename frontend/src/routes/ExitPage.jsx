
import React, {useState} from 'react'

export default function ExitPage(){
  const [vehicle,setVehicle] = useState('')
  const [result,setResult]=useState(null)
  async function exit(){
    if(!vehicle) return alert('enter vehicle no')
    const res = await fetch('/api/user/exit', {method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify({vehicleNumber:vehicle})})
    const json = await res.json().catch(()=>({error:'server error'}))
    setResult(json)
  }
  return (
    <div style={{padding:20,maxWidth:420,margin:'0 auto'}}>
      <h3>Exit Parking</h3>
      <input value={vehicle} onChange={e=>setVehicle(e.target.value)} placeholder='Enter Vehicle Registration No.' style={{width:'100%',padding:10}}/>
      <button onClick={exit} style={{marginTop:10,width:'100%',padding:12}}>Pay & Exit</button>
      {result && <div style={{marginTop:12,padding:12,border:'1px solid #ddd'}}>
        <div>Duration: {result.totalTime}</div>
        <div>Amount: {result.amount}</div>
      </div>}
    </div>
  )
}
