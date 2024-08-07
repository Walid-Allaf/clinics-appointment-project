import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function SpecialButton(props: {
  label: string;
  size: "lg" | "sm";
  width?: string;
  locale: any;
}) {
  const { label, size, width, locale } = props;
  return (
    <Button
      sx={{
        width: width ? width : "max-content",
        display: "flex",
        alignItems: "center",
        gap: 1,
        p: size == "lg" ? "14px 70px 14px 70px" : "12px 40px 12px 40px",
        textWrap: "nowrap",
        background: "#3FBDE6",
        "&:hover": {
          background: "#3fbde6bb",
        },
      }}
    >
      <span>{label}</span>
      {locale == "en" ? <ArrowForwardIcon /> : <ArrowBackIcon />}
    </Button>
  );
}
