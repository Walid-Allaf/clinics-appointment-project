import { SpecialtiesItems } from "@/src/constants";
import { Box, Typography } from "@mui/material";
import SpecialtyCard from "./SpecialtyCard";
import initTranslations from "@/src/app/i18n";

export default async function Specialties({ locale }: any) {
  const { t } = await initTranslations(locale, ["specialties"]);
  return (
    <Box component={"section"} sx={{ px: 8, py: 8 }}>
      <Typography
        color={"primary"}
        sx={{ fontSize: "32px", fontWeight: "600", lineHeight: "40px", textAlign: "center", mb: 5 }}
      >
        {t("title")}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2.5,
          justifyContent: "center",
        }}
      >
        {SpecialtiesItems.map((item, index) => {
          return <SpecialtyCard item={item} key={index} locale={locale} />;
        })}
      </Box>
    </Box>
  );
}
