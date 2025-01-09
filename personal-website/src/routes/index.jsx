import { createFileRoute } from '@tanstack/react-router'
import Markdown from 'react-markdown'
import { Box, Container } from '@mui/material'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

const testText = "# Hello!"

function RouteComponent() {
  return <>
    {/* <Container sx={{width:"100%", margin:0, padding:0, textAlign:"left"}}>
    <Markdown>{testText}</Markdown>
    </Container> */}
    <Markdown>{testText}</Markdown>
    
  </>
}

