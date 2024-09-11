import { Box, Typography } from "@mui/material";
import { Branches } from "@/src/types";
import BranchesSlider from "./BranchesSlider";
import initTranslations from "@/src/app/i18n";
import { AllClinic } from "@/src/api/types";

export default async function OurBranches({ slides, locale }: OurBranchesProps) {
  const { t } = await initTranslations(locale, ["our-branches"]);
  return (
    <Box component={"section"} sx={{ px: { xs: 2, md: 8 }, py: 10 }}>
      <Typography color={"primary"} sx={{ fontSize: "32px", fontWeight: "600", lineHeight: "40px", textAlign: "center", mb: 5 }}>
        {t("title")}
      </Typography>

      <BranchesSlider slides={slides} locale={locale} />
    </Box>
  );
}

interface OurBranchesProps {
  locale: any;
  slides: AllClinic;
}
