import { Container } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'
import Markdown from 'react-markdown'

export const Route = createFileRoute('/blog')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Container sx={{alignSelf:"center", textAlign:"center"}}>
    <Markdown>
      {"# 🚧 Under construction 🚧\n\nComing soon!"}
    </Markdown>

  </Container>
}
