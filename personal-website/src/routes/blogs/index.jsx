import { Breadcrumbs, Container, Divider, List, ListItem, ListItemButton, ListItemText, Paper, Typography } from '@mui/material'
import { createFileRoute, createLink } from '@tanstack/react-router'
import { Link as MuiLink} from '@mui/material';
import Markdown from 'react-markdown'
import { forwardRef, useEffect, useState } from 'react';

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
            secondary={props.data.created_at}
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
  const [blogList, setBlogList] = useState([])

  useEffect(() => {
    fetch("https://blog.ivylh03.net/blogs")
    .then(res=>res.json())
    .then(data=>setBlogList(data))
  }, [])

  return (
    <Container sx={{marginTop:3, marginBottom:3}}>
      <Breadcrumbs>
        <Typography sx={{ color: 'text.primary' }}>Blogs</Typography>
        <Divider/>
      </Breadcrumbs>
      <h1>Blogs</h1>
      <Typography>
        I don't know if these are serious enough to be called "blogs". Most of them are just work logs or notes that I will use for future reference. I built this blog system by myself. 
      </Typography>
      <br/>
      <Typography>
        Anyways, here's a list of my blogs. ✍️🔥🔥🔥
      </Typography>
      <BlogList blogs={blogList}/>
    </Container>
  )
}
