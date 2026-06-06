import { createContext, useContext, useMemo, useState, type ReactNode } from "react"
import { ThemeProvider, CssBaseline } from "@mui/material"
import { getTheme } from "./theme"

type Mode = "light" | "dark"

interface ColorModeContextValue {
  mode: Mode
  toggleColorMode: () => void
}

const ColorModeContext = createContext<ColorModeContextValue>({
  mode: "dark",
  toggleColorMode: () => {},
})

export const useColorMode = () => useContext(ColorModeContext)

export function ColorModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>(() => {
    const stored = localStorage.getItem("assetflow-mode")
    return stored === "light" || stored === "dark" ? stored : "dark"
  })

  const value = useMemo<ColorModeContextValue>(
    () => ({
      mode,
      toggleColorMode: () =>
        setMode((prev) => {
          const next = prev === "light" ? "dark" : "light"
          localStorage.setItem("assetflow-mode", next)
          return next
        }),
    }),
    [mode],
  )

  const theme = useMemo(() => getTheme(mode), [mode])

  return (
    <ColorModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
