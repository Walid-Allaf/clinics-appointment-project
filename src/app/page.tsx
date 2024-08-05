import { Box } from "@mui/material";
import {
  ClinicOverview,
  IncreasingNumbers,
  OurBranches,
  Specialties,
  Welcome,
} from "../components";
import Image from "next/image";
import { HEROIMAGE } from "../assets";
import "./globals.css";
import { Branches } from "../constants";

export default function Home() {
  return (
    <Box>
      {/* *** LANDING *** */}
      <Box
        sx={{
          background: "linear-gradient(181.27deg, #007291 -37.39%, #004B71 112.37%);",
          maxWidth: "100%",
          paddingX: { xs: 4, md: 8 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "calc(100vh - 80px)",
            mt: { md: 2 },
          }}
        >
          <Welcome />
          <Box
            sx={{
              flex: 1.5,
              display: { xs: "none", lg: "flex" },
              alignItems: "center",
              width: "1129px",
              height: "921px",
            }}
          >
            <Image src={HEROIMAGE} alt="hero-image" objectFit="cover" />
          </Box>
        </Box>
      </Box>

      {/* *** Specialties *** */}
      <Specialties />

      {/* *** Increasing numbers *** */}
      <IncreasingNumbers />

      {/* *** Our Clinic Branches *** */}
      <OurBranches slides={Branches} />

      {/* *** Clinic Overview *** */}
      <ClinicOverview />
    </Box>
  );
}
