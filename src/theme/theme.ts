"use client";
import { Lexend } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const lexend = Lexend({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#004B71",
    },
    secondary: {
      main: "#3FBDE6",
    },
  },
  typography: {
    fontFamily: lexend.style.fontFamily,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "100px",
          padding: "12px 40px 12px 40px",
          background: "#0085B1",
          color: "#fff",
          textTransform: "capitalize",
        },
      },
    },
  },
});

export default theme;
