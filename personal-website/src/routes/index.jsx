import { createFileRoute, Link, createLink, useNavigate } from '@tanstack/react-router'
import Markdown from 'react-markdown'
import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2';
import GitHubCalendar from 'react-github-calendar';


export const Route = createFileRoute('/')({
  component: RouteComponent,
})

const text = "# Hello!👋\n\n"
  + "My name is Hanzhang Zhu, and I usually go by Ivy. I grew up in Qingdao, China, and my family moved to Los Angeles shortly after I started studying Computer Science at University of Wisconsin - Madison. \n\n"
  + "I've developed and deployed multiple full-stack projects to solve problems for myself, my clients, and different organizations and companies I previously worked for. I'm very passionate about designing and building software systems, facing intellectual challenges, and learning new technologies continuously to create innovative solutions. I genuinely enjoy this process of fast prototyping and then iterating to a more reliable, sustainable system that's ready to deliver.\n\n "
  + "Outside of work, I enjoy biking, bouldering, archery, reading sci-fi, playing piano, and games that challenge me to think strategically. \n\n"
  + "I'm currently in my senior year studying Computer Science at UW-Madison, and I am actively looking for research, projects, and work opportunities to explore my interests and contribute to exciting ideas. \n\n"

// const helping = "### 👥 I can help you with...\n\n- Building websites - like this one \n\n- Building online automation tools\n\t - Post backup & text process\n\t[Example](https://ivylh03.net/bacupia/) \n\t - Automods & chatbots [Example](https://github.com/IvyLH03/Nephthys)"
// const projects = "### 💻 I am working on...\n\n- Voice interaction alarm app \n\t- Learning Kotlin\n\t- [See demo from MadHacks](https://devpost.com/software/remind-me-that)\n\n- Minesweeper AI\n\t- Learning reinforcement learning"
// const seeking = "### 🏃 I am looking for...\n\n- Any interesting opportunities! \n\t- Internship, research, projects, random ideas...\n- Meeting new friends in Madison"

function GridPaper({ children }) {
  return <Paper sx={{
    pt: 2,
    pb: 2,
    pl: 4,
    pr: 4,
    m: 2
  }}>
    {children}
  </Paper>
}

import * as React from 'react'
import BlogPreviewCard from '../components/BlogPreviewCard';
import NoteCard from '../components/NoteCard';
import { getAllNotes } from '../scripts/noteApi';


const BasicLinkComponent = React.forwardRef(
  (props, ref) => {
    return (
      <a ref={ref} {...props} className={'block px-3 py-2 text-blue-700'} />
    )
  }
)

const CreatedLinkComponent = createLink(BasicLinkComponent)

export const CustomLink = (props) => {
  return <CreatedLinkComponent preload={'intent'} {...props} />
}

const getRecentBlogAndNote = async () => {
  const notes = await getAllNotes().then(res => res.slice(0, 2))
  const blogMetadata = await fetch("https://blog.ivylh03.net/blogs").then(res => res.json()).then(res => res[0])
  const blogContent = await fetch(`https://blog.ivylh03.net/blog/${blogMetadata.id}`).then(res => res.json()).then(res => res.content)
  return { notes, blog: { ...blogMetadata, content: blogContent } }
}

function RouteComponent() {
  const [data, setData] = React.useState({ notes: null, blog: null })
  React.useEffect(() => {
    getRecentBlogAndNote().then(setData)
  }, [])

  return <Container sx={{ pt: 8 }}>
    <Markdown>{text}</Markdown>
    <br />
    <Grid container spacing={2}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 12, md: 6 , lg: 6}}>
          <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>Recent Blogs</Typography>
          <BlogPreviewCard
            title={data.blog ? data.blog.title : "Loading..."}
            timestamp={data.blog ? data.blog.created_at : ""}
            content={data.blog ? data.blog.content : "Loading..."}
            onClick={() => window.location.href = `/#/blogs/${data.blog ? data.blog.id : ""}`}
          />
          <Button variant="contained" onClick={() => window.location.href = '/#/blogs'}>See all blogs</Button>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6 , lg: 6}}>
          <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>Recent Thoughts</Typography>
          <Stack direction={"column"} spacing={2} sx={{ mb: 2 }}>
            {data.notes ? data.notes.map(note => (
              <NoteCard
                key={note.id}
                content={note.content}
                id={note.id}
                timestamp={note.timestamp}
                labels={note.labels}
              />
            )) : "Loading..."}
          </Stack>
          <Button variant="contained" onClick={() => window.location.href = '/#/notes'}>See all notes</Button>
        </Grid>

      </Grid>
      <Grid xs={12}/>
        <GridPaper>
          <Stack direction="column" spacing={2}>
            <Typography sx={{fontWeight: 500}}>GitHub Activities</Typography>
            <GitHubCalendar username="ivylh03" />
          </Stack>
        </GridPaper>
      </Grid>
  </Container>
}

