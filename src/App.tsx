import { Routes, Route } from "react-router-dom"
import AppLayout from "./components/layout/AppLayout"
import Dashboard from "./pages/Dashboard"
import Inventory from "./pages/Inventory"
import Tickets from "./pages/Tickets"
import CreateTicket from "./pages/CreateTicket"
import TicketDetails from "./pages/TicketDetails"
import Users from "./pages/Users"
import Reports from "./pages/Reports"
import Settings from "./pages/Settings"

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/tickets/new" element={<CreateTicket />} />
        <Route path="/tickets/:id" element={<TicketDetails />} />
        <Route path="/users" element={<Users />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}
