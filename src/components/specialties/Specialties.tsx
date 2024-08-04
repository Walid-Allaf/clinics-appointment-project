import { SpecialtiesItems } from "@/src/constants/SpecialtiesItems";
import { Box, Typography } from "@mui/material";
import SpecialtyCard from "./SpecialtyCard";

export default function Specialties() {
  return (
    <Box component={"section"} sx={{ px: 8, py: 8 }}>
      <Typography
        color={"primary"}
        sx={{ fontSize: "32px", fontWeight: "600", lineHeight: "40px", textAlign: "center", mb: 5 }}
      >
        Specialties
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2.5,
          justifyContent: "center",
        }}
      >
        {SpecialtiesItems.map((item, index) => {
          return <SpecialtyCard item={item} key={index} />;
        })}
      </Box>
    </Box>
  );
}
