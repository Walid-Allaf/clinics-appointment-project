import { Box, Typography } from "@mui/material";

export default function Title({ text }: any) {
  return (
    <Box sx={{ width: "100%", position: "relative", mt: 6, mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "&:before": {
            content: "''",
            position: "absolute",
            top: "50%",
            left: 0,
            transform: "translatey(-50%)",
            width: "100%",
            height: "4px",
            background: "#004B71",
            zIndex: -1,
          },
        }}
      >
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: 600,
            lineHeight: "28px",
            textAlign: "center",
            width: "max-content",
            background: "#fff",
            position: "relative",
            zIndex: 2,
            p: 1,
            color: "#004B71",
          }}
        >
          {text}
        </Typography>
      </Box>
    </Box>
  );
}
