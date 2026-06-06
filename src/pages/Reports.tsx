import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from "@mui/material"
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded"
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded"
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded"
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded"
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts"
import PageHeader from "@/components/PageHeader"
import StatCard from "@/components/StatCard"
import { assets, assetsByBrand, tickets } from "@/data/mockData"

function BasicTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <Card sx={{ borderColor: "divider", boxShadow: 4 }}>
      <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
        <Typography variant="caption" fontWeight={700}>
          {label || payload[0].name}
        </Typography>
        {payload.map((item: any) => (
          <Typography key={item.dataKey || item.name} variant="caption" display="block" color="text.secondary">
            {item.name}: <strong>{item.value}</strong>
          </Typography>
        ))}
      </CardContent>
    </Card>
  )
}

export default function Reports() {
  const theme = useTheme()
  const maintenanceAssets = assets.filter((asset) => asset.status === "Maintenance")
  const openTickets = tickets.filter((ticket) => ticket.status !== "Resolved")
  const complianceScore = Math.round(((assets.length - maintenanceAssets.length) / assets.length) * 100)

  const locationData = Object.entries(
    assets.reduce<Record<string, number>>((acc, asset) => {
      acc[asset.location] = (acc[asset.location] || 0) + 1
      return acc
    }, {}),
  ).map(([location, count]) => ({ location, count }))

  const categoryData = Object.entries(
    tickets.reduce<Record<string, number>>((acc, ticket) => {
      acc[ticket.category] = (acc[ticket.category] || 0) + 1
      return acc
    }, {}),
  ).map(([category, count]) => ({ category, count }))

  const colors = [
    theme.palette.primary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.info.main,
    theme.palette.error.main,
  ]

  return (
    <Box>
      <PageHeader
        title="Reports"
        subtitle="Operational insights for assets, locations, and service desk workload."
        action={
          <Button variant="contained" startIcon={<DownloadRoundedIcon />}>
            Export Report
          </Button>
        }
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard label="Compliance Score" value={`${complianceScore}%`} icon={<AssessmentRoundedIcon />} color="success" helper="Assets in service" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard label="Tracked Assets" value={assets.length} icon={<Inventory2RoundedIcon />} color="primary" helper="Current inventory" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard label="Needs Attention" value={maintenanceAssets.length} icon={<WarningAmberRoundedIcon />} color="warning" helper="Maintenance queue" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard label="Ticket Load" value={openTickets.length} icon={<SpeedRoundedIcon />} color="info" helper="Open or in progress" />
        </Grid>

        <Grid size={{ xs: 12, lg: 7 }}>
          <Card sx={{ borderColor: "divider", height: "100%" }}>
            <CardHeader
              title="Assets by Location"
              subheader="Where endpoint inventory is currently deployed"
              titleTypographyProps={{ variant: "h6" }}
              subheaderTypographyProps={{ variant: "caption" }}
            />
            <CardContent>
              <Box sx={{ height: 320 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={locationData} margin={{ left: -18, right: 12, top: 8, bottom: 42 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
                    <XAxis dataKey="location" tick={{ fontSize: 11, fill: theme.palette.text.secondary }} angle={-22} textAnchor="end" interval={0} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: theme.palette.text.secondary }} axisLine={false} tickLine={false} />
                    <RechartsTooltip content={<BasicTooltip />} cursor={{ fill: theme.palette.action.hover }} />
                    <Bar dataKey="count" name="Assets" fill={theme.palette.primary.main} radius={[6, 6, 0, 0]} maxBarSize={34} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 5 }}>
          <Card sx={{ borderColor: "divider", height: "100%" }}>
            <CardHeader
              title="Ticket Categories"
              subheader="Demand profile by service type"
              titleTypographyProps={{ variant: "h6" }}
              subheaderTypographyProps={{ variant: "caption" }}
            />
            <CardContent>
              <Box sx={{ height: 320 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoryData} dataKey="count" nameKey="category" innerRadius={62} outerRadius={104} paddingAngle={3} stroke="none">
                      {categoryData.map((_, index) => (
                        <Cell key={index} fill={colors[index % colors.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip content={<BasicTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ borderColor: "divider", height: "100%" }}>
            <CardHeader title="Lifecycle Risk" titleTypographyProps={{ variant: "h6" }} />
            <CardContent>
              <Stack spacing={2}>
                {assetsByBrand.map((brand) => {
                  const percent = Math.min(100, Math.round((brand.value / 72) * 100))
                  return (
                    <Box key={brand.name}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.75 }}>
                        <Typography variant="body2" fontWeight={600}>
                          {brand.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {brand.value} devices
                        </Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={percent} sx={{ height: 8, borderRadius: 999 }} />
                    </Box>
                  )
                })}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ borderColor: "divider", height: "100%" }}>
            <CardHeader title="Recommended Actions" titleTypographyProps={{ variant: "h6" }} />
            <CardContent sx={{ pt: 0 }}>
              <List disablePadding>
                <ListItem disableGutters>
                  <ListItemText primary="Review maintenance assets" secondary={`${maintenanceAssets.length} devices are waiting for service validation.`} />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemText primary="Assign unowned work" secondary={`${openTickets.filter((ticket) => ticket.assignee === "Unassigned").length} open tickets have no technician assigned.`} />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemText primary="Refresh aging inventory" secondary="Retired and inactive assets should be reconciled before the next audit." />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
