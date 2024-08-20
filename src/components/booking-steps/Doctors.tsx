"use client";
import React from "react";
import { RANDOMDOCTOR, SPECIALTYIMAGE1, TEAMMEMBER1 } from "@/src/assets";
import { BookingDialog, TeamMemberCard, Title } from "@/src/components";
import { Container, Grid, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function Doctors({ locale, next }: any) {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);

  return (
    <Container sx={{ marginTop: 4 }}>
      <Title text={t("doctorsPage.title")} />
      <Box sx={{ display: "grid", placeItems: "center" }}>
        <Grid container spacing={2} maxWidth="100%">
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box onClick={() => setOpen(true)} sx={{ cursor: "pointer" }}>
              <TeamMemberCard
                name={t("doctorsPage.randomDoctorName")}
                description={t("doctorsPage.randomDescription")}
                specialty={t("doctorsPage.specialty")}
                specialtyImg={SPECIALTYIMAGE1}
                teamMemberImg={RANDOMDOCTOR}
                locale={locale}
                next={next}
              />
            </Box>
          </Grid>
          {[1, 2, 3, 4, 5, 6, 7].map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item}>
              <Box onClick={() => setOpen(true)} sx={{ cursor: "pointer" }}>
                <TeamMemberCard
                  name={t("doctorsPage.doctorName")}
                  description={t("doctorsPage.description")}
                  specialty={t("doctorsPage.specialty")}
                  specialtyImg={SPECIALTYIMAGE1}
                  teamMemberImg={TEAMMEMBER1}
                  locale={locale}
                  next={next}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <BookingDialog open={open} onClose={() => setOpen(false)} locale={locale} />
    </Container>
  );
}
