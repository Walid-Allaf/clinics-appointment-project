import { CHECK } from "@/src/assets";
import { Box, Typography, List, ListItem, ListItemText, Button } from "@mui/material";
import Image from "next/image";

export default function Welcome() {
  const Features = [
    "A wide network of doctors and clinics",
    "Easy search and booking",
    "Trusted patient experiences",
  ];

  return (
    <Box
      component="div"
      sx={{
        "& p": { color: "#fff" },
        display: "flex",
        flexDirection: "column",
        gap: 3,
        flex: 1,
      }}
    >
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: 500,
          lineHeight: "25px",
        }}
      >
        Welcome to [site name]
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: "28px", md: "36px" },
          fontWeight: 600,
          lineHeight: { xs: "38px", md: "45px" },
          // textWrap: { md: "nowrap" },
        }}
      >
        Start your health journey with us today!
        <br /> With the [site name]
      </Typography>
      <Typography
        sx={{
          fontWeight: 500,
          lineHeight: "19.36px",
        }}
      >
        We connect you with the best doctors and clinics in your area.
        <br /> Whether you need a dentist, pediatrician, or cardiologist, <br />
        ou r platform makes booking appointments easy and reliable.
      </Typography>

      <Box>
        <List sx={{}}>
          {Features.map((item) => (
            <ListItem
              key={item}
              disablePadding
              sx={{ display: "flex", gap: 1, alignItems: "center" }}
            >
              <Image src={CHECK} alt="check-icon" width={26} height={26} />
              <ListItemText primary={item} sx={{ textWrap: "nowrap", color: "#3FBDE6" }} />
            </ListItem>
          ))}
        </List>
      </Box>

      <Button sx={{ p: "14px 70px 14px 70px", alignSelf: "flex-start" }}>Book Now</Button>
    </Box>
  );
}
