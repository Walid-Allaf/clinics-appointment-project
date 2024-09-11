import { Box, Typography } from "@mui/material";
import SpecialtyCard from "./SpecialtyCard";
import initTranslations from "@/src/app/i18n";
import { AllSpecialty } from "@/src/api/types";

export default async function Specialties({ locale, data }: SpecialtiesProps) {
  const { t } = await initTranslations(locale, ["specialties"]);
  return (
    <Box component={"section"} sx={{ px: { xs: 1, sm: 4, md: 8 }, py: 8 }}>
      <Typography color={"primary"} sx={{ fontSize: "32px", fontWeight: "600", lineHeight: "40px", textAlign: "center", mb: 5 }}>
        {t("title")}
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2.5, justifyContent: "center" }}>
        {data.data.results.map((item, index) => {
          return <SpecialtyCard item={item} key={index} locale={locale} />;
        })}
      </Box>
    </Box>
  );
}

interface SpecialtiesProps {
  locale: any;
  data: AllSpecialty;
}
