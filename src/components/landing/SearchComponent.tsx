"use client";
import React from "react";
import { Box, Button, Select, MenuItem, Grid, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchComponent() {
  const { t } = useTranslation();
  const [doctor, setDoctor] = React.useState("");
  const [clinic, setClinic] = React.useState("");
  const [specialty, setSpecialty] = React.useState("");

  const handleSearch = () => {
    // Handle search logic here
    console.log("Search clicked");
  };

  return (
    <Box
      component={Container}
      sx={{
        backgroundColor: "#004B71",
        padding: 2,
        borderRadius: "10px",
        display: { xs: "none", sm: "block" },
      }}
    >
      {/* TITLE */}
      <Box sx={{ width: "100%", position: "relative", mb: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            "&:before": {
              content: "''",
              position: "absolute",
              top: "50%",
              left: 0,
              transform: "translatey(-50%)",
              width: "100%",
              height: "4px",
              background: "#fff",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: 700,
              lineHeight: "26px",
              textAlign: "center",
              width: "max-content",
              background: "#004B71",
              position: "relative",
              zIndex: 2,
              p: 1,
              color: "#fff",
            }}
          >
            {t("quickSearch.title")}
          </Typography>
        </Box>
      </Box>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={3}>
          <Select
            fullWidth
            displayEmpty
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            sx={{
              backgroundColor: "white",
              borderRadius: 0,
              "[dir=rtl] &": {
                borderTopRightRadius: "16px",
                borderBottomRightRadius: "16px",
              },
              "[dir=ltr] &": {
                borderBottomLeftRadius: "16px",
                borderTopLeftRadius: "16px",
              },
            }}
          >
            <MenuItem value="">{t("quickSearch.chooseSpeciality")}</MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Select
            fullWidth
            displayEmpty
            value={clinic}
            onChange={(e) => setClinic(e.target.value)}
            style={{ backgroundColor: "white", borderRadius: 0 }}
          >
            <MenuItem value="">{t("quickSearch.chooseClinic")}</MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Select
            fullWidth
            displayEmpty
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            inputProps={{ "aria-label": "Without label" }}
            sx={{ backgroundColor: "white", borderRadius: 0 }}
          >
            <MenuItem value="">{t("quickSearch.chooseDoctor")}</MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            sx={{
              height: "56px",
              color: "white",
              borderRadius: 0,
              "[dir=rtl] &": {
                borderBottomLeftRadius: "16px",
                borderTopLeftRadius: "16px",
              },
              "[dir=ltr] &": {
                borderTopRightRadius: "16px",
                borderBottomRightRadius: "16px",
              },
            }}
            onClick={handleSearch}
          >
            {t("quickSearch.search")}
            <SearchIcon />
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
