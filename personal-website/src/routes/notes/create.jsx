import { Container } from '@mui/material'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import NoteEditor from '../../components/NoteEditor'
import { createNote } from '../../scripts/noteApi'

export const Route = createFileRoute('/notes/create')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  return (<>

    <Container sx={{ marginTop: 3, marginBottom: 3 }}>
      <NoteEditor
        onSubmit={ ({ content, labels, isPrivate }) => {
          createNote(content, labels, isPrivate)
          .then(navigate({ to: '/notes' }))
        }}
      />
    </Container>
  </>)
}
