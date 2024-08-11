import { BranchCard, Title } from "@/src/components";
import { Container, Grid } from "@mui/material";
import initTranslations from "../../i18n";
import { Branches } from "@/src/constants";

export default async function Clinics({ params: { locale } }: any) {
  const { t } = await initTranslations(locale, ["clinics"]);
  return (
    <Container sx={{ marginTop: 4 }}>
      <Title text={t("title")} />

      <Grid
        container
        spacing={2}
        maxWidth="100%"
        mb={4}
        justifyContent={"center"}
        direction={{ xs: "column-reverse", sm: "row" }}
      >
        {Branches.map((item, index) => (
          <Grid item xs={12} sm={5} md={4} lg={3} sx={{ minHeight: "500px" }} key={index}>
            <BranchCard
              title={item.title}
              description={item.description}
              image={item.image}
              locale={locale}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
