import { Typography, Box } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Link from "next/link";

export default function SpecialLink(props: {
  href?: string;
  label: string;
  size: "lg" | "sm";
  width?: string;
  locale: any;
  background?: string;
  color?: string;
}) {
  const { href, label, size, width, locale, background, color } = props;
  return (
    <Box
      component={Link}
      href={href || "#"}
      sx={{
        color: color ? color : "#004B71",
        width: width ? width : "auto",
        maxWidth: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        borderRadius: "100px",
        textDecoration: "none",
        p: {
          xs: size == "lg" ? "14px 40px 14px 40px" : "12px 40px 12px 40px",
          lg: size == "lg" ? "14px 30px 14px 30px" : "12px 40px 12px 40px",
        },
        textWrap: "nowrap",

        transition: ".3s ease-out",
        background: background ? background : "#3FBDE6",
        "&:hover": {
          background: "#3fbde6bb",
        },
      }}
    >
      <Typography sx={{ fontSize: "18px", fontWeight: 500, lineHeight: "20.09px" }}>
        {label}
      </Typography>

      {locale == "en" ? (
        <ArrowForwardIcon htmlColor={color ? color : "#004B71"} />
      ) : (
        <ArrowBackIcon htmlColor={color ? color : "#004B71"} />
      )}
    </Box>
  );
}
