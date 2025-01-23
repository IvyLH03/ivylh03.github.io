import { createFileRoute, Link, createLink, useNavigate } from '@tanstack/react-router'
import Markdown from 'react-markdown'
import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2';


export const Route = createFileRoute('/')({
  component: RouteComponent,
})

const text = "# Hello!👋\n\nMy name is Ivy Zhu (Hanzhang Zhu). I am currently a junior in UW-Madison, majoring in Computer Science. \n\nI enjoy working on all kinds of projects and helping people build software solutions to solve real-world problems. If you're facing a challenge and need a hand, I'd love to help. And if you're working on a cool project, feel free to invite me - I'm always excited to collaborate and learn something new!"

const helping = "### 👥 I can help you with...\n\n- Building websites - like this one \n\n- Building online automation tools\n\t - Post backup & text process\n\t[Example](https://ivylh03.net/bacupia/) \n\t - Automods & chatbots [Example](https://github.com/IvyLH03/Nephthys)"
const projects = "### 💻 I am working on...\n\n- Voice interaction alarm app \n\t- Learning Kotlin\n\t- [See demo from MadHacks](https://devpost.com/software/remind-me-that)\n\n- Minesweeper AI\n\t- Learning reinforcement learning"
const seeking = "### 🏃 I am looking for...\n\n- Any interesting opportunities! \n\t- Internship, research, projects, random ideas...\n- Meeting new friends in Madison"

function GridPaper({children}) {
  return <Paper sx={{
    pt:2,
    pb:2,
    pl:4,
    pr:4,
    m:2
  }}>
    {children}
  </Paper>
}

import * as React from 'react'


const BasicLinkComponent = React.forwardRef(
  (props, ref) => {
    return (
      <a ref={ref} {...props} className={'block px-3 py-2 text-blue-700'} />
    )
  },
)

const CreatedLinkComponent = createLink(BasicLinkComponent)

export const CustomLink = (props) => {
  return <CreatedLinkComponent preload={'intent'} {...props} />
}

function RouteComponent() {
  const navigate = useNavigate({})

  return <Container sx={{pt:8}}>
      <Markdown>{text}</Markdown>
      <br/>
      <Grid container>
        <Grid size={{xs:12}}>
          <GridPaper>
            <Markdown>{projects}</Markdown>
          </GridPaper> 
        </Grid>
        <Grid size={{xs:12, lg:6}}>
          <GridPaper>
            <Markdown>{helping}</Markdown>
          </GridPaper>
        </Grid>
        <Grid size={{xs:12, lg:6}}>
          <GridPaper>
            <Markdown>{seeking}</Markdown>
            <Stack sx={{width:"100%", flexDirection:"row", justifyContent:"flex-end"}}>
              <Button variant='outlined' onClick={()=>{navigate({to:'contact'})}}>Contact me</Button>
            </Stack>
          </GridPaper>
        </Grid>
      </Grid>
      <br/>
  </Container>
}

