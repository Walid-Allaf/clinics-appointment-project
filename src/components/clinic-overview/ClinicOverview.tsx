// Import necessary components from Material-UI
import React from "react";
import { Box, Typography, Container, Grid } from "@mui/material";
import Image from "next/image";
import { portraitSmilingMaleDoctor } from "@/src/assets";

export default function ClinicOverview() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#004B71", // Background color
        py: 6, // Padding Y-axis
        color: "white", // Text color
        position: "relative",
      }}
    >
      <Container>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              component={Image}
              src={portraitSmilingMaleDoctor}
              alt="Doctor"
              sx={{
                position: "absolute",
                bottom: 0,
                left: { xs: "50%", md: 0 },
                transform: { xs: "translatex(-50%)", md: "none" },
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
              A quick overview of our clinic
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
                At our clinics, we are committed to providing top-quality healthcare using the
                latest medical equipment and advanced treatment technologies. We take pride in our
                team of highly experienced specialists who deliver comprehensive healthcare services
                to our patients.
              </Typography>
              <Typography variant="body1">
                Whether you need a medical consultation, routine check-up, or specialized treatment,
                our clinics offer a comfortable and safe environment to meet all your healthcare
                needs. We continuously strive to achieve the highest standards of quality and
                excellence in healthcare to ensure your comfort and complete satisfaction.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
