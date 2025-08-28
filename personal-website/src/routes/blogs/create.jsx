import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import BlogEditor from '../../components/BlogEditor'
import { Container, Typography } from '@mui/material'

export const Route = createFileRoute('/blogs/create')({
  component: RouteComponent,
})

function RouteComponent() {
  // create the blog
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    // Use password from local storage
    const password = localStorage.getItem("upload_password")
    if (!password) {
      updateLocalUploadPassword()
    }

    fetch("https://blog.ivylh03.net/blog/create", {
      method: "POST",
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



  return <>
    <Container>
        <Typography variant="h4" sx={{marginTop:3}}>Create a new blog</Typography>
        <BlogEditor onContentChange={setContent} onTitleChange={setTitle} onSubmit={handleSubmit}/>
    </Container>
  </>
}
