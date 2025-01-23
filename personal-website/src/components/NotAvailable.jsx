import { Container } from "@mui/material";
import Markdown from "react-markdown";


export function NotAvailable() {
  return (
    <Container sx={{ alignSelf: 'center', textAlign: 'center' }}>
      <Markdown>{'# 🚧 Under construction 🚧\n\nComing soon!'}</Markdown>
    </Container>
  )
}