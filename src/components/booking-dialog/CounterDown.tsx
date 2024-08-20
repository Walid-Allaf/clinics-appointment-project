"use client";
import { Typography, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useTimer } from "react-timer-hook";

export default function CounterDown({ expiryTimestamp }: any) {
  const { replace } = useRouter();

  // https://www.npmjs.com/package/react-timer-hook
  const { totalSeconds, seconds, minutes, hours, days, isRunning, start, pause, resume, restart } =
    useTimer({ expiryTimestamp, onExpire: () => replace("/") });

  return (
    <Box sx={{ textAlign: "center", margin: "auto", bgcolor: "#005F8EE5", p: 1 }}>
      <Typography color={seconds <= 10 ? "error.main" : "#fff"} fontSize={14}>
        سيتم إلغاء حجزك خلال: {minutes}:{seconds} إذا لم تقم بإكمال المعلومات
      </Typography>
    </Box>
  );
}
