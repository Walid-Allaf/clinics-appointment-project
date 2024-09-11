"use client";
import { Box, Grid } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import BranchCard from "./BranchCard";
import { AllClinic } from "@/src/api/types";

export default function BranchesSlider({ locale, slides }: BranchesSliderProps) {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2.5, justifyContent: "center" }}>
      <Box className="custom-swiper" sx={{ textAlign: "center", width: "100%" }}>
        {slides.data.results.length > 0 ? (
          <Swiper
            loop
            centeredSlides={true}
            // autoplay={{
            //   delay: 2500,
            //   disableOnInteraction: false,
            // }}
            pagination={{ el: ".swiper-custom-pagination", clickable: true }}
            navigation={{ nextEl: ".arrow-left", prevEl: ".arrow-right" }}
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={20}
            breakpoints={{ 0: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 992: { slidesPerView: 3 }, 1440: { slidesPerView: 4 } }}
          >
            {slides.data.results.length > 4 ? (
              slides.data.results.map((item, index) => (
                <SwiperSlide key={index}>
                  <BranchCard
                    title={locale === "ar" ? item.clinicName : item.clinicNameEn}
                    description={locale === "ar" ? item.clinicDescription : item.clinicDescriptionEn}
                    image={item.clinicImage}
                    locale={locale}
                  />
                </SwiperSlide>
              ))
            ) : (
              <></>
            )}
          </Swiper>
        ) : (
          "no slides"
        )}

        <Grid spacing={2} container>
          {slides.data.results.length <= 4 &&
            slides.data.results.length > 0 &&
            slides.data.results.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <BranchCard
                  title={locale === "ar" ? item.clinicName : item.clinicNameEn}
                  description={locale === "ar" ? item.clinicDescription : item.clinicDescriptionEn}
                  image={item.clinicImage}
                  locale={locale}
                />
              </Grid>
            ))}
        </Grid>

        {/* *** CONTROLES *** */}
        {slides.data.results.length > 4 && (
          <div className="navigation-buttons">
            <button className="arrow-left arrow">
              {locale == "en" ? <ArrowBackIcon sx={{ color: "#fff" }} /> : <ArrowForwardIcon sx={{ color: "#fff" }} />}
            </button>
            <div className="swiper-custom-pagination" />
            <button className="arrow-right arrow">
              {locale == "en" ? <ArrowForwardIcon sx={{ color: "#fff" }} /> : <ArrowBackIcon sx={{ color: "#fff" }} />}
            </button>
          </div>
        )}
      </Box>
    </Box>
  );
}

interface BranchesSliderProps {
  locale: any;
  slides: AllClinic;
}
