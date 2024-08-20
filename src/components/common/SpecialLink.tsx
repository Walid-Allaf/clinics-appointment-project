"use client";
import { Typography, Box } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SpecialLink(props: {
  href: string;
  step: string;
  label: string;
  size: "lg" | "sm";
  width?: string;
  locale: any;
  background?: string;
  color?: string;
}) {
  const { href, step, label, size, width, locale, background, color } = props;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const params = new URLSearchParams(searchParams);

  return (
    <Box
      onClick={() => {
        params.set("step", step);
        console.log(params.toString());
        if (href === "/booking-an-appointment") {
          push(`${href}?${params.toString()}`);
        } else {
          push(`${href}`);
        }
      }}
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
        cursor: "pointer",
        transition: ".3s ease-out",
        background: background ? background : "#3FBDE6",
        "&:hover": {
          background: "#3fbde6bb",
        },
        boxShadow:
          " 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)",
        position: "relative",
        zIndex: 99,
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
