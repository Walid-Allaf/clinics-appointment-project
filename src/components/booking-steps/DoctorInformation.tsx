"use client";
import { apiRoutes, axios } from "@/src/api";
import { Doctor } from "@/src/api/types";
import { BookingDialog, Img, Loading } from "@/src/components";
import { Container, Box, Typography, Card, CardContent, Button } from "@mui/material";
import { AxiosResponse } from "axios";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useTranslation } from "react-i18next";

const DoctorInformation = ({ locale, doctorId, serviceId }: any) => {
  const [open, setOpen] = React.useState({ open: false, doctorId: "", bookingKind: 0, serviceId: "" });
  const [loading, setLoading] = React.useState<boolean>(true);
  const [doctorDetails, setDoctorDetails] = React.useState<Doctor>();
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const getDoctorDetails = async () => {
    setLoading(true);
    await axios
      .get(apiRoutes.website.GetDoctor(doctorId || params.get("doctorId") || ""))
      .then((response: AxiosResponse<Doctor, any>) => {
        setDoctorDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error.message);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    getDoctorDetails();
    console.log("doctorId", doctorId);
  }, []);
  return (
    <Box>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Box sx={{ background: "#004B71", py: 6, width: "100%", color: "#fff" }}>
            <Container maxWidth="lg">
              <Box sx={{ maxWidth: { xs: "100%", md: "60%" }, mb: { xs: 15, md: 0 } }}>
                <Typography variant="h6" gutterBottom>
                  {t("doctorDetailes.aboutUs")}
                </Typography>
                <Typography variant="h4" sx={{ fontSize: "48px", fontWeight: 500, lineHeight: "60px" }} gutterBottom>
                  {locale === "ar" ? doctorDetails?.data.name : doctorDetails?.data.name}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontSize: "16px", fontWeight: 500, lineHeight: "24px", minHeight: 70 }} gutterBottom>
                  {locale === "ar" ? doctorDetails?.data.simpleDescription : doctorDetails?.data.simpleDescriptionEn}
                </Typography>
              </Box>
            </Container>
          </Box>

          <Container sx={{ display: { xs: "grid", md: "block" }, placeItems: "center" }}>
            <Box
              display={"flex"}
              gap={6}
              flexDirection={{ xs: "column-reverse", md: "row" }}
              sx={{ marginTop: 2, justifyContent: "space-between" }}
              maxWidth="100%"
            >
              <Box sx={{ mt: { xs: -15, md: 0 }, flex: 2 }}>
                <Typography component="h2" sx={{ fontSize: "32px", fontWeight: 700, lineHeight: "38.73px" }} gutterBottom>
                  {t("doctorDetailes.aboutTheDoctor")}
                </Typography>
                <Box sx={{ fontSize: "18px", fontWeight: 400, lineHeight: "21.78px" }}>
                  <Typography variant="body1" paragraph>
                    {locale === "ar" ? doctorDetails?.data.simpleDescription : doctorDetails?.data.simpleDescriptionEn}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {locale === "ar" ? doctorDetails?.data.description : doctorDetails?.data.descriptionEn}
                  </Typography>
                  {/* <Typography variant="body1" paragraph>
                    Throughout his over 15-year career, Dr. Stevens has worked in several prestigious hospitals, including [Hospital Name]
                    and [Hospital Name], where he held leadership positions and contributed to the development of innovative treatment
                    programs. He is known for his precise diagnostic skills and ability to provide effective treatment solutions for his
                    patients, including complex surgical and interventional procedures.
                  </Typography>
                  <Typography variant="body1" paragraph>
                    In addition to his clinical work, Dr. Stevens regularly participates in global medical conferences as a keynote speaker,
                    presenting the latest research and discoveries in cardiology. He has numerous published studies in peer-reviewed
                    international medical journals, covering diverse topics such as:
                  </Typography> */}
                  {/* <Box sx={{ fontSize: "16px", fontWeight: 500, lineHeight: "24px" }}>
                    <ul>
                      <li>Diagnosis and treatment of coronary artery diseases</li>
                      <li>Utilization of modern technology in monitoring and treating cardiac patients</li>
                      <li>Development of preventive strategies to reduce cardiovascular diseases</li>
                    </ul>
                  </Box> */}
                  {/* <Typography variant="body1" paragraph>
                    Dr. Stevens is an active member of several global medical societies, including the American Heart Association and the
                    European Society of Cardiology, reflecting his ongoing commitment to advancing the field of cardiology both locally and
                    internationally.
                  </Typography> */}
                </Box>
              </Box>
              <Box sx={{ flex: 0.9 }}>
                <Card sx={{ padding: 2, borderRadius: "12px", position: "relative", bottom: 150 }}>
                  <Box sx={{ position: "relative", bottom: 8, display: "flex", justifyContent: "center" }}>
                    <Box
                      sx={{
                        width: "80%",
                        "&:before": {
                          content: "''",
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          width: "100%",
                          height: "94%",
                          background: "linear-gradient(180deg, #008FD7 -106.1%, #004B71 138.2%)",
                          borderRadius: "10px",
                          zIndex: 1,
                          overflow: "hidden",
                        },
                        "& img": { width: "100%", height: "auto", position: "relative", bottom: "-5px", zIndex: 2 },
                      }}
                    >
                      <Img imageData={doctorDetails?.data.image ?? ""} width={340} height={250} />
                    </Box>
                  </Box>
                  <CardContent
                    sx={{
                      "& p": {
                        display: "flex",
                        justifyContent: "space-between",
                        fontWeight: 500,
                        textWrap: { xs: "wrap", md: "nowrap" },
                        py: 2,
                        "&:not(:last-of-type)": {
                          borderBottom: "2px solid #CACACA",
                        },
                      },
                    }}
                  >
                    <Typography variant="body2">
                      <span>{t("doctorDetailes.speciality")}:</span>
                      <span>
                        {/* {locale === "ar"
                          ? doctorDetails?.data.doctorSpecialty.specialtyName
                          : doctorDetails?.data.doctorSpecialty.specialtyNameEn} */}
                      </span>
                    </Typography>
                    <Typography variant="body2">
                      <span>{t("doctorDetailes.department")}:</span>
                      {/* <span>{locale === "ar" ? doctorDetails?.data.clinic.clinicName : doctorDetails?.data.clinic.clinicNameEn}</span> */}
                    </Typography>
                    <Typography variant="body2">
                      <span>{t("doctorDetailes.branch")}:</span>
                      <span>
                        {/* {locale === "ar"
                          ? doctorDetails?.data.clinic.clinicCity.cityName
                          : doctorDetails?.data.clinic.clinicCity.cityNameEn} */}
                      </span>
                    </Typography>
                    <Typography variant="body2">
                      <span>{t("doctorDetailes.consultationDuration")}:</span>{" "}
                      <span>
                        {doctorDetails?.data.sessionTimeInMinutes}
                        {t("doctorDetailes.consultationDurationUnit")}
                      </span>
                    </Typography>
                    {/* <Typography variant="body2">
                      <span>Appointment Type:</span> <span>Scheduled</span>
                    </Typography> */}
                    <Typography variant="body2">
                      <span>{t("doctorDetailes.workingDays")}:</span>
                      <Box component={"span"} sx={{ display: "flex", flexDirection: "column" }}>
                        {/* {doctorDetails?.data.workingDays.map((day) => (
                          <span key={day.workDayId}>{locale === "ar" ? day.workDayName : day.workDayNameEn}</span>
                        ))} */}
                      </Box>
                    </Typography>
                    <Typography variant="body2">
                      <span>{t("doctorDetailes.workingHours")}:</span>
                      <Box component={"span"} sx={{ display: "flex", flexDirection: "column" }}>
                        {/* {doctorDetails?.data.workingDays.map((day) => (
                          <span key={day.workDayId}>{`${day.from.slice(11, 16)}-${day.to.slice(11, 16)}`}</span>
                        ))} */}
                      </Box>
                    </Typography>
                    <Box sx={{ mt: 4 }}>
                      <Button
                        fullWidth
                        onClick={() =>
                          setOpen({
                            open: true,
                            doctorId: doctorDetails?.data.id || "",
                            bookingKind: doctorDetails?.data.bookingKind || 0,
                            serviceId: serviceId || params.get("serviceId") || "",
                          })
                        }
                        variant="contained"
                        color="secondary"
                      >
                        {t("doctorDetailes.bookAppointment")}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </Container>
        </>
      )}
      {open.open && (
        <BookingDialog open={open} onClose={() => setOpen({ open: false, doctorId: "", bookingKind: 0, serviceId: "" })} locale={locale} />
      )}
    </Box>
  );
};

export default DoctorInformation;
