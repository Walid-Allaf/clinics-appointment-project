"use client";
import { Box, Grid } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import TeamMemberCard from "./TeamMemberCard";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AllDoctor } from "@/src/api/types";
import { SPECIALTYIMAGE1 } from "@/src/assets";

export default function MedicalTeamSlider({ locale, data }: MedicalTeamSliderProps) {
  return (
    <Box className="custom-swiper-team" sx={{ textAlign: "center", width: "100%" }}>
      {data.data.results.length > 0 && data.data.results.length > 4 ? (
        <Swiper
          loop
          centeredSlides={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          modules={[Autoplay, Pagination, Navigation]}
          navigation={{ nextEl: ".arrow-left", prevEl: ".arrow-right" }}
          pagination={{ el: ".swiper-custom-pagination-team", clickable: true }}
          spaceBetween={20}
          breakpoints={{ 0: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 992: { slidesPerView: 3 }, 1440: { slidesPerView: 4 } }}
        >
          {data.data.results.map((member, index) => {
            const { doctorName, doctorNameEn, doctorDescription, doctorDescriptionEn, doctorImage, doctorSpecialty, doctorId } = member;
            return (
              <SwiperSlide key={doctorId}>
                <TeamMemberCard
                  name={locale === "ar" ? doctorName : doctorNameEn}
                  description={locale === "ar" ? doctorDescription : doctorDescriptionEn}
                  specialty={locale === "ar" ? doctorSpecialty.specialtyName : doctorSpecialty.specialtyNameEn}
                  specialtyImg={SPECIALTYIMAGE1}
                  teamMemberImg={doctorImage}
                  locale={locale}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <></>
      )}

      <Grid container spacing={2} sx={{ "& div": { height: "auto" } }}>
        {data.data.results.length > 0 && data.data.results.length <= 4 ? (
          data.data.results.map((member, index) => {
            const { doctorName, doctorNameEn, doctorDescription, doctorDescriptionEn, doctorImage, doctorSpecialty, doctorId } = member;
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={doctorId}>
                <TeamMemberCard
                  name={locale === "ar" ? doctorName : doctorNameEn}
                  description={locale === "ar" ? doctorDescription : doctorDescriptionEn}
                  specialty={locale === "ar" ? doctorSpecialty.specialtyName : doctorSpecialty.specialtyNameEn}
                  specialtyImg={SPECIALTYIMAGE1}
                  teamMemberImg={doctorImage}
                  locale={locale}
                />
              </Grid>
            );
          })
        ) : (
          <></>
        )}
      </Grid>

      {/* *** CONTROLES *** */}
      {data.data.results.length > 0 && (
        <div className="navigation-buttons">
          <button className="arrow-left arrow">
            {locale == "en" ? <ArrowBackIcon sx={{ color: "#fff" }} /> : <ArrowForwardIcon sx={{ color: "#fff" }} />}
          </button>
          <div className="swiper-custom-pagination-team" />
          <button className="arrow-right arrow">
            {locale == "en" ? <ArrowForwardIcon sx={{ color: "#fff" }} /> : <ArrowBackIcon sx={{ color: "#fff" }} />}
          </button>
        </div>
      )}
    </Box>
  );
}

interface MedicalTeamSliderProps {
  locale: any;
  data: AllDoctor;
}
