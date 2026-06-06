import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Box,
  Card,
  Grid,
  Button,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Avatar,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import AddRoundedIcon from "@mui/icons-material/AddRounded"
import SearchRoundedIcon from "@mui/icons-material/SearchRounded"
import PageHeader from "@/components/PageHeader"
import StatCard from "@/components/StatCard"
import { PriorityBadge, TicketStatusBadge } from "@/components/Badges"
import { useTickets } from "@/context/TicketContext"
import type { TicketPriority } from "@/data/mockData"
import ConfirmationNumberRoundedIcon from "@mui/icons-material/ConfirmationNumberRounded"
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded"
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded"
import PriorityHighRoundedIcon from "@mui/icons-material/PriorityHighRounded"

const tabs = ["All", "Open", "In Progress", "Resolved"] as const
const priorities: ("All" | TicketPriority)[] = ["All", "Low", "Medium", "High", "Critical"]

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const days = Math.floor(diff / 86400000)
  if (days > 0) return `${days}d ago`
  const hours = Math.floor(diff / 3600000)
  if (hours > 0) return `${hours}h ago`
  const mins = Math.floor(diff / 60000)
  return `${mins}m ago`
}

export default function Tickets() {
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const { tickets } = useTickets()
  const [tab, setTab] = useState(0)
  const [search, setSearch] = useState("")
  const [priority, setPriority] = useState<"All" | TicketPriority>("All")

  const stats = useMemo(
    () => ({
      open: tickets.filter((t) => t.status === "Open").length,
      progress: tickets.filter((t) => t.status === "In Progress").length,
      resolved: tickets.filter((t) => t.status === "Resolved").length,
      critical: tickets.filter((t) => t.priority === "Critical" && t.status !== "Resolved").length,
    }),
    [tickets],
  )

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return tickets.filter((t) => {
      const matchTab = tabs[tab] === "All" || t.status === tabs[tab]
      const matchPriority = priority === "All" || t.priority === priority
      const matchSearch =
        t.title.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q) ||
        t.requester.toLowerCase().includes(q)
      return matchTab && matchPriority && matchSearch
    })
  }, [tickets, tab, priority, search])

  return (
    <Box>
      <PageHeader
        title="Ticket Management"
        subtitle="Track and resolve IT service desk requests"
        action={
          <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={() => navigate("/tickets/new")}>
            Create Ticket
          </Button>
        }
      />

      <Grid container spacing={3} sx={{ mb: 1 }}>
        <Grid size={{ xs: 6, md: 3 }}>
          <StatCard label="Open" value={stats.open} icon={<ConfirmationNumberRoundedIcon />} color="info" />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <StatCard label="In Progress" value={stats.progress} icon={<HourglassTopRoundedIcon />} color="warning" />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <StatCard label="Resolved" value={stats.resolved} icon={<TaskAltRoundedIcon />} color="success" />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <StatCard label="Critical Open" value={stats.critical} icon={<PriorityHighRoundedIcon />} color="error" />
        </Grid>
      </Grid>

      <Card sx={{ borderColor: "divider", mt: 2 }}>
        <Box sx={{ px: 2, pt: 1, borderBottom: "1px solid", borderColor: "divider" }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="scrollable" scrollButtons="auto">
            {tabs.map((t) => (
              <Tab key={t} label={t} sx={{ textTransform: "none", fontWeight: 600 }} />
            ))}
          </Tabs>
        </Box>

        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, p: 2 }}>
          <TextField
            placeholder="Search tickets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            select
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as "All" | TicketPriority)}
            size="small"
            sx={{ minWidth: { sm: 170 } }}
          >
            {priorities.map((p) => (
              <MenuItem key={p} value={p}>
                {p}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ "& th": { fontWeight: 700, color: "text.secondary", bgcolor: "action.hover" } }}>
                <TableCell>Ticket</TableCell>
                {!isMobile && <TableCell>Requester</TableCell>}
                <TableCell>Priority</TableCell>
                <TableCell>Status</TableCell>
                {!isMobile && <TableCell>Updated</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((t) => (
                <TableRow key={t.id} hover sx={{ cursor: "pointer" }} onClick={() => navigate(`/tickets/${t.id}`)}>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>
                      {t.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {t.id} - {t.category} - {t.asset}
                    </Typography>
                  </TableCell>
                  {!isMobile && (
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Avatar sx={{ width: 28, height: 28, fontSize: 12 }}>{t.requester[0]}</Avatar>
                        <Typography variant="body2">{t.requester}</Typography>
                      </Box>
                    </TableCell>
                  )}
                  <TableCell>
                    <PriorityBadge priority={t.priority} />
                  </TableCell>
                  <TableCell>
                    <TicketStatusBadge status={t.status} />
                  </TableCell>
                  {!isMobile && (
                    <TableCell>
                      <Typography variant="caption" color="text.secondary">
                        {timeAgo(t.updatedAt)}
                      </Typography>
                    </TableCell>
                  )}
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                    <Typography color="text.secondary">No tickets found.</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  )
}
