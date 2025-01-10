import { createFileRoute } from '@tanstack/react-router'
import Markdown from 'react-markdown'
import { Box, Container, Paper } from '@mui/material'
import Grid from '@mui/material/Grid2';


export const Route = createFileRoute('/')({
  component: RouteComponent,
})

const testText = "# Hello! \nLorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tristique elit vel est elementum vulputate. Mauris vulputate laoreet leo, sit amet semper sapien hendrerit interdum. Maecenas sit amet erat tortor. Pellentesque faucibus est nulla, quis elementum nulla facilisis quis. Praesent nulla ex, tristique vel risus et, porta vehicula turpis. Fusce est tortor, feugiat ac elit viverra, pretium dapibus nulla. Aenean sit amet mauris vel tellus fringilla maximus quis non mauris. Vivamus sed dolor arcu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.\n\nMorbi tristique massa non viverra auctor. Proin iaculis purus vitae leo pulvinar, vitae mollis felis pharetra. Maecenas facilisis, lectus ac porta auctor, eros metus scelerisque orci, ac pharetra mauris nisl non turpis. Duis congue tincidunt est vulputate porttitor. Cras vitae urna urna. Nullam fermentum nisl quis feugiat varius. Donec ullamcorper, purus eu condimentum dignissim, libero tortor luctus diam, eu gravida metus leo a lectus. Sed blandit justo at eros tincidunt condimentum. Sed id vehicula massa. Curabitur orci sapien, scelerisque vel diam nec, posuere tempus velit. Duis ut tempus ligula. In pulvinar arcu quis massa vulputate accumsan ut eget arcu.\n\nMauris enim quam, molestie gravida massa sed, ultrices scelerisque massa. Cras vel dui nibh. Pellentesque ac turpis tortor. Integer at hendrerit turpis. Aenean id nulla ac sapien feugiat accumsan. Ut mattis odio eu lorem tristique, sed luctus lorem mollis. Nullam dignissim sem nec libero sollicitudin tempus. Praesent iaculis, justo nec efficitur eleifend, tellus nisi aliquam nulla, ut condimentum nisi erat id quam. Nunc pretium enim id libero vestibulum laoreet. Maecenas nisl augue, auctor eu porta non, pellentesque et nisl. Pellentesque lectus tortor, suscipit vel nunc et, varius sollicitudin neque. Suspendisse dictum sit amet dolor at bibendum. Phasellus vestibulum, elit sit amet varius venenatis, tellus nisl bibendum nunc, ut dictum nunc nisi eu turpis. Pellentesque purus mauris, convallis quis eleifend at, pretium id nulla. Sed eleifend, massa ut aliquet interdum, ex ipsum tempus massa, vitae ultricies nulla diam vel nunc. Donec a maximus ipsum."
const text = "# Hello!👋\n\nMy name is Ivy Zhu (Hanzhang Zhu). I am currently a junior in UW-Madison, majoring in Computer Science. \n\nI enjoy working on all kinds of projects and helping people build software solutions to solve real-world problems. If you're facing a challenge and need a hand, I'd love to help. And if you're working on a cool project, feel free to invite me - I'm always excited to collaborate and learn something new!"
const testTextRealShort = "# Hello!"

const helping = "### 👥 I can help you with...\n\n- Building websites - like this one \n\n- Building online automation tools\n\t - Post backup & text process\n[Previous project]() \n\t - Automods & chatbots\n[Previous project]()"
const projects = "### 💻 I am working on...\n\n- Voice interaction alarm app \n\t- Learning Kotlin\n\t- [See demo from MadHacks]()\n\n- Minesweeper AI\n\t- Learning reinforcement learning"
const seeking = "### 🏃 I am looking for..\n\n- Any interesting opportunities! \n\t- Internship, research, projects, random ideas...\n- Meeting new friends in Madison\n\n[Contact me]() for anything!"
function GridPaper({children}) {
  return <Paper sx={{
    pt:2,
    pb:2,
    pl:4,
    pr:4,
    m:2
  }}>
    {children}
  </Paper>
}

function RouteComponent() {
  return <Container sx={{pt:8}}>
      <Markdown>{text}</Markdown>
      <br/>
      <Grid container>
        <Grid size={{xs:12}}>
          <GridPaper>
            <Markdown>{projects}</Markdown>
          </GridPaper> 
        </Grid>
        <Grid size={{xs:12, lg:6}}>
          <GridPaper>
            <Markdown>{helping}</Markdown>
          </GridPaper>
        </Grid>
        <Grid size={{xs:12, lg:6}}>
          <GridPaper>
            <Markdown>{seeking}</Markdown>
          </GridPaper>
        </Grid>
      </Grid>
  </Container>
}

