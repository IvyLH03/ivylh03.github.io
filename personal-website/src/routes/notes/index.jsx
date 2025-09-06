import { Breadcrumbs, Button, Container, Divider, Stack, Typography } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { deleteNote, getAllNotes } from '../../scripts/noteApi'
import NoteCard from '../../components/NoteCard'

export const Route = createFileRoute('/notes/')({
  component: RouteComponent,
})


function RouteComponent() {
  const [notes, setNotes] = useState([])
  const adminMode = localStorage.getItem("upload_password") !== null

  const refreshNotes = () => { 
    getAllNotes(adminMode).then(data => {
      console.log(data)
      setNotes(data)
    })
  }

  useEffect(() => {
    refreshNotes()
  }, [])

  return (<>
    <Container sx={{ marginTop: 3, marginBottom: 3 }}>
      <Breadcrumbs>
        <Typography sx={{ color: 'text.primary' }}>Notes</Typography>
        <Divider />
      </Breadcrumbs>
      <Typography variant="h4" sx={{marginTop:3}}>Notes</Typography>
      <br />
      {adminMode && <Button
        variant="outlined"
        href="/#/notes/create"
        sx={{ mb: 2 }}
        > Create Note</Button>}
      <Stack spacing={2}>
      {
        notes.map(note => <NoteCard 
          key={note.id} 
          id={note.id} 
          content={note.content} 
          timestamp={note.timestamp} 
          labels={note.labels} 
          onDelete = {async (id) => {
            await deleteNote(id)
            refreshNotes()
           }}
          />)
      }
      </Stack>
    </Container>
  </>)
}
