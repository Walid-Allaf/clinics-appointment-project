import { Box, Grid, Container } from "@mui/material";
import {
  ClinicOverview,
  IncreasingNumbers,
  MedicalTeam,
  OurBranches,
  SearchComponent,
  Specialties,
  Welcome,
} from "../../components";
import Image from "next/image";
import { HEROIMAGE } from "../../assets";
import "../globals.css";
import { Branches } from "../../constants";
import initTranslations from "../i18n";

export default async function Home({ params: { locale } }: any) {
  const { t } = await initTranslations(locale, ["home"]);
  return (
    <Box>
      {/* *** LANDING *** */}
      <Box sx={{ background: "linear-gradient(181.27deg, #007291 -37.39%, #004B71 112.37%);" }}>
        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            overflow: "hidden",
            padding: 4,
            paddingBottom: 0,
            height: "100%",
            display: "flex",
            alignItems: "center",
            minHeight: "calc(100vh - 70px)",
          }}
        >
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={12} md={6}>
              <Welcome locale={locale} />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                position: { xs: "relative", md: "absolute" },
                bottom: { xs: "auto", md: 0 },
                "[dir=rtl] &": { left: { xs: "auto", md: "10px" } },
                "[dir=ltr] &": { right: { xs: "auto", md: "10px" } },
                mt: { xs: 2, md: 0 },
                textAlign: { xs: "center", md: "right" },
              }}
            >
              <Box
                component={Image}
                src={HEROIMAGE}
                alt="Doctor"
                sx={{ maxWidth: "100%", height: "auto" }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <SearchComponent />

      {/* *** Specialties *** */}
      <Specialties locale={locale} />

      {/* *** Increasing numbers *** */}
      <IncreasingNumbers />

      {/* *** Our Clinic Branches *** */}
      <OurBranches slides={Branches} locale={locale} />

      {/* *** Clinic Overview *** */}
      <ClinicOverview locale={locale} />

      {/* *** Medical Team *** */}
      <MedicalTeam locale={locale} />
    </Box>
  );
}
