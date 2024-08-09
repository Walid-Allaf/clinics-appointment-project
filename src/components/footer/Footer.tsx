import { Box, Container, Typography, Grid, Link, Divider, IconButton, List } from "@mui/material";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";
import { Locations, QuickLinks } from "@/src/constants";
import LanguageChanger from "../common/LanguageChanger";
import initTranslations from "@/src/app/i18n";
import { Logo } from "..";

export default async function Footer({ locale }: any) {
  const { t } = await initTranslations(locale, ["footer"]);

  return (
    <Box sx={{ backgroundColor: "#004B71", color: "#fff", py: 4 }}>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          justifyContent="space-between"
          maxWidth="100%"
          sx={{
            textAlign: { xs: "center", sm: "start" },
            "& h6": {
              fontSize: "22px",
              fontWeight: 500,
              lineHeight: "22px",
              my: 3,
              // maxWidth: "max-content",
            },
          }}
        >
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", justifyContent: { xs: "center", sm: "flex-start" } }}>
              <Logo locale={locale} />
            </Box>

            <Typography variant="body2" sx={{ fontSize: "24px", lineHeight: "38px" }}>
              {t("description")}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom color="secondary">
                {t("followUs")}
              </Typography>
              <IconButton color="inherit" href="#">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" href="#">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" href="#">
                <Instagram />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={2} sx={{ "& a": { mb: 2 } }}>
            <Typography variant="h6" gutterBottom color="secondary">
              {t("quickLinks")}
            </Typography>
            {QuickLinks.map((link, index) => (
              <Link
                key={index}
                href={link.path}
                color="inherit"
                underline="hover"
                display="block"
                sx={{
                  // maxWidth: "max-content",
                  transition: ".3s ease-in-out",
                  "&:hover": {
                    paddingLeft: 2,
                  },
                }}
              >
                <Typography>{t(link.text)}</Typography>
              </Link>
            ))}
            <LanguageChanger />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom color="secondary">
              {t("locations")}
            </Typography>
            <List
              sx={{
                listStyleType: { xs: "none", md: "disc" },
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {Locations.map((loc, index) => (
                <Box component="li" key={index}>
                  <Typography>
                    {t(loc.branchNumber)}: {t(loc.branchName)}
                  </Typography>
                  <Link
                    href={loc.path}
                    color="inherit"
                    underline="hover"
                    display="block"
                    sx={{ fontSize: "13px", fontWeight: 400, lineHeight: "28px" }}
                  >
                    <Typography>{t("linkLabel")}</Typography>
                  </Link>
                </Box>
              ))}
            </List>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2, borderColor: "#fff" }} />
        <Typography variant="body2" align="center">
          &copy; 2024 | {t("allRightsReserved")}
        </Typography>
      </Container>
    </Box>
  );
}
