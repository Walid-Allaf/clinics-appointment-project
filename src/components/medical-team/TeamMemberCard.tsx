"use client";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import { Img, SpecialLink } from "..";
import { useTranslation } from "react-i18next";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function TeamMemberCard(props: any) {
  const { name, description, specialty, specialtyImg, teamMemberImg, locale, next } = props;
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        maxWidth: 390,
        mx: "auto",
        my: 3,
        position: "relative",
        background: "linear-gradient(180deg, #F1F1F1 -26.98%, #004B71 100%)",
        minHeight: 500,
        height: "100%",
      }}
    >
      <Box
        sx={{
          overflow: "hidden",
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
        <Box
          sx={{
            "& img": { width: "100%", height: "auto", position: "relative", bottom: "-5px", zIndex: 2, aspectRatio: "1 / 1.2" },
            px: 2,
          }}
        >
          {typeof teamMemberImg === "string" ? (
            <Img imageData={teamMemberImg} width={0} height={0} />
          ) : (
            <Image src={teamMemberImg} alt="team-member-img" />
          )}
        </Box>
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
          height: "100%",
        }}
      >
        <Image alt={name} src={specialtyImg} width={100} height={100} style={{ position: "absolute", top: "-50px", zIndex: 2 }} />
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "20px",
            width: "max-content",
            color: "#00C0FF",
            position: "relative",
            minHeight: 20,
          }}
        >
          <Box
            component={"span"}
            sx={{
              position: "absolute",
              bottom: "-10px",
              "[dir=ltr]": { right: "0px" },
              "[dir=rtl]": { left: "0px" },
              background: "#00C0FF",
              width: "150%",
              height: "2px",
            }}
          ></Box>
          {specialty}
        </Typography>
        <Typography gutterBottom sx={{ fontSize: "20px", fontWeight: 500, lineHeight: "25px", minHeight: 25 }}>
          {name}
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "12px", fontWeight: 400, lineHeight: "15px", minHeight: 45 }}>
          {description}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {next ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={next}
              sx={{
                color: "#004B71",
                // width: "auto",
                width: "100%",
                // display: "flex",
                // alignItems: "center",
                // justifyContent: "center",
                // gap: 1,
                borderRadius: "100px",
                textDecoration: "none",
                p: {
                  xs: "14px 40px 14px 40px",
                  lg: "14px 30px 14px 30px",
                },
                textWrap: "nowrap",
                cursor: "pointer",
                transition: ".3s ease-out",
                // background: "#3FBDE6",
                // "&:hover": {
                //   background: "#3fbde6bb",
                // },
                boxShadow: " 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)",
                position: "relative",
                zIndex: 99,
              }}
            >
              <Typography sx={{ fontSize: "18px", fontWeight: 500, lineHeight: "20.09px" }}>{t("viewProfile")}</Typography>
              {locale == "en" ? <ArrowForwardIcon htmlColor={"#004B71"} /> : <ArrowBackIcon htmlColor={"#004B71"} />}
            </Button>
          ) : (
            <SpecialLink
              href="/booking-an-appointment"
              step="3"
              size="lg"
              width="100%"
              label={t("viewProfile")}
              background="#fff"
              locale={locale}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
