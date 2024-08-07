import React from "react";
import { Box, Typography, Container, Grid } from "@mui/material";
import Image from "next/image";
import { portraitSmilingMaleDoctor } from "@/src/assets";
import initTranslations from "@/src/app/i18n";

export default async function ClinicOverview({ locale }: any) {
  const { t } = await initTranslations(locale, ["quick-overview"]);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#004B71",
        py: 6,
        color: "white",
        position: "relative",
      }}
    >
      <Container>
        <Grid container spacing={4} maxWidth="100%" alignItems="center" minHeight={500}>
          <Grid item xs={12} md={6}>
            <Box
              component={Image}
              src={portraitSmilingMaleDoctor}
              alt="Doctor"
              sx={{
                position: "absolute",
                bottom: 0,
                "&:dir(ltr)": {
                  left: { xs: "50%", md: 0 },
                  transform: { xs: "translatex(-50%)", md: "none" },
                },
                "&:dir(rtl)": {
                  right: { xs: "50%", md: 0 },
                  transform: { xs: "translatex(50%) scaleX(-1)", md: "scaleX(-1)" },
                },
                maxWidth: { xs: "320px", sm: "700px", md: "800px", lg: "1000px" },
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              color="secondary"
              sx={{
                fontSize: { xs: "26px", md: "30px", lg: "40px" },
                fontWeight: 600,
                lineHeight: "50px",
              }}
            >
              {t("title")}
            </Typography>
            <Box
              sx={{
                "& p": {
                  fontSize: { xs: "16px", lg: "20px" },
                  fontWeight: 500,
                  lineHeight: "32px",
                },
                mb: { xs: 25, sm: 55, md: 0 },
              }}
            >
              <Typography variant="body1" paragraph>
                {t("description1")}
              </Typography>
              <Typography variant="body1">{t("description2")}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
