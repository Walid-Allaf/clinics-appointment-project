"use client";
import { statistic } from "@/src/types";
import { Box, Typography, Divider } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function NumberItem(props: statistic) {
  const { title, start, number, timer = 50 } = props;
  const [state, setstate] = useState(0);
  const ref = useRef(start);
  const accumulator = number / 200;
  const updateCounterState = () => {
    if (ref.current < number) {
      const result = Math.ceil(ref.current + accumulator);
      if (result > number) return setstate(number);
      setstate(result);
      ref.current = result;
    }
    setTimeout(updateCounterState, timer);
  };
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      updateCounterState();
    }
    // return () => (isMounted = false);
  }, [number, start]);
  return (
    <>
      <Box
        className="boxx"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          "& p": { color: "#fff", textAlign: "center", textWrap: "nowrap" },
          gap: 2,
          px: { xs: 4, md: 6 },
          py: 3,
        }}
      >
        <Typography sx={{ fontSize: "36px", fontWeight: 700, lineHeight: "45px" }}>
          +{state}
        </Typography>
        <Typography sx={{ fontSize: "25px", fontWeight: 400, lineHeight: "37.5px" }}>
          {title}
        </Typography>
      </Box>
      <Box className="divider" sx={{ width: "1px", height: "75px" }}></Box>
    </>
  );
}
