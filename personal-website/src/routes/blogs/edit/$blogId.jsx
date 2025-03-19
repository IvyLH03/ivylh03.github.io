import { createFileRoute, useNavigate } from '@tanstack/react-router'
import BlogEditor from '../../../components/BlogEditor'
import { Container, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/blogs/edit/$blogId')({
  component: RouteComponent,
})

function RouteComponent() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const { blogId } = Route.useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`https://blog.ivylh03.net/blog/${blogId}`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setTitle(data.title)
      setContent(data.content)
    })
  }
  ,[])

  const handleSubmit = (e) => {
    e.preventDefault()

    // alert user for the upload password
    const password = prompt("Please enter the upload password")

    fetch(`https://blog.ivylh03.net/blog/${blogId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        content: content,
        upload_password: password
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      navigate({to:"/blogs"})
    })
  }

  return <Container>
    <Typography variant="h4" sx={{marginTop:3}}>Edit Blog</Typography>
    <BlogEditor onContentChange={setContent} onTitleChange={setTitle} onSubmit={handleSubmit} content={content} title={title}/>
  </Container>
}
