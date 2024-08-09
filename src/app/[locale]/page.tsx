import { Box } from "@mui/material";
import {
  ClinicOverview,
  IncreasingNumbers,
  MedicalTeam,
  OurBranches,
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
      <Box
        sx={{
          background: "linear-gradient(181.27deg, #007291 -37.39%, #004B71 112.37%);",
          maxWidth: "100%",
          paddingX: { xs: 4, md: 8 },
          paddingTop: { xs: 8, md: 0 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { xs: "column", md: "row" },
            minHeight: {
              xs: "calc(100vh - 80px)",
              md: "calc(100vh - 320px)",
              lg: "calc(100vh - 80px)",
            },
            mt: { md: 2 },
          }}
        >
          <Welcome locale={locale} />
          <Box
            sx={{
              flex: 1.5,
              display: "flex",
              alignItems: "center",
              position: "relative",
              bottom: { xs: -15, sm: 0 },
            }}
          >
            <Image src={HEROIMAGE} alt="hero-image" objectFit="cover" />
          </Box>
        </Box>
      </Box>

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
