import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  InputBase,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material"
import MenuRoundedIcon from "@mui/icons-material/MenuRounded"
import SearchRoundedIcon from "@mui/icons-material/SearchRounded"
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded"
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded"
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded"
import PersonRoundedIcon from "@mui/icons-material/PersonRounded"
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded"
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded"
import { DRAWER_WIDTH } from "./Sidebar"
import { useColorMode } from "@/theme/ColorModeContext"

const notifications = [
  { title: "Critical: Server backup failing", time: "5 min ago" },
  { title: "New ticket assigned to you", time: "22 min ago" },
  { title: "Asset DEV-WS-15 moved to maintenance", time: "1 hr ago" },
  { title: "Weekly inventory report is ready", time: "3 hrs ago" },
]

export default function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const theme = useTheme()
  const navigate = useNavigate()
  const { mode, toggleColorMode } = useColorMode()
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null)
  const [notifAnchor, setNotifAnchor] = useState<null | HTMLElement>(null)

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{
        width: { lg: `calc(100% - ${DRAWER_WIDTH}px)` },
        ml: { lg: `${DRAWER_WIDTH}px` },
        borderBottom: "1px solid",
        borderColor: "divider",
        backdropFilter: "blur(8px)",
        bgcolor:
          theme.palette.mode === "dark" ? "rgba(17,26,46,0.8)" : "rgba(255,255,255,0.8)",
      }}
    >
      <Toolbar sx={{ gap: 1 }}>
        <IconButton
          edge="start"
          onClick={onMenuClick}
          sx={{ display: { lg: "none" } }}
          aria-label="open navigation"
        >
          <MenuRoundedIcon />
        </IconButton>

        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            gap: 1,
            px: 1.5,
            py: 0.75,
            borderRadius: 2.5,
            border: "1px solid",
            borderColor: "divider",
            minWidth: { sm: 220, md: 320 },
            bgcolor:
              theme.palette.mode === "dark" ? "rgba(148,163,184,0.06)" : "rgba(15,23,42,0.02)",
          }}
        >
          <SearchRoundedIcon fontSize="small" sx={{ color: "text.secondary" }} />
          <InputBase
            placeholder="Search assets, tickets, users..."
            fullWidth
            sx={{ fontSize: 14 }}
            inputProps={{ "aria-label": "search" }}
          />
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Tooltip title={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}>
          <IconButton onClick={toggleColorMode} aria-label="toggle color mode">
            {mode === "dark" ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
          </IconButton>
        </Tooltip>

        <Tooltip title="Notifications">
          <IconButton onClick={(e) => setNotifAnchor(e.currentTarget)} aria-label="notifications">
            <Badge badgeContent={notifications.length} color="error">
              <NotificationsRoundedIcon />
            </Badge>
          </IconButton>
        </Tooltip>

        <Box
          onClick={(e) => setProfileAnchor(e.currentTarget)}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            ml: 0.5,
            pl: 1,
            cursor: "pointer",
            borderRadius: 2,
            "&:hover": { bgcolor: "action.hover" },
            py: 0.5,
            pr: { xs: 0.5, sm: 1.5 },
          }}
        >
          <Avatar sx={{ width: 34, height: 34, bgcolor: "primary.main", fontSize: 14 }}>RK</Avatar>
          <Box sx={{ display: { xs: "none", sm: "block" }, lineHeight: 1 }}>
            <Typography variant="subtitle2" sx={{ lineHeight: 1.1 }}>
              Robert Kim
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Administrator
            </Typography>
          </Box>
        </Box>
      </Toolbar>

      <Menu
        anchorEl={notifAnchor}
        open={Boolean(notifAnchor)}
        onClose={() => setNotifAnchor(null)}
        slotProps={{ paper: { sx: { width: 340, mt: 1, borderRadius: 3 } } }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="subtitle1">Notifications</Typography>
          <Typography variant="caption" color="text.secondary">
            You have {notifications.length} unread alerts
          </Typography>
        </Box>
        <Divider />
        {notifications.map((n) => (
          <MenuItem key={n.title} onClick={() => setNotifAnchor(null)} sx={{ py: 1.25 }}>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, whiteSpace: "normal" }}>
                {n.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {n.time}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>

      <Menu
        anchorEl={profileAnchor}
        open={Boolean(profileAnchor)}
        onClose={() => setProfileAnchor(null)}
        slotProps={{ paper: { sx: { width: 220, mt: 1, borderRadius: 3 } } }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="subtitle2">Robert Kim</Typography>
          <Typography variant="caption" color="text.secondary">
            robert.kim@assetflow.io
          </Typography>
        </Box>
        <Divider />
        <MenuItem
          onClick={() => {
            setProfileAnchor(null)
            navigate("/users")
          }}
        >
          <ListItemIcon>
            <PersonRoundedIcon fontSize="small" />
          </ListItemIcon>
          My Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            setProfileAnchor(null)
            navigate("/settings")
          }}
        >
          <ListItemIcon>
            <SettingsRoundedIcon fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => setProfileAnchor(null)}>
          <ListItemIcon>
            <LogoutRoundedIcon fontSize="small" />
          </ListItemIcon>
          Sign out
        </MenuItem>
      </Menu>
    </AppBar>
  )
}
