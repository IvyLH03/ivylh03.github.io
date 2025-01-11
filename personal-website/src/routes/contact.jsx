import { Container } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'
import Markdown from 'react-markdown'

export const Route = createFileRoute('/contact')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Container sx={{alignSelf:"center", alignItems:"center", textAlign:"center"}}>
  <Markdown>
    {"email: ivy.hanzhang.zhu@gmail.com"}
  </Markdown>

  </Container>
}
