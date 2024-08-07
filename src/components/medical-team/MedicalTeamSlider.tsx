"use client";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import TeamMemberCard from "./TeamMemberCard";
import { TeamMembers } from "@/src/constants";
import { TeamMember } from "@/src/types";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function MedicalTeamSlider({ locale }: any) {
  return (
    <Box className="custom-swiper-team" sx={{ textAlign: "center", width: "100%" }}>
      <Swiper
        loop
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        navigation={{ nextEl: ".arrow-left", prevEl: ".arrow-right" }}
        pagination={{
          el: ".swiper-custom-pagination-team",
          clickable: true,
        }}
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          992: { slidesPerView: 3 },
          1440: { slidesPerView: 4 },
        }}
      >
        {TeamMembers.map((member: TeamMember, index) => {
          const { name, description, specialty, specialtyImg, teamMemberImg } = member;
          return (
            <SwiperSlide key={index}>
              <TeamMemberCard
                name={name}
                description={description}
                specialty={specialty}
                specialtyImg={specialtyImg}
                teamMemberImg={teamMemberImg}
                locale={locale}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* *** CONTROLES *** */}
      <div className="navigation-buttons">
        <button className="arrow-left arrow">
          {locale == "en" ? (
            <ArrowBackIcon sx={{ color: "#fff" }} />
          ) : (
            <ArrowForwardIcon sx={{ color: "#fff" }} />
          )}
        </button>
        <div className="swiper-custom-pagination-team" />
        <button className="arrow-right arrow">
          {locale == "en" ? (
            <ArrowForwardIcon sx={{ color: "#fff" }} />
          ) : (
            <ArrowBackIcon sx={{ color: "#fff" }} />
          )}
        </button>
      </div>
    </Box>
  );
}
