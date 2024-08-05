"use client";
import { Box, Typography } from "@mui/material";
import { Branches } from "@/src/types";
import BranchesSlider from "./BranchesSlider";

export default function OurBranches(props: { slides: Array<Branches> }) {
  const { slides } = props;
  return (
    <Box component={"section"} sx={{ px: { xs: 2, md: 8 }, py: 8 }}>
      <Typography
        color={"primary"}
        sx={{ fontSize: "32px", fontWeight: "600", lineHeight: "40px", textAlign: "center", mb: 5 }}
      >
        Our Clinic Branches
      </Typography>

      <BranchesSlider slides={slides} />
    </Box>
  );
}
