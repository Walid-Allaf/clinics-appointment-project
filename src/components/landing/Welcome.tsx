"use client";
import { Box, Typography, Grid } from "@mui/material";
import Image from "next/image";
import { SpecialLink } from "..";
import { useTranslation } from "react-i18next";
import React from "react";
import { MedicalCenterInfo } from "@/src/api/types";
import { HEROIMAGE } from "@/src/assets";
import Cookies from "js-cookie";

export default function Welcome({ locale, data }: WelcomeProps) {
  const { t } = useTranslation();
  const Features = ["feature1", "feature2", "feature3"];

  console.log("data", data);
  Cookies.set("bookikngType", data.data.bookingType.toString());

  return (
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid item xs={12} md={6}>
        <Box
          component="div"
          sx={{ "& p": { color: "#fff" }, display: "flex", flexDirection: "column", gap: 3, textAlign: { xs: "center", md: "start" } }}
        >
          <Typography sx={{ fontSize: "20px", fontWeight: 500, lineHeight: "25px" }}>
            {t("landing.welcome")}
            {locale === "ar" ? data?.data.clinicName : data.data.clinicNameEn}
          </Typography>
          <Typography sx={{ fontSize: { xs: "28px", md: "32px", lg: "36px" }, fontWeight: 600, lineHeight: { xs: "38px", md: "45px" } }}>
            {locale === "ar" ? data?.data.clinicName : data?.data.clinicNameEn}
          </Typography>
          <Typography sx={{ fontWeight: 500, lineHeight: "19.36px" }}>
            {locale === "ar" ? data?.data.clinicDescription : data?.data.clinicDescriptionEn}
          </Typography>
          <Box>
            {/* <List sx={{}}>
          {Features.map((item) => (
            <ListItem key={item} disablePadding sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <Image src={CHECK} alt="check-icon" width={26} height={26} />
              </Box>
              <ListItemText
                primary={t(`landing.${item}`)}
                sx={{ textWrap: { md: "nowrap" }, color: "#fff", fontSize: "18px", textAlign: { xs: "center", md: "start" } }}
              />
            </ListItem>
          ))}
        </List> */}
          </Box>
          <Box sx={{ alignSelf: { xs: "center", md: "start" } }}>
            <SpecialLink
              label={t("bookNow")}
              size="lg"
              color="#fff"
              width="max-content"
              locale={locale}
              href="/booking-an-appointment"
              step="0"
            />
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          position: { xs: "relative", md: "absolute" },
          bottom: { xs: "auto", md: 0 },
          "[dir=rtl] &": { left: { xs: "auto", md: "10px" } },
          "[dir=ltr] &": { right: { xs: "auto", md: "10px" } },
          mt: { xs: 2, md: 0 },
          display: { xs: "flex" },
          justifyContent: "center",
          textAlign: { xs: "center", md: "right" },
        }}
      >
        <Image src={HEROIMAGE} alt="Doctor" style={{ maxWidth: "100%", height: "auto" }} />
        {/* <Image
          src={`data:image/png;base64,${data?.data.image}`}
          alt="Doctor"
          style={{ maxWidth: "100%", height: "auto" }}
          width={500}
          height={500}
        /> */}
      </Grid>
    </Grid>
  );
}

interface WelcomeProps {
  locale: any;
  data: MedicalCenterInfo;
}
