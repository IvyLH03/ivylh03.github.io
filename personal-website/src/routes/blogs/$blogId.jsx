import { Breadcrumbs, Container, Typography } from '@mui/material'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import Markdown from 'react-markdown'

export const Route = createFileRoute('/blogs/$blogId')({
  component: RouteComponent,
})

function RouteComponent() {
  const [title, setTitle] = useState("Title")
  return <>
    <Container sx={{marginTop:3, marginBottom:3}}>
      <Breadcrumbs>
        <Link underline="hover" color="inherit" href="/blogs">
          Blogs
        </Link>
        <Typography sx={{ color: 'text.primary' }}>{title}</Typography>
      </Breadcrumbs>
      <Markdown>
        {"# Title\n\n"
        +"*Lorem ipsum* dolor **sit amet**, consectetur adipiscing elit. Praesent facilisis a augue eu laoreet. Nulla facilisis sem in ligula convallis, vel suscipit metus scelerisque. Sed dolor elit, vehicula at velit in, dictum mattis odio. Nullam consequat risus tortor, et venenatis mauris condimentum eu. Cras eu porta odio. Vivamus nec dui volutpat, dignissim orci eu, lobortis mauris. Integer consectetur magna quis ultricies placerat. Vivamus venenatis porttitor consectetur. Vestibulum rutrum lobortis arcu, condimentum fermentum sapien faucibus nec. Nulla tincidunt mi eget velit commodo, ac laoreet turpis porttitor. Proin consequat lorem lorem, non faucibus nunc euismod sit amet. In id quam sit amet risus finibus sollicitudin. Donec consequat urna ex, et dictum tellus mattis id.\n\n"
        +"```In hac habitasse platea dictumst. Aliquam eget mollis mauris. Etiam dapibus vitae turpis quis blandit. Proin accumsan lorem vitae lacus interdum, finibus congue odio molestie. Vivamus auctor magna lobortis velit ornare volutpat. Nulla at purus at mauris facilisis convallis eu eu est. Proin tincidunt lacus eget arcu sollicitudin, vel ultricies magna sollicitudin. Morbi interdum dictum justo vel tincidunt. Sed quis velit a orci venenatis fermentum. Donec vitae mauris tempor, finibus ligula ut, pulvinar orci. Nulla vulputate velit velit, quis lobortis leo varius nec.```\n\n"
        +"> Ut eleifend bibendum euismod. Quisque maximus orci in risus volutpat, at pharetra magna suscipit. Vestibulum ut suscipit odio. Sed facilisis magna in enim placerat, at eleifend lorem sodales. Sed pellentesque nibh quis purus sagittis, a volutpat lectus lobortis. Curabitur bibendum, urna quis auctor aliquet, sapien diam volutpat tortor, in efficitur quam magna a nunc. Aenean vel urna quis tellus ullamcorper egestas. Vivamus vitae dolor tristique, laoreet leo id, fermentum tellus. In ut euismod tortor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam faucibus vel arcu vitae dapibus. Sed nulla libero, semper vitae vestibulum a, blandit id arcu. Morbi a felis vehicula, euismod nibh a, euismod diam.\n\n"
        +"- Nunc ac feugiat mauris. Vestibulum consectetur diam sit amet orci tincidunt, pharetra varius nunc elementum. Nunc ut tortor non dolor pellentesque pulvinar et non neque. Donec efficitur maximus orci quis tristique. Nullam in justo orci. Pellentesque malesuada lacus vitae sem tempus gravida. Sed et purus vitae velit elementum efficitur vel eget metus. Suspendisse luctus ligula nec erat consectetur, id rutrum lacus varius. Mauris sed elit vel lorem eleifend facilisis. Vestibulum sagittis lectus ipsum, ut posuere augue dignissim et. Vestibulum dignissim porttitor ullamcorper. Nulla eu condimentum elit. Sed arcu diam, elementum at risus vulputate, fermentum tristique ante. Proin quis nunc egestas, scelerisque enim posuere, luctus risus. Quisque eget porttitor nisl. Donec accumsan accumsan orci a fringilla.\n\n"
        +"Nulla tempor porttitor nisi, at dictum eros accumsan et. Aenean malesuada luctus nulla, eu euismod erat ullamcorper ut. Maecenas est est, tincidunt nec ligula in, dictum auctor ex. Donec in sodales diam, egestas sollicitudin justo. Phasellus dictum nunc nec neque aliquet, vel scelerisque diam egestas. Sed rutrum purus sed gravida dignissim. Nulla lorem lorem, lobortis eu enim eu, fermentum venenatis ipsum. Nullam venenatis lobortis pharetra. Curabitur sodales nibh ligula, ac ultrices felis auctor eget."
        }
      </Markdown>
    </Container>
  </>
}
