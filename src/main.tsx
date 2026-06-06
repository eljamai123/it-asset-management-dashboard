import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import "@fontsource/inter/400.css"
import "@fontsource/inter/500.css"
import "@fontsource/inter/600.css"
import "@fontsource/inter/700.css"
import App from "./App"
import { ColorModeProvider } from "./theme/ColorModeContext"
import { TicketProvider } from "./context/TicketContext"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ColorModeProvider>
      <TicketProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TicketProvider>
    </ColorModeProvider>
  </React.StrictMode>,
)
