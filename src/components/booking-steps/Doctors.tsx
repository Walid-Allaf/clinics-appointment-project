"use client";
import React from "react";
import { RANDOMDOCTOR, SPECIALTYIMAGE1, TEAMMEMBER1 } from "@/src/assets";
import { BookingDialog, Loading, TeamMemberCard, Title } from "@/src/components";
import { Container, Grid, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { apiRoutes, axios } from "@/src/api";
import { AxiosResponse } from "axios";
import { AllDoctor } from "@/src/api/types";

export default function Doctors({ locale, next }: any) {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [doctors, setDoctors] = React.useState<AllDoctor>();

  const getDoctors = () => {
    setLoading(true);
    axios
      .get(apiRoutes.website.GetAllDoctor)
      .then((response: AxiosResponse<AllDoctor, any>) => {
        setDoctors(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error.message);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    getDoctors();
  }, []);

  return (
    <Container sx={{ marginTop: 4 }}>
      <Title text={t("doctorsPage.title")} />
      <Box sx={{ display: "grid", placeItems: "center" }}>
        {loading ? (
          <Loading />
        ) : (
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

            {doctors?.data.results.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.doctorId}>
                <Box onClick={() => setOpen(true)} sx={{ cursor: "pointer" }}>
                  <TeamMemberCard
                    name={locale === "ar" ? item.doctorName : item.doctorNameEn}
                    description={locale === "ar" ? item.doctorDescription : item.doctorDescriptionEn}
                    specialty={locale === "ar" ? item.doctorSpecialty.specialtyName : item.doctorSpecialty.specialtyNameEn}
                    specialtyImg={SPECIALTYIMAGE1}
                    teamMemberImg={item.doctorImage}
                    locale={locale}
                    next={() => next(item.doctorId)}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      <BookingDialog open={open} onClose={() => setOpen(false)} locale={locale} />
    </Container>
  );
}
