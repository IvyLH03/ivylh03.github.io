import { Container, Paper, Typography, Box} from "@mui/material";
import avatar from '../assets/avatar.png'
import { useEffect, useState } from "react";


function StatusLastTimeText({text}) {
  return <>
    <Typography sx={{}}>{text}</Typography>
  </>
}

export default function StatusCard({firstName, legalFirst, lastName, statusName, statusStartTime}) {
  const [currentTime, setCurrentTime] = useState(Date.now())
  const statusLastTime = (currentTime - statusStartTime) / 1000
  const statusLastTimeFormatted = `${Math.floor(statusLastTime/3600)}:${Math.floor(statusLastTime/60%60)}:${Math.floor(statusLastTime%60)}`


  useEffect(()=>{
    setInterval(() => {
      setCurrentTime(Date.now())
    }, 1000);
  },[])

  return <>
      <Paper elevation={2} sx={{p:2, width:400}}>
        <Box sx={{display: 'flex', flexDirection:'row', alignItems:"center"}}>
          <Box sx={{p:2, width:"40%"}}>
            <img style={{height:"100%", width:"100%"}} src={avatar}/>
          </Box>
          <Box sx={{display: 'flex', flexDirection:'column', alignItems:'baseline', p:1}}>
            <Typography variant="h6">{firstName} {lastName}</Typography>
            <Typography>{statusName}...</Typography>
            <StatusLastTimeText text={statusLastTimeFormatted} />
          </Box>
        </Box>
      </Paper>
  </>
}