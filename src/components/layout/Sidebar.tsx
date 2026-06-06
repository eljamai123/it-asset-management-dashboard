import { NavLink, useLocation } from "react-router-dom"
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
  Divider,
  Chip,
} from "@mui/material"
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded"
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded"
import ConfirmationNumberRoundedIcon from "@mui/icons-material/ConfirmationNumberRounded"
import GroupRoundedIcon from "@mui/icons-material/GroupRounded"
import HubRoundedIcon from "@mui/icons-material/HubRounded"
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded"
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded"

export const DRAWER_WIDTH = 264

const navItems = [
  { label: "Dashboard", path: "/", icon: <DashboardRoundedIcon /> },
  { label: "Inventory", path: "/inventory", icon: <DevicesRoundedIcon /> },
  { label: "Tickets", path: "/tickets", icon: <ConfirmationNumberRoundedIcon /> },
  { label: "Users", path: "/users", icon: <GroupRoundedIcon /> },
  { label: "Reports", path: "/reports", icon: <AssessmentRoundedIcon /> },
  { label: "Settings", path: "/settings", icon: <SettingsRoundedIcon /> },
]

function SidebarContent() {
  const theme = useTheme()
  const location = useLocation()

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Toolbar sx={{ px: 3, gap: 1.5 }}>
        <Box
          sx={{
            width: 38,
            height: 38,
            borderRadius: 2,
            display: "grid",
            placeItems: "center",
            bgcolor: "primary.main",
            color: "#fff",
          }}
        >
          <HubRoundedIcon fontSize="small" />
        </Box>
        <Box>
          <Typography variant="subtitle1" sx={{ lineHeight: 1.1 }}>
            AssetFlow
          </Typography>
          <Typography variant="caption" color="text.secondary">
            IT Service Desk
          </Typography>
        </Box>
      </Toolbar>
      <Divider sx={{ borderColor: theme.palette.divider }} />

      <Typography
        variant="overline"
        color="text.secondary"
        sx={{ px: 3, pt: 2.5, pb: 1, letterSpacing: "0.08em" }}
      >
        Main Menu
      </Typography>

      <List sx={{ px: 2, flexGrow: 1 }}>
        {navItems.map((item) => {
          const active =
            item.path === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.path)
          return (
            <ListItemButton
              key={item.path}
              component={NavLink}
              to={item.path}
              selected={active}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                color: active ? "primary.main" : "text.secondary",
                "&.Mui-selected": {
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? "rgba(37,99,235,0.16)"
                      : "rgba(37,99,235,0.08)",
                  "&:hover": {
                    bgcolor:
                      theme.palette.mode === "dark"
                        ? "rgba(37,99,235,0.22)"
                        : "rgba(37,99,235,0.12)",
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 38, color: "inherit" }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontWeight: 600, fontSize: 14 }}
              />
            </ListItemButton>
          )
        })}
      </List>

      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            p: 2,
            borderRadius: 3,
            border: "1px solid",
            borderColor: theme.palette.divider,
            bgcolor:
              theme.palette.mode === "dark" ? "rgba(148,163,184,0.06)" : "rgba(15,23,42,0.02)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <Typography variant="subtitle2">System Health</Typography>
            <Chip size="small" color="success" label="Operational" sx={{ ml: "auto" }} />
          </Box>
          <Typography variant="caption" color="text.secondary">
            All monitored services are running normally.
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

interface SidebarProps {
  mobileOpen: boolean
  onClose: () => void
}

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  return (
    <Box
      component="nav"
      sx={{ width: { lg: DRAWER_WIDTH }, flexShrink: { lg: 0 } }}
      aria-label="main navigation"
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": { width: DRAWER_WIDTH, borderRight: "1px solid" },
        }}
      >
        <SidebarContent />
      </Drawer>
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", lg: "block" },
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            borderRight: "1px solid",
            borderColor: "divider",
          },
        }}
      >
        <SidebarContent />
      </Drawer>
    </Box>
  )
}
