"use client";
import { CHECK } from "@/src/assets";
import { Box, Typography, List, ListItem, ListItemText, Button } from "@mui/material";
import Image from "next/image";
import SpecialButton from "../common/SpecialButton";
import { useTranslation } from "react-i18next";

export default function Welcome({ locale }: any) {
  const { t } = useTranslation();
  const Features = ["feature1", "feature2", "feature3"];

  return (
    <Box
      component="div"
      sx={{
        "& p": { color: "#fff" },
        display: "flex",
        flexDirection: "column",
        gap: 3,
        flex: 1,
      }}
    >
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: 500,
          lineHeight: "25px",
        }}
      >
        {t("landing.welcome")}
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: "28px", md: "32px", lg: "36px" },
          fontWeight: 600,
          lineHeight: { xs: "38px", md: "45px" },
          // textWrap: { md: "nowrap" },
        }}
      >
        {t("landing.title")}
      </Typography>
      {/* <Typography
        sx={{
          fontWeight: 500,
          lineHeight: "19.36px",
        }}
      >
        We connect you with the best doctors and clinics in your area.
        <br /> Whether you need a dentist, pediatrician, or cardiologist, <br />
        ou r platform makes booking appointments easy and reliable.
      </Typography> */}

      <Box>
        <List sx={{}}>
          {Features.map((item) => (
            <ListItem
              key={item}
              disablePadding
              sx={{ display: "flex", gap: 1, alignItems: "center" }}
            >
              <Image src={CHECK} alt="check-icon" width={26} height={26} />
              <ListItemText
                primary={t(`landing.${item}`)}
                sx={{ textWrap: { md: "nowrap" }, color: "#3FBDE6", textAlign: "start" }}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <SpecialButton label={t("bookNow")} size="lg" locale={locale} />
    </Box>
  );
}
