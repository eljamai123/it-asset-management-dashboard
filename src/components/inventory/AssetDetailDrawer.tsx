import {
  Box,
  Drawer,
  Divider,
  IconButton,
  Typography,
  Avatar,
  Grid,
  Button,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import MemoryRoundedIcon from "@mui/icons-material/MemoryRounded"
import StorageRoundedIcon from "@mui/icons-material/StorageRounded"
import DeveloperBoardRoundedIcon from "@mui/icons-material/DeveloperBoardRounded"
import LanRoundedIcon from "@mui/icons-material/LanRounded"
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded"
import EventRoundedIcon from "@mui/icons-material/EventRounded"
import type { ReactNode } from "react"
import type { Asset } from "@/data/mockData"
import { StatusBadge } from "@/components/Badges"

function DetailRow({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 1.25 }}>
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: 2,
          display: "grid",
          placeItems: "center",
          bgcolor: "action.hover",
          color: "text.secondary",
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="body2" fontWeight={600} noWrap>
          {value}
        </Typography>
      </Box>
    </Box>
  )
}

export default function AssetDetailDrawer({
  asset,
  onClose,
}: {
  asset: Asset | null
  onClose: () => void
}) {
  const navigate = useNavigate()

  return (
    <Drawer
      anchor="right"
      open={Boolean(asset)}
      onClose={onClose}
      slotProps={{ paper: { sx: { width: { xs: "100%", sm: 420 }, p: 0 } } }}
    >
      {asset && (
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6">Asset Details</Typography>
            <IconButton onClick={onClose} aria-label="close details">
              <CloseRoundedIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Avatar sx={{ width: 56, height: 56, bgcolor: "primary.main", fontSize: 20 }}>
              {asset.brand[0]}
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ lineHeight: 1.1 }}>
                {asset.computerName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {asset.brand} {asset.model}
              </Typography>
            </Box>
            <Box sx={{ ml: "auto" }}>
              <StatusBadge status={asset.status} />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: 2,
              py: 1.5,
              borderRadius: 2,
              bgcolor: "action.hover",
              mb: 1,
            }}
          >
            <Box>
              <Typography variant="caption" color="text.secondary">
                Asset ID
              </Typography>
              <Typography variant="body2" fontWeight={700}>
                {asset.id}
              </Typography>
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="caption" color="text.secondary">
                Serial Number
              </Typography>
              <Typography variant="body2" fontWeight={700}>
                {asset.serialNumber}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 1 }} />
          <Typography variant="overline" color="text.secondary">
            Specifications
          </Typography>
          <Grid container columnSpacing={2}>
            <Grid size={6}>
              <DetailRow icon={<DeveloperBoardRoundedIcon fontSize="small" />} label="CPU" value={asset.cpu} />
            </Grid>
            <Grid size={6}>
              <DetailRow icon={<MemoryRoundedIcon fontSize="small" />} label="RAM" value={asset.ram} />
            </Grid>
            <Grid size={6}>
              <DetailRow icon={<StorageRoundedIcon fontSize="small" />} label="Storage" value={asset.storage} />
            </Grid>
            <Grid size={6}>
              <DetailRow icon={<LanRoundedIcon fontSize="small" />} label="IP Address" value={asset.ipAddress} />
            </Grid>
          </Grid>

          <Divider sx={{ my: 1 }} />
          <Typography variant="overline" color="text.secondary">
            Assignment
          </Typography>
          <DetailRow icon={<Avatar sx={{ width: 28, height: 28, fontSize: 12 }}>{asset.assignedUser[0]}</Avatar>} label="Assigned User" value={asset.assignedUser} />
          <DetailRow icon={<PlaceRoundedIcon fontSize="small" />} label="Location" value={asset.location} />
          <DetailRow icon={<EventRoundedIcon fontSize="small" />} label="Purchase Date" value={asset.purchaseDate} />

          <Box sx={{ display: "flex", gap: 1.5, mt: 3 }}>
            <Button variant="contained" fullWidth>
              Edit Asset
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              fullWidth
              onClick={() => {
                onClose()
                navigate("/tickets/new")
              }}
            >
              New Ticket
            </Button>
          </Box>
        </Box>
      )}
    </Drawer>
  )
}
