import { Button, Container, TextField, Typography } from '@mui/material'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

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

    // alert user for the upload password
    const password = prompt("Please enter the upload password")

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
    <Container sx={{marginTop:3, marginBottom:3}}>
      <Typography variant="h4" sx={{marginTop:3}}>Create a new blog</Typography>
      <br/> 
      <TextField sx={{m:1}} label="Title" variant="outlined" fullWidth onChange={(e) => setTitle(e.target.value)}/>
      <TextField sx={{m:1}} label="Content" variant="outlined" fullWidth multiline rows={10} onChange={(e) => setContent(e.target.value)}/>
      <Button sx={{m:1}} variant='contained' onClick={handleSubmit}>Create</Button>
    </Container>
  </>
}
