"use client";
import { TEAMMEMBER1 } from "@/src/assets";
import { BookingDialog, SpecialLink } from "@/src/components";
import { Container, Grid, Box, Typography, Card, CardContent, Button } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

const DoctorInformation = ({ locale }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Box sx={{ background: "#004B71", py: 6, width: "100%", color: "#fff" }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: { xs: "100%", md: "60%" }, mb: { xs: 15, md: 0 } }}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography
              variant="h4"
              sx={{ fontSize: "48px", fontWeight: 500, lineHeight: "60px" }}
              gutterBottom
            >
              Dr. Michael Stevens
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ fontSize: "16px", fontWeight: 500, lineHeight: "24px" }}
              gutterBottom
            >
              A highly experienced cardiologist with more than 15 years in the field, specializing
              in diagnosing and treating a wide range of heart conditions. Dedicated to providing
              personalized care and utilizing the latest advancements in cardiac medicine.
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container sx={{ display: { xs: "grid", md: "block" }, placeItems: "center" }}>
        <Box
          display={"flex"}
          gap={6}
          flexDirection={{ xs: "column-reverse", md: "row" }}
          sx={{ marginTop: 2 }}
          maxWidth="100%"
        >
          <Box sx={{ mt: { xs: -15, md: 0 } }}>
            <Typography
              component="h2"
              sx={{ fontSize: "32px", fontWeight: 700, lineHeight: "38.73px" }}
              gutterBottom
            >
              About the doctor
            </Typography>
            <Box sx={{ fontSize: "18px", fontWeight: 400, lineHeight: "21.78px" }}>
              <Typography variant="body1" paragraph>
                Dr. Michael Stevens is a distinguished cardiologist with national and international
                recognition for his extensive expertise and high-level skills in cardiology. He
                earned his Ph.D. in Cardiology from [University Name], one of the world’s leading
                institutions in medicine and health sciences. Dr. Stevens began his medical career
                as a resident at [Hospital Name], where he gained valuable practical experience in
                treating and caring for patients with various heart conditions.
              </Typography>
              <Typography variant="body1" paragraph>
                Throughout his over 15-year career, Dr. Stevens has worked in several prestigious
                hospitals, including [Hospital Name] and [Hospital Name], where he held leadership
                positions and contributed to the development of innovative treatment programs. He is
                known for his precise diagnostic skills and ability to provide effective treatment
                solutions for his patients, including complex surgical and interventional
                procedures.
              </Typography>
              <Typography variant="body1" paragraph>
                In addition to his clinical work, Dr. Stevens regularly participates in global
                medical conferences as a keynote speaker, presenting the latest research and
                discoveries in cardiology. He has numerous published studies in peer-reviewed
                international medical journals, covering diverse topics such as:
              </Typography>
              <Box sx={{ fontSize: "16px", fontWeight: 500, lineHeight: "24px" }}>
                <ul>
                  <li>Diagnosis and treatment of coronary artery diseases</li>
                  <li>
                    Utilization of modern technology in monitoring and treating cardiac patients
                  </li>
                  <li>Development of preventive strategies to reduce cardiovascular diseases</li>
                </ul>
              </Box>
              <Typography variant="body1" paragraph>
                Dr. Stevens is an active member of several global medical societies, including the
                American Heart Association and the European Society of Cardiology, reflecting his
                ongoing commitment to advancing the field of cardiology both locally and
                internationally.
              </Typography>
            </Box>
          </Box>
          <Box>
            <Card sx={{ padding: 2, borderRadius: "12px", position: "relative", bottom: 150 }}>
              <Box
                sx={{ position: "relative", bottom: 8, display: "flex", justifyContent: "center" }}
              >
                <Box
                  sx={{
                    width: "80%",
                    "&:before": {
                      content: "''",
                      position: "absolute",
                      bottom: "7px",
                      left: 0,
                      width: "100%",
                      height: "94%",
                      background: "linear-gradient(180deg, #008FD7 -106.1%, #004B71 138.2%)",
                      borderRadius: "10px",
                      zIndex: 1,
                      overflow: "hidden",
                    },
                  }}
                >
                  <Image
                    src={TEAMMEMBER1}
                    alt="Dr. Michael Stevens"
                    layout="responsive"
                    objectFit="cover"
                    style={{
                      zIndex: 2,
                      position: "relative",
                    }}
                  />
                </Box>
              </Box>
              <CardContent
                sx={{
                  "& p:not(:last-of-type)": {
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: 500,
                    textWrap: { xs: "wrap", md: "nowrap" },
                    py: 2,
                    "&:not(:last-of-type)": {
                      borderBottom: "2px solid #CACACA",
                    },
                  },
                }}
              >
                <Typography variant="body2">
                  <span>Department:</span> <span>Cardiology</span>
                </Typography>
                <Typography variant="body2">
                  <span>Branch: First branch:</span> <span>Baghdad</span>
                </Typography>
                <Typography variant="body2">
                  <span>Consultation Duration:</span> <span>30 minutes</span>
                </Typography>
                <Typography variant="body2">
                  <span>Appointment Type:</span> <span>Scheduled</span>
                </Typography>
                <Typography variant="body2">
                  <span>Working Days:</span> <span>Saturday until Thursday</span>
                </Typography>
                <Typography variant="body2">
                  <span>Working Hours:</span> <span>9:00 AM - 03:00 PM</span>
                </Typography>
                <Box sx={{ mt: 4 }}>
                  {/* <SpecialLink
                    href="/"
                    label="Book an Appointment"
                    locale={params.locale}
                    size="sm"
                    width="100%"
                  /> */}
                  <Button onClick={() => setOpen(true)} variant="contained" color="secondary">
                    Book an Appointment
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
      <BookingDialog open={open} onClose={() => setOpen(false)} locale={locale} />
    </Box>
  );
};

export default DoctorInformation;
