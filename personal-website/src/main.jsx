import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { NotFoundRoute } from '@tanstack/react-router'
import { Route as rootRoute } from './routes/__root.jsx'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { Container } from '@mui/material';
import Markdown from 'react-markdown';


const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: () => (<Container sx={{textAlign:"center", alignSelf:"center"}}>
    <Markdown>
      {"# Oops!\n\nNothing is here. 404 not found"}
    </Markdown>
  </Container>),
})

const router = createRouter({
  routeTree,
  notFoundRoute,
})


// Render the app
const rootElement = document.getElementById('root')

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}