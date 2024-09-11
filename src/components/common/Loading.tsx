import React from "react";
import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <Box sx={{ minHeight: 500, display: "grid", placeItems: "center" }}>
      <CircularProgress color="primary" size={25} />
    </Box>
  );
}
