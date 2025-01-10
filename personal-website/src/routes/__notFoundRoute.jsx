import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/__notFoundRoute')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/__notFoundRoute"!</div>
}
