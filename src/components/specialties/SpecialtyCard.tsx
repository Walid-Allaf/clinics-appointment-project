import Link from "next/link";
import Image from "next/image";
import { SPECIALTYCARDVECTOR } from "@/src/assets";
import { Box, Typography } from "@mui/material";
import { SpecialtiesItem } from "@/src/types";
import initTranslations from "@/src/app/i18n";

export default async function SpecialtyCard(props: { item: SpecialtiesItem; locale: any }) {
  const {
    item: { text, icon, path, width, height },
    locale,
  } = props;
  const { t } = await initTranslations(locale, ["specialties"]);
  return (
    <Box
      component={Link}
      href={path}
      key={text}
      sx={{
        width: "253px",
        height: "239px",
        display: "flex",
        position: "relative",
        background: "#004B71",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <Image
        src={SPECIALTYCARDVECTOR}
        alt="specialty-card-vector"
        width={200}
        height={200}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
      <Box
        sx={{
          display: "grid",
          placeItems: "center",
          width: "100%",
          position: "relative",
          zIndex: 10,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <Image src={icon} alt={text} width={width} height={height} />
          <Typography
            sx={{ fontSize: "24px", fontWeight: 500, lineHeight: "29.26px", color: "#fff" }}
          >
            {t(text)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
