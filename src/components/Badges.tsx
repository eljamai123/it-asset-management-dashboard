import { Chip } from "@mui/material"
import type {
  AssetStatus,
  TicketPriority,
  TicketStatus,
  UserRole,
} from "@/data/mockData"

type PaletteColor = "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"

const assetStatusColor: Record<AssetStatus, PaletteColor> = {
  Active: "success",
  Maintenance: "warning",
  Inactive: "default",
  Retired: "error",
}

const priorityColor: Record<TicketPriority, PaletteColor> = {
  Low: "info",
  Medium: "primary",
  High: "warning",
  Critical: "error",
}

const ticketStatusColor: Record<TicketStatus, PaletteColor> = {
  Open: "info",
  "In Progress": "warning",
  Resolved: "success",
}

const roleColor: Record<UserRole, PaletteColor> = {
  Admin: "error",
  Technician: "primary",
  Employee: "default",
}

export function StatusBadge({ status }: { status: AssetStatus }) {
  return <Chip size="small" variant="outlined" color={assetStatusColor[status]} label={status} />
}

export function PriorityBadge({ priority }: { priority: TicketPriority }) {
  return <Chip size="small" color={priorityColor[priority]} label={priority} />
}

export function TicketStatusBadge({ status }: { status: TicketStatus }) {
  return <Chip size="small" variant="outlined" color={ticketStatusColor[status]} label={status} />
}

export function RoleBadge({ role }: { role: UserRole }) {
  return <Chip size="small" color={roleColor[role]} label={role} />
}
