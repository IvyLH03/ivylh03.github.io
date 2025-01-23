import { createFileRoute } from '@tanstack/react-router'
import { NotAvailable } from '../../components/NotAvailable'

export const Route = createFileRoute('/projects/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <NotAvailable/>
}
