import { useState } from "react"
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControlLabel,
  Grid,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material"
import SaveRoundedIcon from "@mui/icons-material/SaveRounded"
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded"
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded"
import PageHeader from "@/components/PageHeader"

export default function Settings() {
  const [saved, setSaved] = useState(false)

  return (
    <Box>
      <PageHeader
        title="Settings"
        subtitle="Configure service desk preferences, alerts, and asset governance rules."
        action={
          <Button
            variant="contained"
            startIcon={<SaveRoundedIcon />}
            onClick={() => {
              setSaved(true)
              window.setTimeout(() => setSaved(false), 2200)
            }}
          >
            Save Changes
          </Button>
        }
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <Card sx={{ borderColor: "divider" }}>
            <CardHeader title="Organization" subheader="Workspace identity and default assignment rules" titleTypographyProps={{ variant: "h6" }} subheaderTypographyProps={{ variant: "caption" }} />
            <CardContent>
              <Grid container spacing={2.5}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField label="Workspace Name" defaultValue="AssetFlow IT" fullWidth />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField select label="Default Site" defaultValue="HQ - Floor 5" fullWidth>
                    {["HQ - Floor 5", "HQ - Floor 3", "Remote", "Data Center", "Branch - West"].map((site) => (
                      <MenuItem key={site} value={site}>
                        {site}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField select label="Auto Assign Critical Tickets" defaultValue="Robert Kim" fullWidth>
                    {["Robert Kim", "Lisa Park", "Unassigned"].map((owner) => (
                      <MenuItem key={owner} value={owner}>
                        {owner}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField select label="Inventory Review Cycle" defaultValue="Monthly" fullWidth>
                    {["Weekly", "Monthly", "Quarterly"].map((cycle) => (
                      <MenuItem key={cycle} value={cycle}>
                        {cycle}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 5 }}>
          <Card sx={{ borderColor: "divider", height: "100%" }}>
            <CardHeader title="Notification Rules" avatar={<NotificationsActiveRoundedIcon color="primary" />} titleTypographyProps={{ variant: "h6" }} />
            <CardContent>
              <Stack divider={<Divider flexItem />} spacing={1}>
                <FormControlLabel control={<Switch defaultChecked />} label="Email technicians when a critical ticket is opened" />
                <FormControlLabel control={<Switch defaultChecked />} label="Notify admins when assets enter maintenance" />
                <FormControlLabel control={<Switch />} label="Send weekly inventory summary to department leads" />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card sx={{ borderColor: "divider" }}>
            <CardHeader title="Security and Governance" avatar={<SecurityRoundedIcon color="primary" />} titleTypographyProps={{ variant: "h6" }} />
            <CardContent>
              <Grid container spacing={2.5}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField select label="Session Timeout" defaultValue="30 minutes" fullWidth>
                    {["15 minutes", "30 minutes", "1 hour", "4 hours"].map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField select label="Asset Tag Policy" defaultValue="Required" fullWidth>
                    {["Required", "Recommended", "Optional"].map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField select label="Audit Export Format" defaultValue="CSV" fullWidth>
                    {["CSV", "XLSX", "PDF"].map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
              {saved && (
                <Typography variant="body2" color="success.main" sx={{ mt: 2, fontWeight: 700 }}>
                  Settings saved successfully.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
