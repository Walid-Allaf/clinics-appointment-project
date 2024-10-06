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
                    setOpen({ open: true, doctorId: "", bookingKind: 99, serviceId: item.id });
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
      {open.open && (
        <BookingDialog open={open} onClose={() => setOpen({ open: false, doctorId: "", bookingKind: 0, serviceId: "" })} locale={locale} />
      )}
    </Container>
  );
}
