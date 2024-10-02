"use client";
import Link from "next/link";
import Image from "next/image";
import { SPECIALTYCARDVECTOR } from "@/src/assets";
import { Box, Typography } from "@mui/material";
import { SpecialtiesItem } from "@/src/types";
import { useTranslation } from "react-i18next";

export default function SpecialtyCard(props: { item: Specialty; locale: any }) {
  const {
    item: { id, name, nameEn },
    locale,
  } = props;
  const { t } = useTranslation();
  return (
    <Box
      component={Link}
      href={"#"}
      key={id}
      sx={{
        width: { xs: "169px", md: "253px" },
        height: { xs: "169px", md: "239px" },
        display: "flex",
        position: "relative",
        background: "#004B71",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <Image
        src={SPECIALTYCARDVECTOR}
        alt="specialty-card-vector"
        width={200}
        height={200}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
      <Box
        sx={{
          display: "grid",
          placeItems: "center",
          width: "100%",
          position: "relative",
          zIndex: 10,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          {/* <Box sx={{ width: { xs: width - 18, md: width }, height: { xs: height - 18, md: height } }}>
            <Image src={icon} alt={text} objectFit="cover" />
          </Box> */}
          <Typography
            sx={{
              fontSize: { xs: "20px", md: "24px" },
              fontWeight: 500,
              lineHeight: "29.26px",
              color: "#fff",
            }}
          >
            {locale === "ar" ? name : nameEn}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
