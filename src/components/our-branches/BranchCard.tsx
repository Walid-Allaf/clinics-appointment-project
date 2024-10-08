"use client";
import { Box, Typography, Stack } from "@mui/material";
import { Img, SpecialLink } from "..";
import { Branches } from "@/src/types";
import { useTranslation } from "react-i18next";

export default function BranchCard(props: Branches) {
  const { title, description, image, locale } = props;
  const { t } = useTranslation();

  return (
    <Stack
      direction={"column"}
      gap={3}
      sx={{ background: "#004B71", p: 2, borderRadius: "8px", "& p": { textAlign: "start" }, height: "100%" }}
    >
      <Box sx={{ "& img": { width: { xs: "100%", sm: 340 }, height: { xs: "100%", sm: 250 } } }}>
        <Img imageData={image} width={340} height={250} />
      </Box>
      <Typography color="secondary" sx={{ fontSize: "20px", lineHeight: "28px", textWrap: "nowrap" }}>
        {title}
      </Typography>
      <Typography color="#fff" sx={{ fontSize: "14px", lineHeight: "17.5px", mb: 1 }}>
        {description}
      </Typography>
      <SpecialLink label={t("viewMore")} size="lg" background="#fff" locale={locale} href="/booking-an-appointment" step="0" />
    </Stack>
  );
}
