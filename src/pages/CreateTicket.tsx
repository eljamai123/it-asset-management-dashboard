import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Box,
  Card,
  CardContent,
  Button,
  Grid,
  TextField,
  MenuItem,
  Typography,
  Divider,
} from "@mui/material"
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded"
import PageHeader from "@/components/PageHeader"
import { useTickets } from "@/context/TicketContext"
import { assets, users, type Ticket, type TicketPriority } from "@/data/mockData"

const priorities: TicketPriority[] = ["Low", "Medium", "High", "Critical"]
const categories = ["Hardware", "Software", "Network", "Account", "Peripheral", "Request", "Server", "Maintenance"]

export default function CreateTicket() {
  const navigate = useNavigate()
  const { addTicket } = useTickets()
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium" as TicketPriority,
    category: "Hardware",
    requester: users[0].name,
    assignee: "Unassigned",
    asset: assets[0].computerName,
  })

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = () => {
    const now = new Date().toISOString()
    const ticket: Ticket = {
      id: `TKT-${Math.floor(2000 + Math.random() * 8000)}`,
      status: "Open",
      createdAt: now,
      updatedAt: now,
      ...form,
    }
    addTicket(ticket)
    navigate(`/tickets/${ticket.id}`)
  }

  return (
    <Box>
      <Button
        startIcon={<ArrowBackRoundedIcon />}
        color="inherit"
        onClick={() => navigate("/tickets")}
        sx={{ mb: 1 }}
      >
        Back to tickets
      </Button>
      <PageHeader title="Create Ticket" subtitle="Submit a new IT service desk request" />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ borderColor: "divider" }}>
            <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              <TextField
                label="Title"
                placeholder="Brief summary of the issue"
                value={form.title}
                onChange={set("title")}
                fullWidth
              />
              <TextField
                label="Description"
                placeholder="Describe the problem in detail, including any steps already taken..."
                value={form.description}
                onChange={set("description")}
                fullWidth
                multiline
                minRows={6}
              />
              <Box sx={{ display: "flex", gap: 1.5, justifyContent: "flex-end" }}>
                <Button color="inherit" onClick={() => navigate("/tickets")}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleSubmit} disabled={!form.title || !form.description}>
                  Submit Ticket
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ borderColor: "divider" }}>
            <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              <Typography variant="subtitle1">Ticket Details</Typography>
              <Divider />
              <TextField select label="Priority" value={form.priority} onChange={set("priority")} fullWidth size="small">
                {priorities.map((p) => (
                  <MenuItem key={p} value={p}>
                    {p}
                  </MenuItem>
                ))}
              </TextField>
              <TextField select label="Category" value={form.category} onChange={set("category")} fullWidth size="small">
                {categories.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </TextField>
              <TextField select label="Requester" value={form.requester} onChange={set("requester")} fullWidth size="small">
                {users.map((u) => (
                  <MenuItem key={u.id} value={u.name}>
                    {u.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField select label="Assignee" value={form.assignee} onChange={set("assignee")} fullWidth size="small">
                <MenuItem value="Unassigned">Unassigned</MenuItem>
                {users
                  .filter((u) => u.role !== "Employee")
                  .map((u) => (
                    <MenuItem key={u.id} value={u.name}>
                      {u.name}
                    </MenuItem>
                  ))}
              </TextField>
              <TextField select label="Related Asset" value={form.asset} onChange={set("asset")} fullWidth size="small">
                {assets.map((a) => (
                  <MenuItem key={a.id} value={a.computerName}>
                    {a.computerName}
                  </MenuItem>
                ))}
              </TextField>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
