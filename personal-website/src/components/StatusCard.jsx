import { Container, Paper, Typography, Box, Avatar, Button } from "@mui/material";
import image from '../assets/image.jpg'
import { useEffect, useState } from "react";


function StatusLastTimeText({ text }) {
  return <>
    <Typography sx={{ fontWeight: "500", color: "green" }}>{text}</Typography>
  </>
}

export default function StatusCard() {

    const [status, setStatus] = useState("Loading status...")
    const [statusStartTime, setStatusStartTime] = useState(Date.now())
  
    useEffect(() => {
      fetch("https://status.ivylh03.net/status")
      // fetch("http://127.0.0.1:5000/status")
        .then(res => res.json())
        .then(data => {
          setStatus(data.currentStatus.status)
          setStatusStartTime(data.currentStatus.starttime)
        })
    }, [])

  const [currentTime, setCurrentTime] = useState(Date.now())
  const statusLastTime = (currentTime - statusStartTime) / 1000
  const hours = Math.floor(statusLastTime / 3600)
  const minutes = Math.floor(statusLastTime / 60 % 60)
  const seconds = Math.floor(statusLastTime % 60)
  const statusLastTimeFormatted = `• Last updated: ${String(hours).padStart(2, 0)}:${String(minutes).padStart(2, 0)}:${String(seconds).padStart(2, 0)} ago`

  

  useEffect(() => {
    setInterval(() => {
      setCurrentTime(Date.now())
    }, 1000);
  }, [])

  const updateStatus = () => {
    const newStatus = prompt("Enter new status:")
    if (newStatus) {
      fetch("https://status.ivylh03.net/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          status: newStatus,
          // Use password from local storage
          upload_password: localStorage.getItem("upload_password")
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setStatus(data.currentStatus.status)
          setStatusStartTime(data.currentStatus.starttime)
        })
    }
  }

  return <>
    <Paper elevation={2} sx={{ p: 2, m: 2, width: "80%" }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
        <Box sx={{ p: 2, width: "40%" }}>
          <Avatar sx={{ width: "100%", height: "100%" }} alt="Ivy Zhu" src={image} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'baseline', p: 1, width: "60%" }}>
          <Typography variant="h6">Ivy Zhu</Typography>
          <Box sx={{m:1}}>
            <Typography sx={{ textAlign: "left" }}>Thinking about: </Typography>
            <Typography sx={{ textAlign: "left", fontWeight: 200}} fontStyle={"italic"}>{`"${status}"`}</Typography>
          </Box>
          <StatusLastTimeText text={statusLastTimeFormatted} />
        </Box>
        { localStorage.getItem("upload_password") ? <Button onClick={updateStatus} sx={{ position: "absolute", top: 0, right: 0, m: 1 }} size="small" variant="outlined">Update Status</Button>: <></> } 
      </Box>
    </Paper>
  </>
}