import { Box, Typography } from "@mui/material";
import MedicalTeamSlider from "./MedicalTeamSlider";
import initTranslations from "@/src/app/i18n";
import { AllDoctor } from "@/src/api/types";

export default async function MedicalTeam({ locale, data }: MedicalTeamProps) {
  const { t } = await initTranslations(locale, ["medical-team"]);
  return (
    <Box component={"section"} sx={{ px: { xs: 2, md: 8 }, py: 10 }}>
      <Typography color={"primary"} sx={{ fontSize: "32px", fontWeight: "600", lineHeight: "40px", textAlign: "center", mb: 5 }}>
        {t("sectionTitle")}
      </Typography>

      <MedicalTeamSlider locale={locale} data={data} />
    </Box>
  );
}

interface MedicalTeamProps {
  locale: any;
  data: AllDoctor;
}
