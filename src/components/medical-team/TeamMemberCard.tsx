"use client";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { SpecialLink } from "..";
import { TeamMember } from "@/src/types";
import { useTranslation } from "react-i18next";

export default function TeamMemberCard(teamMemberData: TeamMember) {
  const { name, description, specialty, specialtyImg, teamMemberImg, locale } = teamMemberData;
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        maxWidth: 345,
        mx: "auto",
        my: 3,
        position: "relative",
        background: "linear-gradient(180deg, #F1F1F1 -26.98%, #004B71 100%)",
      }}
    >
      <Box
        sx={{
          px: 3,
          "&:before": {
            content: '""',
            position: "absolute",
            top: -1,
            left: "50%",
            transform: "translateX(-50%)",
            width: "102%",
            height: "50px",
            background: "#ffffff",
            zIndex: 1,
          },
        }}
      >
        <Image
          alt={name}
          src={teamMemberImg}
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            zIndex: 2,
          }}
        />
      </Box>
      <Box
        sx={{
          position: "relative",
          background: "#004B71",
          color: "#fff",
          px: 2,
          pt: 8,
          pb: 4,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          textAlign: "start",
        }}
      >
        <Image
          alt={name}
          src={specialtyImg}
          width={100}
          height={100}
          style={{
            position: "absolute",
            top: "-50px",
            zIndex: 2,
          }}
        />
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "20px",
            width: "max-content",
          }}
        >
          {specialty}
        </Typography>
        <Typography gutterBottom sx={{ fontSize: "20px", fontWeight: 500, lineHeight: "25px" }}>
          {name}
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "12px", fontWeight: 400, lineHeight: "15px" }}>
          {description}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <SpecialLink
            href="/doctor-information/doctor-name"
            size="lg"
            width="100%"
            label={t("viewProfile")}
            background="#fff"
            locale={locale}
          />
        </Box>
      </Box>
    </Box>
  );
}
