"use client";
import React from "react";
import { RANDOMDOCTOR, SPECIALTYIMAGE1, TEAMMEMBER1 } from "@/src/assets";
import { BookingDialog, Loading, TeamMemberCard, Title } from "@/src/components";
import { Container, Grid, Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { apiRoutes, axios } from "@/src/api";
import { AxiosResponse } from "axios";
import { AllDoctor } from "@/src/api/types";
import { useSearchParams } from "next/navigation";

export default function Doctors({ locale, next, serviceId }: any) {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState({ open: false, doctorId: "", bookingKind: 0, serviceId: "" });
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [doctors, setDoctors] = React.useState<AllDoctor>();

  const getDoctors = async () => {
    setLoading(true);
    await axios
      .get(apiRoutes.website.GetAllDoctor(params.get("serviceId") || serviceId || ""))
      .then((response: AxiosResponse<AllDoctor, any>) => {
        setDoctors(response.data);
        if (response.data.data.results.length === 1) {
          next(response.data.data.results[0].id, params.get("serviceId") || serviceId || "");
        }
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
            {/* <Grid item xs={12} sm={6} md={4} lg={3}>
              <Box onClick={() => setOpen(true)} sx={{ cursor: "pointer" }}>
                <TeamMemberCard
                  name={t("doctorsPage.randomDoctorName")}
                  description={t("doctorsPage.randomDescription")}
                  specialty={t("doctorsPage.specialty")}
                  specialtyImg={SPECIALTYIMAGE1}
                  teamMemberImg={TEAMMEMBER1}
                  locale={locale}
                  next={next}
                />
              </Box>
            </Grid> */}

            {doctors && doctors?.data.results.length > 0 ? (
              doctors?.data.results.map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                  <Box
                  // onClick={() =>
                  //   setOpen({
                  //     open: true,
                  //     doctorId: item.id,
                  //     bookingKind: item.bookingKind,
                  //     serviceId: params.get("serviceId") || serviceId || "",
                  //   })
                  // }
                  // sx={{ cursor: "pointer" }}
                  >
                    <TeamMemberCard
                      name={item.name || ""}
                      description={locale === "ar" ? item.simpleDescription : item.simpleDescriptionEn}
                      specialty={locale === "ar" ? item.name : item.name}
                      specialtyImg={SPECIALTYIMAGE1}
                      teamMemberImg={item.image}
                      locale={locale}
                      next={() => next(item.id)}
                      openBooking={() => {
                        setOpen({
                          open: true,
                          doctorId: item.id,
                          bookingKind: item.bookingKind,
                          serviceId: params.get("serviceId") || serviceId || "",
                        });
                      }}
                    />
                  </Box>
                </Grid>
              ))
            ) : (
              <Box sx={{ minHeight: 500, display: "grid", placeItems: "center", width: "100%" }}>
                <Typography>{t("doctorsPage.noDoctors")}</Typography>
              </Box>
            )}
          </Grid>
        )}
      </Box>

      {open.open && (
        <BookingDialog open={open} onClose={() => setOpen({ open: false, doctorId: "", bookingKind: 0, serviceId: "" })} locale={locale} />
      )}
    </Container>
  );
}
