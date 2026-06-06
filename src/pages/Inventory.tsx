import { useMemo, useState } from "react"
import {
  Box,
  Card,
  InputAdornment,
  MenuItem,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Typography,
  TablePagination,
  Tooltip,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import SearchRoundedIcon from "@mui/icons-material/SearchRounded"
import AddRoundedIcon from "@mui/icons-material/AddRounded"
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded"
import PageHeader from "@/components/PageHeader"
import { StatusBadge } from "@/components/Badges"
import AssetDetailDrawer from "@/components/inventory/AssetDetailDrawer"
import AddAssetDialog from "@/components/inventory/AddAssetDialog"
import { assets as initialAssets, type Asset, type AssetStatus } from "@/data/mockData"

const statusFilters: ("All" | AssetStatus)[] = ["All", "Active", "Maintenance", "Inactive", "Retired"]

export default function Inventory() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [assets, setAssets] = useState<Asset[]>(initialAssets)
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState<"All" | AssetStatus>("All")
  const [selected, setSelected] = useState<Asset | null>(null)
  const [addOpen, setAddOpen] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(8)

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return assets.filter((a) => {
      const matchesSearch =
        a.computerName.toLowerCase().includes(q) ||
        a.serialNumber.toLowerCase().includes(q) ||
        a.assignedUser.toLowerCase().includes(q) ||
        a.brand.toLowerCase().includes(q) ||
        a.ipAddress.includes(q)
      const matchesStatus = status === "All" || a.status === status
      return matchesSearch && matchesStatus
    })
  }, [assets, search, status])

  const paged = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return (
    <Box>
      <PageHeader
        title="Inventory Management"
        subtitle={`${assets.length} computers tracked across all locations`}
        action={
          <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={() => setAddOpen(true)}>
            Add Asset
          </Button>
        }
      />

      <Card sx={{ borderColor: "divider", p: 2, mb: 3 }}>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
          <TextField
            placeholder="Search by name, serial, user, IP..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(0)
            }}
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
            label="Status"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value as "All" | AssetStatus)
              setPage(0)
            }}
            size="small"
            sx={{ minWidth: { sm: 180 } }}
          >
            {statusFilters.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Card>

      <Card sx={{ borderColor: "divider" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ "& th": { fontWeight: 700, color: "text.secondary", bgcolor: "action.hover" } }}>
                <TableCell>Computer</TableCell>
                <TableCell>Serial</TableCell>
                {!isMobile && <TableCell>Specs</TableCell>}
                {!isMobile && <TableCell>IP Address</TableCell>}
                <TableCell>Assigned User</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paged.map((a) => (
                <TableRow
                  key={a.id}
                  hover
                  sx={{ cursor: "pointer" }}
                  onClick={() => setSelected(a)}
                >
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Avatar sx={{ width: 36, height: 36, bgcolor: "primary.main", fontSize: 14 }}>
                        {a.brand[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          {a.computerName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {a.brand} {a.model}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{a.serialNumber}</Typography>
                  </TableCell>
                  {!isMobile && (
                    <TableCell>
                      <Typography variant="caption" color="text.secondary">
                        {a.cpu}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" display="block">
                        {a.ram} - {a.storage}
                      </Typography>
                    </TableCell>
                  )}
                  {!isMobile && (
                    <TableCell>
                      <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
                        {a.ipAddress}
                      </Typography>
                    </TableCell>
                  )}
                  <TableCell>
                    <Typography variant="body2">{a.assignedUser}</Typography>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={a.status} />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="View details">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelected(a)
                        }}
                      >
                        <VisibilityRoundedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
              {paged.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                    <Typography color="text.secondary">No assets match your filters.</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={filtered.length}
          page={page}
          onPageChange={(_, p) => setPage(p)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10))
            setPage(0)
          }}
          rowsPerPageOptions={[8, 16, 24]}
        />
      </Card>

      <AssetDetailDrawer asset={selected} onClose={() => setSelected(null)} />
      <AddAssetDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={(asset) => setAssets((prev) => [asset, ...prev])}
      />
    </Box>
  )
}
