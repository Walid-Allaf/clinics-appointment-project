import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function SpecialButton(props: { label: string; size: "lg" | "sm"; width?: string }) {
  const { label, size, width } = props;
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
      <ArrowForwardIcon />
    </Button>
  );
}
