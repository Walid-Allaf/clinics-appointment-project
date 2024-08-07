"use client";
import { Almarai } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const almarai = Almarai({
  subsets: ["arabic"],
  display: "swap",
  weight: "300",
});
const rtl_theme = createTheme({
  direction: "ltr",
  palette: {
    primary: {
      main: "#004B71",
    },
    secondary: {
      main: "#3FBDE6",
    },
  },
  typography: {
    allVariants: {
      fontFamily: almarai.style.fontFamily,
    },
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

export default rtl_theme;
