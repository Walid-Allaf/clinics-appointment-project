import { lang } from "@/src/types";
import { Typography, Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function Logo({ locale, logo, name, nameEn }: LogoProps) {
  return (
    <Box component={Link} href={"/"} sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, py: 1 }}>
      <Image src={"data:image/png;base64," + logo} alt="s" width={60} height={60} />
      <Typography
        color={"secondary"}
        sx={{ fontSize: { xs: "16px", md: "20px" }, fontWeight: 700, lineHeight: "30px", textWrap: "nowrap" }}
      >
        {locale === "ar" ? name : nameEn}
      </Typography>
    </Box>
  );
}
interface LogoProps {
  locale: lang;
  logo: string;
  name: string;
  nameEn: string;
}
