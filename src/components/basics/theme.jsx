import React from "react"
import { ThemeProvider } from "styled-components"

const theme = {
  colors: {
    black: "#16171A",
    lightGray: "#A9ACB5",
    lightestGray: "#EDF2F7"
  },
  fonts: {
    mono: "SF Mono, Menlo, Source Pro Code, monospace",
    serif: "Georgia, serif, system-ui"
  },
  screens: {
    mobile: "870px"
  }
}

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme
