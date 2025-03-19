import { Button, Container, TextField, Typography } from "@mui/material";

export default function BlogEditor({onTitleChange, onContentChange, onSubmit, title, content}) {
  return <Container sx={{marginTop:3, marginBottom:3}}>
      <br/> 
      <TextField sx={{m:1}} label="Title" variant="outlined" fullWidth onChange={(e) => onTitleChange(e.target.value)} value={title}/>
      <TextField sx={{m:1}} label="Content" variant="outlined" fullWidth multiline rows={10} onChange={(e) => onContentChange(e.target.value)} value={content}/>
      <Button sx={{m:1}} variant='contained' onClick={onSubmit}>Create</Button>
  </Container>
}