import { useParams, useNavigate } from "react-router-dom"
import {
  Box,
  Card,
  CardContent,
  Button,
  Grid,
  Typography,
  Divider,
  Avatar,
  Stack,
  Chip,
} from "@mui/material"
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded"
import PageHeader from "@/components/PageHeader"
import { PriorityBadge, TicketStatusBadge } from "@/components/Badges"
import { useTickets } from "@/context/TicketContext"
import type { TicketStatus } from "@/data/mockData"

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", py: 1 }}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2" fontWeight={600} sx={{ textAlign: "right" }}>
        {value}
      </Typography>
    </Box>
  )
}

const statusFlow: TicketStatus[] = ["Open", "In Progress", "Resolved"]

export default function TicketDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getTicket, updateStatus } = useTickets()
  const ticket = id ? getTicket(id) : undefined

  if (!ticket) {
    return (
      <Box>
        <Button startIcon={<ArrowBackRoundedIcon />} color="inherit" onClick={() => navigate("/tickets")}>
          Back to tickets
        </Button>
        <Card sx={{ borderColor: "divider", mt: 2 }}>
          <CardContent sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6">Ticket not found</Typography>
            <Typography color="text.secondary">This ticket may have been removed.</Typography>
          </CardContent>
        </Card>
      </Box>
    )
  }

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

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

      <PageHeader
        title={ticket.title}
        subtitle={`${ticket.id} - Opened ${formatDate(ticket.createdAt)}`}
        action={
          <Stack direction="row" spacing={1}>
            <PriorityBadge priority={ticket.priority} />
            <TicketStatusBadge status={ticket.status} />
          </Stack>
        }
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ borderColor: "divider", mb: 3 }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Description
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                {ticket.description}
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ borderColor: "divider" }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Activity Timeline
              </Typography>
              <Stack spacing={2} sx={{ mt: 1 }}>
                <Box sx={{ display: "flex", gap: 1.5 }}>
                  <Avatar sx={{ width: 32, height: 32, fontSize: 13, bgcolor: "primary.main" }}>
                    {ticket.requester[0]}
                  </Avatar>
                  <Box>
                    <Typography variant="body2">
                      <strong>{ticket.requester}</strong> created this ticket
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(ticket.createdAt)}
                    </Typography>
                  </Box>
                </Box>
                {ticket.assignee !== "Unassigned" && (
                  <Box sx={{ display: "flex", gap: 1.5 }}>
                    <Avatar sx={{ width: 32, height: 32, fontSize: 13 }}>{ticket.assignee[0]}</Avatar>
                    <Box>
                      <Typography variant="body2">
                        Assigned to <strong>{ticket.assignee}</strong>
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(ticket.updatedAt)}
                      </Typography>
                    </Box>
                  </Box>
                )}
                {ticket.status === "Resolved" && (
                  <Box sx={{ display: "flex", gap: 1.5 }}>
                    <Avatar sx={{ width: 32, height: 32, fontSize: 13, bgcolor: "success.main" }}>R</Avatar>
                    <Box>
                      <Typography variant="body2">Ticket marked as resolved</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(ticket.updatedAt)}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ borderColor: "divider", mb: 3 }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Details
              </Typography>
              <Divider />
              <InfoItem label="Category" value={ticket.category} />
              <InfoItem label="Requester" value={ticket.requester} />
              <InfoItem label="Assignee" value={ticket.assignee} />
              <InfoItem label="Related Asset" value={ticket.asset} />
              <InfoItem label="Last Updated" value={formatDate(ticket.updatedAt)} />
            </CardContent>
          </Card>

          <Card sx={{ borderColor: "divider" }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Update Status
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Current status
              </Typography>
              <Box sx={{ mb: 2, mt: 0.5 }}>
                <Chip label={ticket.status} color="primary" />
              </Box>
              <Stack spacing={1}>
                {statusFlow.map((s) => (
                  <Button
                    key={s}
                    fullWidth
                    variant={ticket.status === s ? "contained" : "outlined"}
                    color={ticket.status === s ? "primary" : "inherit"}
                    onClick={() => updateStatus(ticket.id, s)}
                    disabled={ticket.status === s}
                  >
                    Mark as {s}
                  </Button>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
