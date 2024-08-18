import { LOGO } from "@/src/assets";
import { lang } from "@/src/types";
import { Typography, Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function Logo(props: { locale: lang }) {
  const { locale } = props;
  return (
    <Box
      component={Link}
      href={"/"}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, py: 1 }}
    >
      <Box component={Image} src={LOGO} alt="logo" width={60} height={60} />
      <Typography
        color={"secondary"}
        sx={{
          fontSize: "20px",
          fontWeight: 700,
          lineHeight: "30px",
          textWrap: "nowrap",
        }}
      >
        {locale === "en" ? "Al-Shifa Medical Clinic" : "عيادة الشفاء الطبية"}
      </Typography>
    </Box>
  );
}
