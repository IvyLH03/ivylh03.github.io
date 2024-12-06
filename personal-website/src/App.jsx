import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import * as React from 'react';
import Button from '@mui/material/Button';
import StatusCard from './components/StatusCard';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import { useEffect } from 'react';

function ButtonUsage() {
  return <Button variant="contained">Hello world</Button>;
}

function IconButtonWithTooltip({children, title}) {
  return <Tooltip title={title}>
    <IconButton>
      {children}
    </IconButton>
  </Tooltip>
}

function IconSplit() {
  return <Typography sx={{m:1}}>○</Typography>

}

function App() {
  const [count, setCount] = useState(0)
  const [status, setStatus] = useState("Loading status...")
  const [statusStartTime, setStatusStartTime] = useState(Date.now())
  const [joke, setJoke] = useState("")

  useEffect(() => {
    fetch("http://18.224.139.120:8000/get_status")
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setStatus(data.currentStatus.status)
      setStatusStartTime(data.currentStatus.starttime)
      console.log(statusStartTime)
    })

    fetch("https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit")
    .then(res => res.json())
    .then(data=>{
      if(data.type == "single") {
        setJoke(data.joke)
      }
      else {
        setJoke(`${data.setup}\n ${data.delivery}`)
      }
    })
  },[])


  return (
    <Box sx={{flexDirection:"column", display:"flex", justifyItems:"center", alignItems:"center"}}>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      {/* <Typography sx={{p:1}}>Welcome to my Website</Typography> */}
      <StatusCard firstName={"Ivy"} legalFirst={"Hanzhang"} lastName={"Zhu"} nickName={"IvyLH03"} statusName={status} statusStartTime={statusStartTime}/>
      {/* <Typography>{joke}</Typography> */}
      <Box sx={{display:"flex", flexDirection:"row", m:3, justifyContent:"center", alignItems:"center"}}>
        
        <IconButtonWithTooltip title={"GitHub"}>
          <GitHubIcon sx={{fontSize:40}} onClick={()=>{window.open("https://github.com/IvyLH03")}}/>
        </IconButtonWithTooltip>
        <IconSplit/>
        <IconButtonWithTooltip title={"email"}>
          <EmailIcon sx={{fontSize:40}} onClick={()=>{window.open("mailto:ivy.hanzhang.zhu@gmail.com")}}/>
        </IconButtonWithTooltip>

      </Box>
    </Box>

  )
}

export default App
