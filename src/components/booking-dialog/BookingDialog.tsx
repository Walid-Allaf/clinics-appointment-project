"use client";
import React, { useState } from "react";
import {
  Dialog,
  Box,
  Typography,
  Button,
  StepLabel,
  Stepper,
  Step,
  FormControlLabel,
  RadioGroup,
  Radio,
  TextField,
  FormLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import dayjs from "dayjs";
import { FormControl } from "@mui/material";
import { Calendar } from "react-multi-date-picker";
import "./CalendarComponentStyle.css";
import { useWindow } from "@/src/hooks";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useTranslation } from "react-i18next";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Contact, DaysOfWeek } from "@/src/constants";
import ImageIcon from "@mui/icons-material/Image";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useRouter } from "next/navigation";

export default function BookingDialog({ open, onClose, locale }: any) {
  const [tabValue, setTabValue] = useState(0);
  const { t } = useTranslation();
  const router = useRouter();

  const handleChange = (event: any, newValue: any) => {
    setTabValue(newValue);
  };

  const steps = [t("bookingDialog.step1"), t("bookingDialog.step2"), t("bookingDialog.step3")];
  const dates1 = [
    { name: "9:30", id: "1" },
    { name: "9:30", id: "2" },
    { name: "9:30", id: "3" },
  ];
  const dates2 = [
    { name: "9:30", id: "4" },
    { name: "9:30", id: "5" },
    { name: "9:30", id: "6" },
  ];
  const dates3 = [
    { name: "9:30", id: "7" },
    { name: "9:30", id: "8" },
    { name: "9:30", id: "9" },
  ];

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const mobile = useWindow(767);

  const [date, setDate] = React.useState(dayjs().format("YYYY/MM/DD"));
  const [time, setTime] = React.useState<{ name: string; id: string }>({
    name: dates1[0].name,
    id: dates1[0].id,
  });
  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const FormTitle = ({ title }: any) => {
    return <FormLabel sx={{ display: "block", mt: 2, mb: 1 }}>{title}</FormLabel>;
  };
  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose();
        setTimeout(() => {
          handleReset();
        }, 500);
      }}
      fullWidth
      maxWidth="md"
    >
      <Box sx={{ width: "100%", minHeight: "600px" }}>
        {activeStep !== steps.length ? (
          <Stepper
            activeStep={activeStep}
            sx={{ background: "#004B71", color: "#fff", p: 2, display: { xs: "none", sm: "flex" } }}
          >
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        ) : (
          <></>
        )}
        {activeStep === steps.length ? (
          <Box sx={{ p: 2 }}>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: 500,
                lineHeight: "28px",
                textAlign: "center",
                width: "100%",
                background: "#fff",
                position: "relative",
                zIndex: 2,
                py: 2,
                color: "#004B71",
              }}
            >
              {t("bookingDialog.step4.title")}
            </Typography>

            <Grid
              container
              maxWidth="100%"
              direction={{ xs: "column-reverse", sm: "row" }}
              flexWrap={"nowrap"}
            >
              <Grid item xs={12} sm={5} md={4} lg={3}>
                <Box
                  sx={{
                    background: "#004B71",
                    width: "100%",
                    height: "100%",
                    color: "#fff",
                    py: 4,
                    px: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <Typography
                    sx={{ fontSize: "24px", fontWeight: 500, lineHeight: "28px", color: "#00D4FF" }}
                  >
                    {t("bookingDialog.step4.book")}
                  </Typography>
                  <Box sx={{ "& p": { fontSize: "12px", fontWeight: 500, lineHeight: "28px" } }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Typography>{t("bookingDialog.step4.bookDate")}</Typography>
                      <Typography>{date}</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Typography>{t("bookingDialog.step4.day")}</Typography>
                      <Typography>{DaysOfWeek[dayjs(date).day()]}</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Typography>{t("bookingDialog.step4.time")}</Typography>
                      <Typography>{time.name}</Typography>
                    </Box>
                  </Box>
                  <Typography
                    sx={{ fontSize: "24px", fontWeight: 500, lineHeight: "28px", color: "#00D4FF" }}
                  >
                    {t("bookingDialog.step4.info")}
                  </Typography>
                  <Box>
                    {Contact.map((contact, index) => (
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                        key={index}
                      >
                        <ImageIcon />
                        <Typography
                          sx={{
                            fontSize: "12px",
                            fontWeight: 500,
                            lineHeight: "28px",
                          }}
                        >
                          {contact}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  <Button
                    variant="outlined"
                    color="secondary"
                    sx={{
                      color: "#3FBDE6",
                      textWrap: "nowrap",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Typography>{t("bookingDialog.step4.addToCalendar")}</Typography>
                    <CalendarMonthIcon />
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => router.push("/")}>
                    {t("bookingDialog.step4.agree")}
                  </Button>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={7}
                md={8}
                lg={9}
                sx={{ "& iframe": { minHeight: { xs: "500px", sm: "100%" } }, minHeight: "500px" }}
              >
                <iframe
                  src="https://maps.google.com/maps?q=36.19980587168142,37.16299669311489&z=16&output=embed"
                  height="100%"
                  width="100%"
                ></iframe>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <React.Fragment>
            {activeStep === 0 && (
              <Box sx={{ width: "100%" }}>
                <Typography
                  sx={{
                    fontSize: { xs: "18px", sm: "26px" },
                    fontWeight: 700,
                    lineHeight: "28px",
                    textAlign: "center",
                    py: 1,
                    color: { xs: "#fff", sm: "#004B71" },
                    background: { xs: "#004B71", sm: "transparent" },
                  }}
                >
                  {t("bookingDialog.step1.title")}
                </Typography>
                <FormControl sx={{ background: "#f5f5f5" }} fullWidth>
                  <Calendar
                    shadow={false}
                    numberOfMonths={mobile < 600 ? 1 : 2}
                    className="calendar"
                    onChange={(e) => setDate(e!.toString())}
                  />
                </FormControl>
                <Box sx={{ p: 2 }}>
                  <Typography sx={{ py: 1 }}>{t("bookingDialog.step1.morning")}</Typography>
                  <RadioGroup
                    sx={{ display: "flex", flexDirection: "row", gap: 1, "[dir=ltr] &": { px: 1 } }}
                  >
                    {dates1.map((el, index) => (
                      <FormControlLabel
                        key={index}
                        name="time"
                        control={<Radio sx={{ display: "none" }} name={el.name} />}
                        label={el.name}
                        sx={{
                          userSelect: "none",
                          "& span": {
                            fontSize: { xs: "12px", sm: "20px" },
                            borderRadius: "100px",
                            // color: "#FFF",
                            backgroundColor: time.id === el.id ? "#004B71" : "#F3F2F5",
                            color: time.id === el.id ? "#fff" : "#000",
                            px: 6,
                            py: 0.5,
                          },
                        }}
                        onClick={() => {
                          setTime(el);
                        }}
                      />
                    ))}
                  </RadioGroup>
                  <Typography sx={{ py: 1 }}>{t("bookingDialog.step1.afternon")}</Typography>
                  <RadioGroup
                    sx={{ display: "flex", flexDirection: "row", gap: 1, "[dir=ltr] &": { px: 1 } }}
                  >
                    {dates2.map((el, index) => (
                      <FormControlLabel
                        key={index}
                        name="time"
                        control={<Radio sx={{ display: "none" }} name={el.name} />}
                        label={el.name}
                        sx={{
                          userSelect: "none",
                          "& span": {
                            fontSize: { xs: "12px", sm: "20px" },
                            borderRadius: "100px",
                            // color: "#FFF",
                            backgroundColor: time.id === el.id ? "#004B71" : "#F3F2F5",
                            color: time.id === el.id ? "#fff" : "#000",
                            px: 6,
                            py: 0.5,
                          },
                        }}
                        onClick={() => {
                          setTime(el);
                        }}
                      />
                    ))}
                  </RadioGroup>
                  <Typography sx={{ py: 1 }}>{t("bookingDialog.step1.night")}</Typography>
                  <RadioGroup
                    sx={{ display: "flex", flexDirection: "row", gap: 1, "[dir=ltr] &": { px: 1 } }}
                  >
                    {dates3.map((el, index) => (
                      <FormControlLabel
                        key={index}
                        name="time"
                        control={<Radio sx={{ display: "none" }} name={el.name} />}
                        label={el.name}
                        sx={{
                          userSelect: "none",
                          "& span": {
                            fontSize: { xs: "12px", sm: "20px" },
                            borderRadius: "100px",
                            // color: "#FFF",
                            backgroundColor: time.id === el.id ? "#004B71" : "#F3F2F5",
                            color: time.id === el.id ? "#fff" : "#000",
                            px: 6,
                            py: 0.5,
                          },
                        }}
                        onClick={() => {
                          setTime(el);
                        }}
                      />
                    ))}
                  </RadioGroup>

                  <Button
                    fullWidth={mobile < 600 ? true : false}
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2, p: { xs: "8px 64px 8px 64px", md: "15px 160px 15px 160px" } }}
                    onClick={() => setActiveStep((prevActiveStep) => prevActiveStep + 1)}
                  >
                    {mobile < 600
                      ? t("bookingDialog.confirm")
                      : `${t("bookingDialog.step1.book")}: ${date} - ${time.name}`}
                  </Button>
                </Box>
              </Box>
            )}
            {activeStep === 1 && (
              <Box>
                <Typography
                  sx={{
                    fontSize: { xs: "18px", sm: "26px" },
                    fontWeight: 700,
                    lineHeight: "28px",
                    textAlign: "center",
                    py: 1,
                    color: { xs: "#fff", sm: "#004B71" },
                    background: { xs: "#004B71", sm: "transparent" },
                  }}
                  onClick={() => console.log(mobile)}
                >
                  {t("bookingDialog.step2.title")}
                </Typography>
                <Box>
                  <Box maxWidth="100%" p={{ xs: 2, sm: 4 }}>
                    <Box>
                      <FormTitle title={t("bookingDialog.step2.mobile")} />
                      <TextField
                        type="text"
                        // value={options.impluse}
                        // onChange={(e) => setOptions({ ...options, impluse: e.target.value })}
                        fullWidth
                      />
                    </Box>
                    <Box
                      sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <FormTitle title={t("bookingDialog.step2.firstname")} />
                        <TextField
                          type="text"
                          // value={options.impluse}
                          // onChange={(e) => setOptions({ ...options, impluse: e.target.value })}
                          fullWidth
                        />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <FormTitle title={t("bookingDialog.step2.lastname")} />
                        <TextField
                          type="text"
                          // value={options.impluse}
                          // onChange={(e) => setOptions({ ...options, impluse: e.target.value })}
                          fullWidth
                        />
                      </Box>
                    </Box>
                    <Box
                      sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <FormTitle title={t("bookingDialog.step2.gender")} />
                        <Select defaultValue={"0"} fullWidth>
                          <MenuItem value={"0"}>ذكر</MenuItem>
                          <MenuItem value={"1"}>انثى</MenuItem>
                        </Select>
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <FormTitle title={t("bookingDialog.step2.birthdate")} />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            sx={{ width: "100%" }}
                            // value={value}
                            // onChange={(newValue) => setValue(newValue)}
                          />
                        </LocalizationProvider>
                      </Box>
                    </Box>
                    <Box>
                      <FormTitle title={t("bookingDialog.step2.howYouKnowUs")} />
                      <Select defaultValue={"0"} fullWidth>
                        <MenuItem value={"0"}> محرك البحث عبر الإنترنت (مثل Google وBing)</MenuItem>
                        <MenuItem value={"1"}>وسائل التواصل الاجتماعي</MenuItem>
                      </Select>
                    </Box>
                    <Box sx={{ display: "flex", width: "100%", justifyContent: "center", mt: 5 }}>
                      <Button
                        fullWidth={mobile < 600 ? true : false}
                        variant="contained"
                        color="primary"
                        sx={{
                          p: { xs: "8px 64px 8px 64px", md: "15px 160px 15px 160px" },
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                        onClick={() => setActiveStep((prevActiveStep) => prevActiveStep + 1)}
                      >
                        <Typography>{t("bookingDialog.confirm")}</Typography>
                        {locale === "en" ? <ArrowForward /> : <ArrowBack />}
                      </Button>
                    </Box>
                    {/* <Typography sx={{ textAlign: "center", mt: 2 }}>
                      تسجيل الدخول باستخدام رقم هاتف آخر ? انقر هنا
                    </Typography> */}
                  </Box>
                </Box>
              </Box>
            )}
            {activeStep === 2 && (
              <Box maxWidth="100%" p={{ xs: 2, sm: 4 }}>
                <Typography
                  sx={{
                    fontSize: { xs: "18px", sm: "26px" },
                    fontWeight: 700,
                    lineHeight: "28px",
                    textAlign: "center",
                    py: 1,
                    color: { xs: "#fff", sm: "#004B71" },
                    background: { xs: "#004B71", sm: "transparent" },
                  }}
                  onClick={() => console.log(mobile)}
                >
                  {t("bookingDialog.step3")}
                </Typography>
                <Box>
                  <Box sx={{ width: "100%", textAlign: "center", mb: 4, mt: 6 }}>
                    <Typography sx={{ fontSize: "20px", fontWeight: 400, lineHeight: "22.32px" }}>
                      {t("bookingDialog.step3.title")}
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}
                  >
                    <TextField
                      type="text"
                      placeholder={t("bookingDialog.step3.placeholder")}
                      // value={options.impluse}
                      // onChange={(e) => setOptions({ ...options, impluse: e.target.value })}
                      sx={{ width: { xs: "100%", md: "70%" } }}
                    />
                    <Button
                      fullWidth={mobile < 600 ? true : false}
                      variant="contained"
                      color="primary"
                      sx={{
                        p: { xs: "8px 64px 8px 64px", md: "15px 160px 15px 160px" },
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                      onClick={() => setActiveStep((prevActiveStep) => prevActiveStep + 1)}
                    >
                      <Typography>{t("bookingDialog.step3.confirm")}</Typography>
                      {locale === "en" ? <ArrowForward /> : <ArrowBack />}
                    </Button>
                  </Box>
                </Box>
              </Box>
            )}
            {/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box> */}
          </React.Fragment>
        )}
      </Box>
    </Dialog>
  );
}
