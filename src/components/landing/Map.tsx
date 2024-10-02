"use client";
import { Grid, Box, Typography } from "@mui/material";
import SpecialLink from "../common/SpecialLink";
import { Contact, WorkDays } from "@/src/constants";
import { useTranslation } from "react-i18next";
import ImageIcon from "@mui/icons-material/Image";

export default function Map({ locale, location }: any) {
  const { t } = useTranslation();
  return (
    <Box component={"section"} sx={{ px: { xs: 2, md: 8 }, py: 10 }}>
      <Typography
        sx={{
          fontSize: "24px",
          fontWeight: 600,
          lineHeight: "28px",
          textAlign: "center",
          width: "100%",
          background: "#fff",
          position: "relative",
          zIndex: 2,
          py: 4,
          color: "#004B71",
        }}
      >
        {t("specialityPage.mapTitle")}
      </Typography>
      <Grid container maxWidth="100%" mb={4} direction={{ xs: "column-reverse", sm: "row" }} flexWrap={"nowrap"}>
        <Grid item xs={12} sm={5} md={4} lg={3}>
          <Box
            sx={{
              background: "#004B71",
              width: "100%",
              height: "100%",
              color: "#fff",
              py: 4,
              px: 2,
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Typography sx={{ fontSize: "24px", fontWeight: 500, lineHeight: "28px", color: "#00D4FF" }}>
              {t("specialityPage.workDays")}
            </Typography>
            <Box>
              {WorkDays.map((workDay, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                    "& p": { fontSize: "12px", fontWeight: 500, lineHeight: "28px" },
                  }}
                >
                  <Typography>{t("specialityPage." + workDay.day)}</Typography>
                  <Typography>{workDay.time}</Typography>
                </Box>
              ))}
            </Box>
            <Typography sx={{ fontSize: "24px", fontWeight: 500, lineHeight: "28px", color: "#00D4FF" }}>
              {t("specialityPage.contactDetails")}
            </Typography>
            <Box>
              {Contact.map((contact, index) => (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }} key={index}>
                  <ImageIcon />
                  <Typography sx={{ fontSize: "12px", fontWeight: 500, lineHeight: "28px" }}>{contact}</Typography>
                </Box>
              ))}
            </Box>
            <SpecialLink
              label={t("specialityPage.bookAppointment")}
              locale={locale}
              size="lg"
              color="#fff"
              href="/booking-an-appointment"
              step="0"
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={7} md={8} lg={9} sx={{ "& iframe": { minHeight: { xs: "500px", sm: "100%" } }, minHeight: "500px" }}>
          <iframe src={location} height="100%" width="100%"></iframe>
        </Grid>
      </Grid>
    </Box>
  );
}
