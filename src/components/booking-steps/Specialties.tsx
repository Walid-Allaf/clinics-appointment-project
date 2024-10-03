"use client";
import { BookingDialog, Loading, SpecialtyCard, Title } from "@/src/components";
import { Container, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import React from "react";
import { apiRoutes, axios } from "@/src/api";
import { AxiosResponse } from "axios";
import { AllSpecialty } from "@/src/api/types";

export default function SpecialtiesPage({ locale, next }: any) {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [specialities, setSpecialities] = React.useState<AllSpecialty>();
  const [open, setOpen] = React.useState({ open: false, doctorId: "", bookingKind: 0, serviceId: "" });

  const getSpecialities = () => {
    setLoading(true);
    axios
      .get(apiRoutes.website.GetAllServices)
      .then((response: AxiosResponse<AllSpecialty, any>) => {
        setSpecialities(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error.message);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    getSpecialities();
  }, []);
  return (
    <Container sx={{ marginTop: 4 }}>
      <Title text={t("specialityPage.pageTitle")} />

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: { xs: 0.65, sm: 2.5 }, justifyContent: "center", mb: 4 }}>
        {loading ? (
          <Loading />
        ) : (
          specialities?.data.results.map((item, index) => {
            return (
              <Box
                onClick={() => {
                  console.log(item.needDoctor);
                  if (item.needDoctor === true) {
                    next(null, item.id);
                  } else {
                    setOpen({
                      open: true,
                      doctorId: "",
                      bookingKind: 99,
                      serviceId: item.id,
                    });
                  }
                }}
                key={index}
                sx={{ cursor: "pointer" }}
              >
                <SpecialtyCard item={item} locale={locale} />
              </Box>
            );
          })
        )}
      </Box>

      {/* <Typography
        sx={{
          fontSize: "24px",
          fontWeight: 600,
          lineHeight: "28px",
          textAlign: "center",
          width: "100%",
          background: "#fff",
          position: "relative",
          zIndex: 2,
          py: 4,
          color: "#004B71",
        }}
      >
        {t("specialityPage.mapTitle")}
      </Typography> */}

      {/* <Grid container maxWidth="100%" mb={4} direction={{ xs: "column-reverse", sm: "row" }} flexWrap={"nowrap"}>
        <Grid item xs={12} sm={5} md={4} lg={3}>
          <Box
            sx={{
              background: "#004B71",
              width: "100%",
              height: "100%",
              color: "#fff",
              py: 4,
              px: 2,
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Typography sx={{ fontSize: "24px", fontWeight: 500, lineHeight: "28px", color: "#00D4FF" }}>
              {t("specialityPage.workDays")}
            </Typography>
            <Box>
              {WorkDays.map((workDay, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                    "& p": { fontSize: "12px", fontWeight: 500, lineHeight: "28px" },
                  }}
                >
                  <Typography>{t("specialityPage." + workDay.day)}</Typography>
                  <Typography>{workDay.time}</Typography>
                </Box>
              ))}
            </Box>
            <Typography sx={{ fontSize: "24px", fontWeight: 500, lineHeight: "28px", color: "#00D4FF" }}>
              {t("specialityPage.contactDetails")}
            </Typography>
            <Box>
              {Contact.map((contact, index) => (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }} key={index}>
                  <ImageIcon />
                  <Typography sx={{ fontSize: "12px", fontWeight: 500, lineHeight: "28px" }}>{contact}</Typography>
                </Box>
              ))}
            </Box>
            <SpecialLink label={t("specialityPage.bookAppointment")} locale={locale} size="lg" color="#fff" href="#" step="0" />
          </Box>
        </Grid>
        <Grid item xs={12} sm={7} md={8} lg={9} sx={{ "& iframe": { minHeight: { xs: "500px", sm: "100%" } }, minHeight: "500px" }}>
          <iframe
            src="https://maps.google.com/maps?q=36.19980587168142,37.16299669311489&z=16&output=embed"
            height="100%"
            width="100%"
          ></iframe>
        </Grid>
      </Grid> */}

      {open.open && (
        <BookingDialog open={open} onClose={() => setOpen({ open: false, doctorId: "", bookingKind: 0, serviceId: "" })} locale={locale} />
      )}
    </Container>
  );
}
