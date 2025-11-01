const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// Simple in-memory slot list for scaffold (replace with DB)
let slots = Array.from({length:20}, (_,i)=>({id:i+1, occupied:false}))
let vehicles = {} // vehicleNumber -> {slotId, startTime}

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));


// Test route
app.get("/", (req, res) => {
  res.send("API Running ✅");
});

app.post('/api/user/allot', (req,res)=>{
  const vehicleNumber = req.body.vehicleNumber;
  console.log(vehicleNumber)
  if(!vehicleNumber) return res.status(400).json({error:'vehicleNumber required'})
  // find free slot
  const slot = slots.find(s=>!s.occupied)
  if(!slot) return res.status(400).json({error:'no slots available'})
  slot.occupied = true
  vehicles[vehicleNumber] = { slotId: slot.id, startTime: new Date().toISOString(), status:'Parked' }
  res.json({ slotId: slot.id, startTime: vehicles[vehicleNumber].startTime, routePath: [] })
})

app.get('/api/user/:vehicleNumber', (req,res)=>{
  const v = vehicles[req.params.vehicleNumber]
  if(!v) return res.status(404).json({error:'not found'})
  res.json({ vehicleNumber: req.params.vehicleNumber, slotId: v.slotId, startTime: v.startTime, status: v.status })
})

app.post('/api/user/exit', (req,res)=>{
  const { vehicleNumber } = req.body
  const v = vehicles[vehicleNumber]
  if(!v) return res.status(404).json({error:'not found'})
  const exitTime = new Date()
  const start = new Date(v.startTime)
  const diffMs = exitTime - start
  const mins = Math.ceil(diffMs / (1000*60))
  const amount = Math.max(10, Math.ceil(mins/30) * 10) // simple calc
  // free slot
  const slot = slots.find(s=>s.id === v.slotId)
  if(slot) slot.occupied = false
  delete vehicles[vehicleNumber]
  res.json({ totalTime: mins + ' mins', amount })
})

app.get('/api/user/route/:slotId', (req,res)=>{
  // scaffold path
  res.json({ path: [ {x:0,y:0}, {x:1,y:1}, {x:2,y:2} ] })
})

// Serve frontend for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 5000
app.listen(port, ()=> console.log('Server listening on', port))