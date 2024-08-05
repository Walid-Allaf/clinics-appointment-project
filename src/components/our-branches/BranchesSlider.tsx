"use client";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Branches } from "@/src/types";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import BranchCard from "./BranchCard";

export default function BranchesSlider(props: { slides: Array<Branches> }) {
  const { slides } = props;

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2.5,
        justifyContent: "center",
      }}
    >
      <Box className="custom-swiper" sx={{ textAlign: "center", width: "100%" }}>
        <Swiper
          loop
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            el: ".swiper-custom-pagination",
            clickable: true,
          }}
          navigation={{ nextEl: ".arrow-left", prevEl: ".arrow-right" }}
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={20}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            992: {
              slidesPerView: 3,
            },
            1440: {
              slidesPerView: 4,
            },
          }}
        >
          {slides.length > 0
            ? slides.map((item, index) => (
                <SwiperSlide key={index}>
                  <BranchCard
                    title={item.title}
                    description={item.description}
                    image={item.image}
                  />
                </SwiperSlide>
              ))
            : "no slides"}
        </Swiper>

        {/* *** CONTROLES *** */}
        <div className="navigation-buttons">
          <button className="arrow-left arrow">
            <ArrowBackIcon sx={{ color: "#fff" }} />
          </button>
          <div className="swiper-custom-pagination" />
          <button className="arrow-right arrow">
            <ArrowForwardIcon sx={{ color: "#fff" }} />
          </button>
        </div>
      </Box>
    </Box>
  );
}
