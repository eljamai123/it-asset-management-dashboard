import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  Divider,
} from "@mui/material"
import ComputerRoundedIcon from "@mui/icons-material/ComputerRounded"
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded"
import BuildRoundedIcon from "@mui/icons-material/BuildRounded"
import ConfirmationNumberRoundedIcon from "@mui/icons-material/ConfirmationNumberRounded"
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts"
import PageHeader from "@/components/PageHeader"
import StatCard from "@/components/StatCard"
import { PriorityBadge, TicketStatusBadge } from "@/components/Badges"
import { assets, assetTrend, assetsByBrand, tickets, ticketTrend } from "@/data/mockData"

function ChartTooltip({ active, payload, label }: any) {
  const theme = useTheme()
  if (!active || !payload?.length) return null
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        px: 1.5,
        py: 1,
        boxShadow: theme.shadows[3],
      }}
    >
      <Typography variant="caption" fontWeight={700}>
        {label}
      </Typography>
      {payload.map((p: any) => (
        <Box key={p.dataKey} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: p.color }} />
          <Typography variant="caption" sx={{ textTransform: "capitalize" }}>
            {p.name}: <strong>{p.value}</strong>
          </Typography>
        </Box>
      ))}
    </Box>
  )
}

export default function Dashboard() {
  const theme = useTheme()
  const totalPcs = 184
  const activePcs = assets.filter((a) => a.status === "Active").length + 168
  const maintenancePcs = assets.filter((a) => a.status === "Maintenance").length + 8
  const openTickets = tickets.filter((t) => t.status !== "Resolved").length + 18
  const closedTickets = tickets.filter((t) => t.status === "Resolved").length + 142

  const pieColors = [
    theme.palette.primary.main,
    theme.palette.info.main,
    theme.palette.warning.main,
    theme.palette.success.main,
  ]

  const recentTickets = tickets.slice(0, 5)

  const axisStyle = {
    fontSize: 12,
    fill: theme.palette.text.secondary,
  }

  return (
    <Box>
      <PageHeader
        title="Dashboard"
        subtitle="Overview of your IT assets and service desk activity."
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, lg: 2.4 }}>
          <StatCard
            label="Total PCs"
            value={totalPcs}
            icon={<ComputerRoundedIcon />}
            color="primary"
            delta={4.2}
            helper="vs last month"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 2.4 }}>
          <StatCard
            label="Active PCs"
            value={activePcs}
            icon={<CheckCircleRoundedIcon />}
            color="success"
            delta={2.1}
            helper="vs last month"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 2.4 }}>
          <StatCard
            label="In Maintenance"
            value={maintenancePcs}
            icon={<BuildRoundedIcon />}
            color="warning"
            delta={-1.4}
            helper="vs last month"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 2.4 }}>
          <StatCard
            label="Open Tickets"
            value={openTickets}
            icon={<ConfirmationNumberRoundedIcon />}
            color="info"
            delta={-6.3}
            helper="vs last month"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 2.4 }}>
          <StatCard
            label="Closed Tickets"
            value={closedTickets}
            icon={<TaskAltRoundedIcon />}
            color="success"
            delta={8.7}
            helper="vs last month"
          />
        </Grid>

        {/* Asset trend */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ borderColor: "divider", height: "100%" }}>
            <CardHeader
              title="Asset Status Trend"
              subheader="Active vs in-maintenance assets over the last 6 months"
              titleTypographyProps={{ variant: "h6" }}
              subheaderTypographyProps={{ variant: "caption" }}
            />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={assetTrend} margin={{ left: -16, right: 8, top: 8 }}>
                    <defs>
                      <linearGradient id="gActive" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.4} />
                        <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gMaint" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={theme.palette.warning.main} stopOpacity={0.4} />
                        <stop offset="95%" stopColor={theme.palette.warning.main} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} vertical={false} />
                    <XAxis dataKey="month" tick={axisStyle} tickLine={false} axisLine={false} />
                    <YAxis tick={axisStyle} tickLine={false} axisLine={false} />
                    <RechartsTooltip content={<ChartTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="active"
                      name="Active"
                      stroke={theme.palette.primary.main}
                      strokeWidth={2.5}
                      fill="url(#gActive)"
                    />
                    <Area
                      type="monotone"
                      dataKey="maintenance"
                      name="Maintenance"
                      stroke={theme.palette.warning.main}
                      strokeWidth={2.5}
                      fill="url(#gMaint)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Assets by brand pie */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ borderColor: "divider", height: "100%" }}>
            <CardHeader
              title="Assets by Brand"
              subheader="Distribution across vendors"
              titleTypographyProps={{ variant: "h6" }}
              subheaderTypographyProps={{ variant: "caption" }}
            />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={assetsByBrand}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={62}
                      outerRadius={92}
                      paddingAngle={3}
                      stroke="none"
                    >
                      {assetsByBrand.map((_, i) => (
                        <Cell key={i} fill={pieColors[i % pieColors.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip content={<ChartTooltip />} />
                    <Legend
                      verticalAlign="bottom"
                      iconType="circle"
                      formatter={(v) => <span style={{ color: theme.palette.text.secondary, fontSize: 12 }}>{v}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Ticket trend bar */}
        <Grid size={{ xs: 12, lg: 7 }}>
          <Card sx={{ borderColor: "divider", height: "100%" }}>
            <CardHeader
              title="Ticket Volume"
              subheader="Opened vs closed tickets per month"
              titleTypographyProps={{ variant: "h6" }}
              subheaderTypographyProps={{ variant: "caption" }}
            />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ticketTrend} margin={{ left: -16, right: 8, top: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} vertical={false} />
                    <XAxis dataKey="month" tick={axisStyle} tickLine={false} axisLine={false} />
                    <YAxis tick={axisStyle} tickLine={false} axisLine={false} />
                    <RechartsTooltip content={<ChartTooltip />} cursor={{ fill: theme.palette.action.hover }} />
                    <Legend
                      iconType="circle"
                      formatter={(v) => <span style={{ color: theme.palette.text.secondary, fontSize: 12 }}>{v}</span>}
                    />
                    <Bar dataKey="opened" name="Opened" fill={theme.palette.primary.main} radius={[6, 6, 0, 0]} maxBarSize={26} />
                    <Bar dataKey="closed" name="Closed" fill={theme.palette.success.main} radius={[6, 6, 0, 0]} maxBarSize={26} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent tickets */}
        <Grid size={{ xs: 12, lg: 5 }}>
          <Card sx={{ borderColor: "divider", height: "100%" }}>
            <CardHeader
              title="Recent Tickets"
              subheader="Latest service desk activity"
              titleTypographyProps={{ variant: "h6" }}
              subheaderTypographyProps={{ variant: "caption" }}
            />
            <CardContent sx={{ pt: 0 }}>
              <List disablePadding>
                {recentTickets.map((t, i) => (
                  <Box key={t.id}>
                    <ListItem disableGutters sx={{ py: 1.25, gap: 1, alignItems: "flex-start" }}>
                      <ListItemText
                        primary={
                          <Typography variant="body2" fontWeight={600} noWrap>
                            {t.title}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="caption" color="text.secondary">
                            {t.id} - {t.requester}
                          </Typography>
                        }
                      />
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, alignItems: "flex-end" }}>
                        <PriorityBadge priority={t.priority} />
                        <TicketStatusBadge status={t.status} />
                      </Box>
                    </ListItem>
                    {i < recentTickets.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
