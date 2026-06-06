import { Card, CardContent, Box, Typography, useTheme } from "@mui/material"
import type { ReactNode } from "react"
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded"
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded"

interface StatCardProps {
  label: string
  value: string | number
  icon: ReactNode
  color?: "primary" | "success" | "warning" | "error" | "info"
  delta?: number
  helper?: string
}

export default function StatCard({
  label,
  value,
  icon,
  color = "primary",
  delta,
  helper,
}: StatCardProps) {
  const theme = useTheme()
  const positive = (delta ?? 0) >= 0

  return (
    <Card sx={{ height: "100%", borderColor: "divider" }}>
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="body2" color="text.secondary" fontWeight={600}>
            {label}
          </Typography>
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: 2.5,
              display: "grid",
              placeItems: "center",
              color: `${color}.main`,
              bgcolor:
                theme.palette.mode === "dark"
                  ? `${theme.palette[color].main}22`
                  : `${theme.palette[color].main}14`,
            }}
          >
            {icon}
          </Box>
        </Box>
        <Typography variant="h4">{value}</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          {delta !== undefined && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.25,
                color: positive ? "success.main" : "error.main",
                fontWeight: 700,
                fontSize: 13,
              }}
            >
              {positive ? (
                <TrendingUpRoundedIcon sx={{ fontSize: 16 }} />
              ) : (
                <TrendingDownRoundedIcon sx={{ fontSize: 16 }} />
              )}
              {Math.abs(delta)}%
            </Box>
          )}
          {helper && (
            <Typography variant="caption" color="text.secondary">
              {helper}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}
