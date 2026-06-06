import { useMemo, useState } from "react"
import {
  Box,
  Card,
  CardContent,
  Grid,
  Avatar,
  Typography,
  TextField,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
  IconButton,
  Tooltip,
  Chip,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
} from "@mui/material"
import SearchRoundedIcon from "@mui/icons-material/SearchRounded"
import AddRoundedIcon from "@mui/icons-material/AddRounded"
import EmailRoundedIcon from "@mui/icons-material/EmailRounded"
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded"
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded"
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded"
import PageHeader from "@/components/PageHeader"
import StatCard from "@/components/StatCard"
import { RoleBadge } from "@/components/Badges"
import { users as initialUsers, type User, type UserRole } from "@/data/mockData"
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded"
import EngineeringRoundedIcon from "@mui/icons-material/EngineeringRounded"
import GroupRoundedIcon from "@mui/icons-material/GroupRounded"

const roleFilters: ("All" | UserRole)[] = ["All", "Admin", "Technician", "Employee"]

const avatarColors: Record<UserRole, string> = {
  Admin: "#dc2626",
  Technician: "#2563eb",
  Employee: "#0284c7",
}

export default function Users() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [search, setSearch] = useState("")
  const [role, setRole] = useState<"All" | UserRole>("All")
  const [addOpen, setAddOpen] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Employee" as UserRole,
    department: "",
    phone: "",
    location: "HQ - Floor 5",
  })

  const updateForm = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((current) => ({ ...current, [key]: e.target.value }))

  const handleAddUser = () => {
    const newUser: User = {
      id: `USR-${String(users.length + 1).padStart(2, "0")}`,
      status: "Active",
      assignedAssets: 0,
      ...form,
    }
    setUsers((current) => [newUser, ...current])
    setForm({
      name: "",
      email: "",
      role: "Employee",
      department: "",
      phone: "",
      location: "HQ - Floor 5",
    })
    setAddOpen(false)
  }

  const counts = useMemo(
    () => ({
      admins: users.filter((u) => u.role === "Admin").length,
      techs: users.filter((u) => u.role === "Technician").length,
      employees: users.filter((u) => u.role === "Employee").length,
    }),
    [users],
  )

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return users.filter((u) => {
      const matchRole = role === "All" || u.role === role
      const matchSearch =
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.department.toLowerCase().includes(q)
      return matchRole && matchSearch
    })
  }, [search, role])

  return (
    <Box>
      <PageHeader
        title="Users Management"
        subtitle="Manage team members, roles, and access"
        action={
          <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={() => setAddOpen(true)}>
            Add User
          </Button>
        }
      />

      <Grid container spacing={3} sx={{ mb: 1 }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard label="Administrators" value={counts.admins} icon={<AdminPanelSettingsRoundedIcon />} color="error" />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard label="Technicians" value={counts.techs} icon={<EngineeringRoundedIcon />} color="primary" />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard label="Employees" value={counts.employees} icon={<GroupRoundedIcon />} color="info" />
        </Grid>
      </Grid>

      <Card sx={{ borderColor: "divider", p: 2, mt: 2, mb: 3 }}>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2, alignItems: { md: "center" } }}>
          <TextField
            placeholder="Search users by name, email, department..."
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
          <ToggleButtonGroup
            value={role}
            exclusive
            onChange={(_, v) => v && setRole(v)}
            size="small"
            sx={{ flexShrink: 0 }}
          >
            {roleFilters.map((r) => (
              <ToggleButton key={r} value={r} sx={{ textTransform: "none", px: 2 }}>
                {r}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
      </Card>

      <Grid container spacing={3}>
        {filtered.map((u) => (
          <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={u.id}>
            <Card sx={{ borderColor: "divider", height: "100%" }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar sx={{ width: 52, height: 52, bgcolor: avatarColors[u.role], fontSize: 18 }}>
                    {u.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </Avatar>
                  <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="subtitle1" noWrap>
                        {u.name}
                      </Typography>
                      <Chip
                        size="small"
                        label={u.status}
                        color={u.status === "Active" ? "success" : "default"}
                        variant="outlined"
                        sx={{ height: 20 }}
                      />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {u.department}
                    </Typography>
                  </Box>
                  <RoleBadge role={u.role} />
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <EmailRoundedIcon fontSize="small" sx={{ color: "text.secondary" }} />
                    <Typography variant="body2" noWrap>
                      {u.email}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <PhoneRoundedIcon fontSize="small" sx={{ color: "text.secondary" }} />
                    <Typography variant="body2">{u.phone}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <PlaceRoundedIcon fontSize="small" sx={{ color: "text.secondary" }} />
                    <Typography variant="body2">{u.location}</Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    mt: 2,
                    pt: 1.5,
                    borderTop: "1px solid",
                    borderColor: "divider",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <DevicesRoundedIcon fontSize="small" sx={{ color: "text.secondary" }} />
                    <Typography variant="body2" color="text.secondary">
                      {u.assignedAssets} assigned {u.assignedAssets === 1 ? "asset" : "assets"}
                    </Typography>
                  </Box>
                  <Tooltip title="Send email">
                    <IconButton size="small" href={`mailto:${u.email}`}>
                      <EmailRoundedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {filtered.length === 0 && (
          <Grid size={12}>
            <Card sx={{ borderColor: "divider" }}>
              <CardContent sx={{ textAlign: "center", py: 6 }}>
                <Typography color="text.secondary">No users match your filters.</Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      <Dialog open={addOpen} onClose={() => setAddOpen(false)} maxWidth="sm" fullWidth slotProps={{ paper: { sx: { borderRadius: 3 } } }}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ mt: 0 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="Full Name" value={form.name} onChange={updateForm("name")} fullWidth size="small" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="Email" value={form.email} onChange={updateForm("email")} fullWidth size="small" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField select label="Role" value={form.role} onChange={updateForm("role")} fullWidth size="small">
                {roleFilters.filter((item) => item !== "All").map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="Department" value={form.department} onChange={updateForm("department")} fullWidth size="small" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="Phone" value={form.phone} onChange={updateForm("phone")} fullWidth size="small" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField select label="Location" value={form.location} onChange={updateForm("location")} fullWidth size="small">
                {["HQ - Floor 5", "HQ - Floor 4", "HQ - Floor 3", "Remote", "Branch - West"].map((location) => (
                  <MenuItem key={location} value={location}>
                    {location}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button color="inherit" onClick={() => setAddOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleAddUser} disabled={!form.name || !form.email || !form.department}>
            Add User
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
