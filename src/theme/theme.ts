import { createTheme, type ThemeOptions } from "@mui/material/styles"

const brand = {
  main: "#2563eb",
  light: "#3b82f6",
  dark: "#1d4ed8",
}

const sharedComponents: ThemeOptions["components"] = {
  MuiCssBaseline: {
    styleOverrides: {
      "*::-webkit-scrollbar": { width: 8, height: 8 },
      "*::-webkit-scrollbar-thumb": {
        borderRadius: 8,
        backgroundColor: "rgba(120,120,135,0.4)",
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: { backgroundImage: "none" },
    },
  },
  MuiCard: {
    defaultProps: { elevation: 0 },
    styleOverrides: {
      root: {
        borderRadius: 14,
        border: "1px solid",
      },
    },
  },
  MuiButton: {
    defaultProps: { disableElevation: true },
    styleOverrides: {
      root: { borderRadius: 10, textTransform: "none", fontWeight: 600 },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: { fontWeight: 600, borderRadius: 8 },
    },
  },
}

const typography: ThemeOptions["typography"] = {
  fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
  h4: { fontWeight: 700, letterSpacing: "-0.02em" },
  h5: { fontWeight: 700, letterSpacing: "-0.01em" },
  h6: { fontWeight: 700 },
  subtitle1: { fontWeight: 600 },
  subtitle2: { fontWeight: 600 },
  button: { fontWeight: 600 },
}

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette:
      mode === "light"
        ? {
            mode,
            primary: brand,
            background: { default: "#f4f6fb", paper: "#ffffff" },
            text: { primary: "#0f172a", secondary: "#64748b" },
            divider: "#e2e8f0",
            success: { main: "#16a34a" },
            warning: { main: "#d97706" },
            error: { main: "#dc2626" },
            info: { main: "#0284c7" },
          }
        : {
            mode,
            primary: brand,
            background: { default: "#0b1220", paper: "#111a2e" },
            text: { primary: "#e7ecf5", secondary: "#94a3b8" },
            divider: "rgba(148,163,184,0.16)",
            success: { main: "#22c55e" },
            warning: { main: "#f59e0b" },
            error: { main: "#ef4444" },
            info: { main: "#38bdf8" },
          },
    shape: { borderRadius: 12 },
    typography,
    components: sharedComponents,
  })
