"use client";
import { Statistics } from "@/src/constants";
import { Box, Typography } from "@mui/material";
import NumberItem from "./NumberItem";
import { statistic } from "@/src/types";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function IncreasingNumbers() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // When the section comes into view
      if (entry.isIntersecting) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
    // Start observing the section
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    // Cleanup: stop observing when component unmounts
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  return (
    <Box component={"section"} sx={{ background: "#004B71" }}>
      <Box
        ref={sectionRef}
        sx={{
          px: { xs: 0, md: 4 },
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          // Complex css code for numbers borders 😅
          "& .divider:not(:last-of-type)": { background: { xs: "transparent", md: "#fff" } },
          "[dir=ltr] & .boxx:nth-child(1)": {
            borderBottom: { xs: "1px solid #fff", md: "none" },
            borderRight: { sm: "1px solid #fff", md: "none" },
          },
          "[dir='rtl'] & .boxx:nth-child(1)": {
            borderBottom: { xs: "1px solid #fff", md: "none" },
            borderLeft: { sm: "1px solid #fff", md: "none" },
          },
          "& .boxx:nth-child(3)": { borderBottom: { xs: "1px solid #fff", md: "none" } },
          "[dir=ltr] & .boxx:nth-child(5)": {
            borderBottom: { xs: "1px solid #fff", md: "none" },
            borderRight: { sm: "1px solid #fff", md: "none" },
          },
          "[dir='rtl'] & .boxx:nth-child(5)": {
            borderBottom: { xs: "1px solid #fff", md: "none" },
            borderLeft: { sm: "1px solid #fff", md: "none" },
          },
        }}
      >
        {isVisible &&
          Statistics.map((statistic: statistic, index) => {
            const { title, number, timer, start } = statistic;
            return (
              <NumberItem key={index} start={0} title={t(title)} number={number} timer={timer} />
            );
          })}
      </Box>
    </Box>
  );
}
