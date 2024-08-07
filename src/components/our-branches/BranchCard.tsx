"use client";
import Image from "next/image";
import { Box, Typography, Stack } from "@mui/material";
import SpecialButton from "../common/SpecialButton";
import { Branches } from "@/src/types";
import { useTranslation } from "react-i18next";

export default function BranchCard(props: Branches) {
  const { title, description, image, locale } = props;
  const { t } = useTranslation();

  return (
    <Stack
      direction={"column"}
      gap={3}
      sx={{
        background: "#004B71",
        p: 2,
        borderRadius: "8px",
        "& p": {
          textAlign: "start",
        },
      }}
    >
      <Box
        sx={{
          "& img": {
            width: "100%",
            height: "100%",
            objectFit: "cover",
          },
        }}
      >
        <Image src={image} alt="slider-img" />
      </Box>
      <Typography
        color="secondary"
        sx={{ fontSize: "20px", lineHeight: "28px", textWrap: "nowrap" }}
      >
        {title}
      </Typography>
      <Typography color="#fff" sx={{ fontSize: "14px", lineHeight: "17.5px", mb: 1 }}>
        {description}
      </Typography>
      <SpecialButton label={t("viewMore")} size="lg" width="100%" locale={locale} />
    </Stack>
  );
}
