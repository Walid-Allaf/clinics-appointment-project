import { RANDOMDOCTOR, SPECIALTYIMAGE1, TEAMMEMBER1 } from "@/src/assets";
import { TeamMemberCard, Title } from "@/src/components";
import { Container, Grid } from "@mui/material";
import initTranslations from "../../i18n";

export default async function Doctors({ params: { locale } }: any) {
  const { t } = await initTranslations(locale, ["doctors"]);
  return (
    <Container sx={{ marginTop: 4 }}>
      <Title text={t("title")} />
      <Grid container spacing={2} maxWidth="100%">
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TeamMemberCard
            name={t("randomDoctorName")}
            description={t("randomDescription")}
            specialty={t("specialty")}
            specialtyImg={SPECIALTYIMAGE1}
            teamMemberImg={RANDOMDOCTOR}
            locale={locale}
          />
        </Grid>
        {[1, 2, 3, 4, 5, 6, 7].map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item}>
            <TeamMemberCard
              name={t("doctorName")}
              description={t("description")}
              specialty={t("specialty")}
              specialtyImg={SPECIALTYIMAGE1}
              teamMemberImg={TEAMMEMBER1}
              locale={locale}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
