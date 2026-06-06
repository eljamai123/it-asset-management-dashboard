import { createContext, useContext, useState, type ReactNode } from "react"
import { tickets as initialTickets, type Ticket } from "@/data/mockData"

interface TicketContextValue {
  tickets: Ticket[]
  addTicket: (ticket: Ticket) => void
  getTicket: (id: string) => Ticket | undefined
  updateStatus: (id: string, status: Ticket["status"]) => void
}

const TicketContext = createContext<TicketContextValue | null>(null)

export const useTickets = () => {
  const ctx = useContext(TicketContext)
  if (!ctx) throw new Error("useTickets must be used within TicketProvider")
  return ctx
}

export function TicketProvider({ children }: { children: ReactNode }) {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets)

  const addTicket = (ticket: Ticket) => setTickets((prev) => [ticket, ...prev])
  const getTicket = (id: string) => tickets.find((t) => t.id === id)
  const updateStatus = (id: string, status: Ticket["status"]) =>
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status, updatedAt: new Date().toISOString() } : t)),
    )

  return (
    <TicketContext.Provider value={{ tickets, addTicket, getTicket, updateStatus }}>
      {children}
    </TicketContext.Provider>
  )
}
