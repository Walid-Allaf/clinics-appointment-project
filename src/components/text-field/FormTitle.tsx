import { FormLabel } from "@mui/material";

export default function FormTitle({ title }: Title) {
  return <FormLabel sx={{ display: "block", mt: 1, mb: 0.3, fontSize: { xs: "16px", md: "18px" } }}>{title}</FormLabel>;
}

interface Title {
  title: string;
}
