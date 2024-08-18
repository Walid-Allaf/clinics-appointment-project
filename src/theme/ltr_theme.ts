"use client";
import { Lexend } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const lexend = Lexend({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const { palette } = createTheme();
const ltr_theme = createTheme({
  direction: "ltr",
  palette: {
    primary: {
      main: "#004B71",
      light: "#004B71bb",
      dark: "#004B71bb",
    },
    secondary: {
      main: "#3FBDE6",
      light: "#3FBDE6bb",
    },
  },
  typography: {
    allVariants: {
      fontFamily: lexend.style.fontFamily,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "100px",
          padding: "12px 40px 12px 40px",
          color: "#fff",
          textTransform: "capitalize",
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        root: {
          gap: "10px",
        },
        iconContainer: {
          color: "#fff",
          paddingRight: 0,
        },
        label: {
          color: "#fff",
          "&.Mui-active": {
            color: "#3FBDE6",
          },
          "&.Mui-completed": {
            color: "#3FBDE6",
          },
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          color: "#fff",
          "&.Mui-active": {
            color: "#3FBDE6",
            "& .MuiStepIcon-text": {
              color: "#fff",
              fill: "#fff",
            },
          },
          "&.Mui-completed": {
            color: "#3FBDE6",
            "& .MuiStepIcon-text": {
              color: "#fff",
              fill: "#fff",
            },
          },
        },
        text: {
          color: "#717171",
          fill: "#717171",
        },
        completed: {
          color: "#f00",
          fill: "#f00",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: "#F4F4F4",
          borderColor: "#E7E7E7",
          color: "#004B71",
          fontWeight: 700,
        },
      },
    },
  },
});

export default ltr_theme;
