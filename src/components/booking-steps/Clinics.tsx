"use client";
import { BranchCard, Loading, Title } from "@/src/components";
import { Grid, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import React from "react";
import { apiRoutes, axios } from "@/src/api";
import { AllClinic } from "@/src/api/types";
import { AxiosResponse } from "axios";

export default function Clinics({ locale, next }: any) {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [clinics, setClinics] = React.useState<AllClinic>();

  const getClinics = () => {
    setLoading(true);
    axios
      .get(apiRoutes.website.GetAllClinic)
      .then((response: AxiosResponse<AllClinic, any>) => {
        setClinics(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error.message);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    getClinics();
  }, []);
  return (
    <Box sx={{ marginTop: 4 }}>
      <Title text={t("clinicsPage.title")} />

      <Box sx={{ display: "grid", placeItems: "center" }}>
        <Grid container spacing={2} maxWidth="100%" mb={4} justifyContent={"center"} direction={{ xs: "column-reverse", sm: "row" }}>
          {loading ? (
            <Loading />
          ) : (
            clinics?.data.results.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} sx={{ minHeight: "500px", height: "100%" }} key={index}>
                <Box onClick={next} sx={{ cursor: "pointer", height: "100%" }}>
                  <BranchCard
                    title={locale === "ar" ? item.clinicName : item.clinicNameEn}
                    description={locale === "ar" ? item.clinicDescription : item.clinicDescriptionEn}
                    image={item.clinicImage}
                    locale={locale}
                  />
                </Box>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Box>
  );
}
