import { useState } from "react"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
  Box,
} from "@mui/material"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import type { Asset, AssetStatus } from "@/data/mockData"

const statuses: AssetStatus[] = ["Active", "Maintenance", "Inactive", "Retired"]
const brands = ["Dell", "HP", "Lenovo", "Apple", "Asus", "Acer"]

const empty = {
  computerName: "",
  serialNumber: "",
  brand: "Dell",
  model: "",
  cpu: "",
  ram: "",
  storage: "",
  ipAddress: "",
  assignedUser: "",
  status: "Active" as AssetStatus,
  location: "",
}

export default function AddAssetDialog({
  open,
  onClose,
  onAdd,
}: {
  open: boolean
  onClose: () => void
  onAdd: (asset: Asset) => void
}) {
  const [form, setForm] = useState(empty)

  const handleChange = (key: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = () => {
    const newAsset: Asset = {
      id: `AST-${Math.floor(1000 + Math.random() * 9000)}`,
      purchaseDate: new Date().toISOString().slice(0, 10),
      ...form,
      assignedUser: form.assignedUser || "Unassigned",
    }
    onAdd(newAsset)
    setForm(empty)
    onClose()
  }

  const fields: { key: keyof typeof empty; label: string; placeholder?: string }[] = [
    { key: "computerName", label: "Computer Name", placeholder: "FIN-WS-01" },
    { key: "serialNumber", label: "Serial Number", placeholder: "SN0000000" },
    { key: "model", label: "Model", placeholder: "OptiPlex 7090" },
    { key: "cpu", label: "CPU", placeholder: "Intel Core i7" },
    { key: "ram", label: "RAM", placeholder: "16 GB" },
    { key: "storage", label: "Storage", placeholder: "512 GB SSD" },
    { key: "ipAddress", label: "IP Address", placeholder: "10.0.0.1" },
    { key: "assignedUser", label: "Assigned User", placeholder: "Jane Doe" },
    { key: "location", label: "Location", placeholder: "HQ - Floor 3" },
  ]

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth slotProps={{ paper: { sx: { borderRadius: 3 } } }}>
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h6">Add New Asset</Typography>
          <Typography variant="caption" color="text.secondary">
            Register a new computer in the inventory
          </Typography>
        </Box>
        <IconButton onClick={onClose} aria-label="close">
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} sx={{ mt: 0 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField select fullWidth label="Brand" value={form.brand} onChange={handleChange("brand")} size="small">
              {brands.map((b) => (
                <MenuItem key={b} value={b}>
                  {b}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField select fullWidth label="Status" value={form.status} onChange={handleChange("status")} size="small">
              {statuses.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          {fields.map((f) => (
            <Grid size={{ xs: 12, sm: 6 }} key={f.key}>
              <TextField
                fullWidth
                size="small"
                label={f.label}
                placeholder={f.placeholder}
                value={form[f.key]}
                onChange={handleChange(f.key)}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit} disabled={!form.computerName || !form.serialNumber}>
          Add Asset
        </Button>
      </DialogActions>
    </Dialog>
  )
}
