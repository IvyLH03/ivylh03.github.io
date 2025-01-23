import { Breadcrumbs, Container, Divider, List, ListItem, ListItemButton, ListItemText, Paper, Typography } from '@mui/material'
import { createFileRoute, createLink } from '@tanstack/react-router'
import { Link as MuiLink} from '@mui/material';
import Markdown from 'react-markdown'
import { forwardRef } from 'react';

export const Route = createFileRoute('/blogs/')({
  component: RouteComponent,
})

const BlogListForwardRef = forwardRef(
  (props, ref) => {
    return <MuiLink ref={ref} {...props} color='textPrimary' underline='none' sx={{width:"100%"}}>
      <ListItemButton>
        <ListItem>
          <ListItemText
            primary={props.data.title}
            secondary={props.data.time}
          />
        </ListItem>
      </ListItemButton>
      <Divider/>
    </MuiLink> 
    
  },
)

const CreatedLinkComponent = createLink(BlogListForwardRef)

const BlogListLink= (props) => {
  return <CreatedLinkComponent preload={'intent'} {...props} />
}

function BlogList({blogs}) {
  return <List dense sx={{marginTop:3}}>
    <Divider/>
    {
      blogs.map((e, i) => 
        <BlogListLink key={e.id} data={e} to={`/blogs/${e.id}`}/> 
    )}
  </List>
}

function RouteComponent() {
  return (
    <Container sx={{marginTop:3, marginBottom:3}}>
      <Breadcrumbs>
        <Typography sx={{ color: 'text.primary' }}>Blogs</Typography>
      </Breadcrumbs>
      <BlogList blogs={[{title: "hello", time: "1970-01-01", id:"1"}]}/>
    </Container>
  )
}
