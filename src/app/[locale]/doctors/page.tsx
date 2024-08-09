import { SPECIALTYIMAGE1, TEAMMEMBER1 } from "@/src/assets";
import { TeamMemberCard, Title } from "@/src/components";
import { Container, Grid } from "@mui/material";

export default function Doctors({ params, searchParams }: any) {
  return (
    <Container sx={{ marginTop: 4 }}>
      <Title text="Select a doctor" />
      <Grid container spacing={4} maxWidth="100%">
        {[1, 2, 3, 4, 5, 6, 7].map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item}>
            <TeamMemberCard
              name="The doctor's full name"
              description="With over 15 years of experience, [Doctor's Name] is based at [Clinic Name] in [City]. Specializing in advanced cardiac care and diagnostics, [he/she] is fluent in both English and Arabic."
              specialty="Medical specialty"
              specialtyImg={SPECIALTYIMAGE1}
              teamMemberImg={TEAMMEMBER1}
              locale={params.locale}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
