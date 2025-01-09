import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import { useState, useEffect } from 'react'
import StatusCard from '../components/StatusCard';
import { Box, IconButton, Tooltip, Typography, Drawer, Container} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid2';

function IconButtonWithTooltip({children, title, onClick}) {
  return <Tooltip title={title}>
    <IconButton onClick={onClick}>
      {children}
    </IconButton>
  </Tooltip>
}

function IconSplit() {
  return <Typography sx={{m:1}}>○</Typography>
}

function SidebarItem({text}) {
  return <ListItem key={text} disablePadding>
    <ListItemButton>
      <ListItemText sx={{paddingLeft:3}} primary={text} />
    </ListItemButton>
  </ListItem>

}

function Sidebar() {
  const [count, setCount] = useState(0)
  const [status, setStatus] = useState("Loading status...")
  const [statusStartTime, setStatusStartTime] = useState(Date.now())
  const [joke, setJoke] = useState("")

  useEffect(() => {
    fetch("http://api.ivylh03.net:8000/get_status")
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
    // <Box sx={{flexDirection:"column", display:"flex", justifyItems:"center", alignItems:"center"}}>
    <Container sx={{display:"flex"}}>
      <Drawer
        sx={{
          width: 400,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 400,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <StatusCard firstName={"Ivy"} legalFirst={"Hanzhang"} lastName={"Zhu"} nickName={"IvyLH03"} statusName={status} statusStartTime={statusStartTime}/>
        <Divider />
        <List>
          {['Home', 'Blogs'].map((text, index) => (
            <SidebarItem text={text}/>
          ))}
        </List>
      <Container sx={{display:"flex", flexDirection:"row", m:3, justifyContent:"center", alignItems:"center"}}>  
        <IconButtonWithTooltip title={"GitHub"} onClick={()=>{window.open("https://github.com/IvyLH03")}}>
          <GitHubIcon sx={{fontSize:40}} />
        </IconButtonWithTooltip>
        <IconSplit/>
        <IconButtonWithTooltip title={"email"} onClick={()=>{window.open("mailto:ivy.hanzhang.zhu@gmail.com")}}>
          <EmailIcon sx={{fontSize:40}}/>
        </IconButtonWithTooltip>
      </Container>
      </Drawer> 
    </Container>

  )
}

export const Route = createRootRoute({
  component: () => (
    <Grid container>
      <Grid size={"auto"}>
        <Sidebar/>
      </Grid>
      <Grid size={"grow"}>
        <Container >
          {/* <Outlet /> */}
        </Container>
      </Grid>
    </Grid>
  ),
})