import { Container, Paper, Typography, Box, Avatar } from "@mui/material";
import image from '../assets/image.jpg'
import { useEffect, useState } from "react";


function StatusLastTimeText({ text }) {
  return <>
    <Typography sx={{ fontWeight: "500", color: "green" }}>{text}</Typography>
  </>
}

export default function StatusCard({ firstName, legalFirst, lastName, statusName, statusStartTime }) {
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

  return <>
    <Paper elevation={2} sx={{ p: 2, m: 2, width: "80%" }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
        <Box sx={{ p: 2, width: "40%" }}>
          <Avatar sx={{ width: "100%", height: "100%" }} alt="Ivy Zhu" src={image} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'baseline', p: 1, width: "60%" }}>
          <Typography variant="h6">{firstName} {lastName}</Typography>
          <Box sx={{m:1}}>
            <Typography sx={{ textAlign: "left" }}>Thinking about: </Typography>
            <Typography sx={{ textAlign: "left", fontWeight: 200}} fontStyle={"italic"}>{`"${statusName}"`}</Typography>
          </Box>
          <StatusLastTimeText text={statusLastTimeFormatted} />
        </Box>
      </Box>
    </Paper>
  </>
}