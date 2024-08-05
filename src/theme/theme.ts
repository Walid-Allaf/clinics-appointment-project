"use client";
import { Lexend } from "next/font/google";
import { createTheme, PaletteColorOptions } from "@mui/material/styles";

const lexend = Lexend({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

// declare module "@mui/material/styles" {
//   interface Palette {
//     whiteColor: PaletteColorOptions;
//   }
//   interface PaletteOptions {
//     whiteColor: PaletteColorOptions;
//   }
// }

// declare module "@mui/icons-material/ArrowForward" {
//   interface htmlColor {
//     whiteColor: PaletteColorOptions;
//   }
// }

const { palette } = createTheme();
const theme = createTheme({
  palette: {
    primary: {
      main: "#004B71",
    },
    secondary: {
      main: "#3FBDE6",
    },
    // whiteColor: palette.augmentColor({
    //   color: {
    //     main: "#FFFFFF",
    //   },
    // }),
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
