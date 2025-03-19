import { Breadcrumbs, Container, Typography } from '@mui/material'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import Markdown from 'react-markdown'

export const Route = createFileRoute('/blogs/$blogId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { blogId } = Route.useParams()
  const [title, setTitle] = useState("")
  const [postTime, setPostTime] = useState(0)
  const [content, setContent] = useState("")


  useEffect(()=>{
    fetch(`https://blog.ivylh03.net/blog/${blogId}`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setTitle(data.title)
      setPostTime(data.created_at)
      setContent(data.content)
    })
  },[])

  return <>
    <Container sx={{marginTop:3, marginBottom:3}}>
      <Breadcrumbs>
        <Link underline="hover" color="inherit" href="/blogs">
          Blogs
        </Link>
        <Typography sx={{ color: 'text.primary' }}>{title}</Typography>
      </Breadcrumbs>
      <Markdown>{content}</Markdown>
    </Container>
  </>
}
