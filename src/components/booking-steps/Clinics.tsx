"use client";
import { BranchCard, Title } from "@/src/components";
import { Container, Grid, Box } from "@mui/material";
import { Branches } from "@/src/constants";
import { useTranslation } from "react-i18next";

export default function Clinics({ locale, next }: any) {
  const { t } = useTranslation();
  return (
    <Container sx={{ marginTop: 4 }}>
      <Title text={t("clinicsPage.title")} />

      <Box sx={{ display: "grid", placeItems: "center" }}>
        <Grid
          container
          spacing={2}
          maxWidth="100%"
          mb={4}
          justifyContent={"center"}
          direction={{ xs: "column-reverse", sm: "row" }}
        >
          {Branches.map((item, index) => (
            <Grid item xs={12} sm={5} md={4} lg={3} sx={{ minHeight: "500px" }} key={index}>
              <Box onClick={next} sx={{ cursor: "pointer" }}>
                <BranchCard
                  title={item.title}
                  description={item.description}
                  image={item.image}
                  locale={locale}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
