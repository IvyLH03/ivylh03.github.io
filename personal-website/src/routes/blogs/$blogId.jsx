import { Breadcrumbs, Button, Container, Typography } from '@mui/material'
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


  useEffect(() => {
    fetch(`https://blog.ivylh03.net/blog/${blogId}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setTitle(data.title)
        setPostTime(data.created_at)
        setContent(data.content)
      })
  }, [])

  return <>
    <Container sx={{ marginTop: 3, marginBottom: 3 }}>
      <Breadcrumbs>
        <Link underline="hover" color="inherit" href="/blogs">
          Blogs
        </Link>
        <Typography sx={{ color: 'text.primary' }}>{title}</Typography>
      </Breadcrumbs>
      <Typography variant="h4" sx={{ marginTop: 3 }}>{title}</Typography>

      {
        // Management buttons that only show up if the upload password is in local storage
        localStorage.getItem("upload_password") ?
          <>
            <Button href={`#/blogs/edit/${blogId}`} variant="outlined" sx={{ marginTop: 1, marginBottom: 1, marginLeft: 1 }}>Edit Blog</Button>
            <Button title='delete blog' onClick={() => {
              if (window.confirm("Are you sure you want to delete this blog? This action cannot be undone.")) {
                // Use password from local storage
                const password = localStorage.getItem("upload_password")
                if (!password) {
                  updateLocalUploadPassword()
                }

                fetch(`https://blog.ivylh03.net/blog/${blogId}`, {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    upload_password: password
                  })
                })
                  .then(res => res.json())
                  .then(data => {
                    console.log(data)
                    window.location.href = "#/blogs"
                  })
              }
            }}
              variant="outlined" color='error' sx={{ marginTop: 1, marginBottom: 1 }}>Delete Blog</Button>
          </>
          : <></>
      }
      <Markdown>{content}</Markdown>
    </Container>
  </>
}
