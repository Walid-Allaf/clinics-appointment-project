"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Links } from "./Links";
import { LanguageChanger, Logo, SpecialLink } from "..";
import { useTranslation } from "react-i18next";
import { MedicalCenterInfo } from "@/src/api/types";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 325;

export default function DrawerAppBar({ locale, data }: NavbarProps) {
  // const { window, locale } = props;
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Logo locale={locale} logo={data.data.clinicImage} name={data.data.clinicName} nameEn={data.data.clinicNameEn} />
      <Divider />
      <Links position="drawer" />
    </Box>
  );

  // const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      {/* *** NAV IN COMPUTER *** */}
      <AppBar component="nav">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Logo locale={locale} logo={data.data.clinicImage} name={data.data.clinicName} nameEn={data.data.clinicNameEn} />
          <Box sx={{ position: "absolute", left: "50%", transform: "translatex(-50%)", top: 0 }}>
            <Links position="header" />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <LanguageChanger />
            </Box>
            <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ display: { lg: "none" } }}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* *** NAV IN MOBILE *** */}
      <nav>
        <Drawer
          // container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Toolbar />
      </nav>
    </Box>
  );
}

interface NavbarProps {
  locale: any;
  data: MedicalCenterInfo;
}
