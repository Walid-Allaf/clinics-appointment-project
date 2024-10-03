"use client";
import React, { use, useEffect, useState } from "react";
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
  FormLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import dayjs from "dayjs";
import { FormControl } from "@mui/material";
import { Calendar, DateObject } from "react-multi-date-picker";
import "./CalendarComponentStyle.css";
import { useWindow } from "@/src/hooks";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useTranslation } from "react-i18next";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { PatientInfo } from "@/src/types";
import CounterDown from "./CounterDown";
import { apiRoutes, axios } from "@/src/api";
import Loading from "../common/Loading";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import InputField from "../text-field/InputField";
import { LoadingButton } from "@mui/lab";
import toast from "react-hot-toast";
import SkeletonLoading from "../common/SkeletonLoading";
import Cookies from "js-cookie";

export default function BookingDialog({ open, onClose, locale }: BookingDialogProps) {
  const [tabValue, setTabValue] = useState(0);
  const { t } = useTranslation();
  const router = useRouter();

  const BOOKINGTYPE = Number(Cookies.get("bookikngType")) || 0;

  const ISOPEN = open.open;
  const DOCID = open.doctorId;
  const BOOKINGKIND = open.bookingKind;
  const SERVICEID = open.serviceId;

  const patientId = React.useRef<string | null>(null);

  const handleChange = (event: any, newValue: any) => {
    setTabValue(newValue);
  };

  const steps = [t("bookingDialog.step1"), t("bookingDialog.step2"), t("bookingDialog.step3")];

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const mobile = useWindow(767);

  const [dateType0, setDateType0] = React.useState<string>("");
  const [dateType1, setDateType1] = React.useState<string>("");
  const [time, setTime] = React.useState<{ from: string; to: string; roomId?: string }>({ from: "", to: "", roomId: "" });

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>({});

  const [next, setNext] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

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
    if (activeStep === 1) {
      console.log(isFormValid);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
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

  const getAvailableAppointmentCount = async () => {
    setLoading(true);
    await axios
      .get(apiRoutes.website.GetAvailableAppointmentCount(DOCID))
      .then((response) => {
        setData(response.data.data);
        if (Object.keys(response.data.data)[0]) {
          setDateType1(Object.keys(response.data.data)[0].slice(0, 10));
        } else toast.error("لايوجد مواعيد");
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(false);
      });
  };
  const getAvailableAppointmentTimes = async () => {
    setLoading(true);
    await axios
      .get(apiRoutes.website.GetAvailableAppointmentTimes(DOCID))
      .then((response) => {
        setData(response.data.data);
        if (Object.keys(response.data.data)[0]) {
          setDateType1(Object.keys(response.data.data)[0].slice(0, 10));
        } else toast.error("لايوجد مواعيد");
        setLoading(false);

        console.log("response.data.data", response.data.data[Object.keys(response.data.data)[0]].length);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(false);
      });
  };
  const getAvailableAppointmentTimesForService = async () => {
    setLoading(true);
    await axios
      .get(apiRoutes.website.GetAvailableAppointmentTimesForService(SERVICEID))
      .then((response) => {
        setData(response.data.data);
        if (Object.keys(response.data.data)[0]) {
          setDateType1(Object.keys(response.data.data)[0].slice(0, 10));
        } else toast.error("لايوجد مواعيد");
        setLoading(false);

        console.log("response.data.data", response.data.data[Object.keys(response.data.data)[0]].length);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (ISOPEN) {
      if (DOCID !== "") {
        if (BOOKINGKIND === 0) {
          getAvailableAppointmentCount();
        } else {
          getAvailableAppointmentTimes();
        }
      } else {
        getAvailableAppointmentTimesForService();
      }
      console.log("open", ISOPEN);
    }
  }, []);

  const FormTitle = ({ title }: any) => {
    return <FormLabel sx={{ display: "block", mt: 2, mb: 1 }}>{title}</FormLabel>;
  };

  const [wayKnowClinicLoading, setWayKnowClinicLoading] = useState(false);
  const [wayKnowClinicData, setWayKnowClinicData] = useState<any>();
  function getWayKnowClinic() {
    setWayKnowClinicLoading(true);
    axios
      .get(apiRoutes.website.GetAllWayKnowClinic)
      .then((res) => setWayKnowClinicData(res.data))
      .catch((err) => toast.error(err.response.data.message))
      .finally(() => setWayKnowClinicLoading(false));
  }

  React.useEffect(() => {
    getWayKnowClinic();
  }, []);

  return (
    <Dialog
      open={open.open}
      onClose={() => {
        onClose();
        setTimeout(() => {
          handleReset();
        }, 500);
        setIsFormValid(false);
        setNext(true);
      }}
      fullWidth
      maxWidth="md"
    >
      <Box sx={{ width: "100%", minHeight: "600px" }}>
        {activeStep !== steps.length ? (
          <Stepper activeStep={activeStep} sx={{ background: "#004B71", color: "#fff", p: 2, display: { xs: "none", sm: "flex" } }}>
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
        <CounterDown expiryTimestamp={new Date().setSeconds(new Date().getSeconds() + 300)} />
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

            <Grid container maxWidth="100%" direction={{ xs: "column-reverse", sm: "row" }} flexWrap={"nowrap"}>
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
                    justifyContent: "space-between",
                  }}
                >
                  <Typography sx={{ fontSize: "24px", fontWeight: 500, lineHeight: "28px", color: "#00D4FF" }}>
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
                      <Typography>{BOOKINGTYPE === 0 ? dateType1 : dateType0}</Typography>
                    </Box>
                    {/* <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Typography>{t("bookingDialog.step4.day")}</Typography>
                      <Typography>{DaysOfWeek[dayjs(date).day()]}</Typography>
                    </Box> */}
                    {BOOKINGTYPE !== 0 && (
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                        <Typography>{t("bookingDialog.step4.time")}</Typography>
                        <Typography>{time.from.slice(0, 5)}</Typography>
                      </Box>
                    )}
                  </Box>
                  {/* <Typography sx={{ fontSize: "24px", fontWeight: 500, lineHeight: "28px", color: "#00D4FF" }}>
                    {t("bookingDialog.step4.info")}
                  </Typography> */}
                  {/* <Box>
                    {Contact.map((contact, index) => (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }} key={index}>
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
                  </Box> */}
                  {/* <Button
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
                  </Button> */}
                  <Button variant="contained" color="secondary" onClick={() => router.push("/")}>
                    {t("bookingDialog.step4.agree")}
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} sm={7} md={8} lg={9} sx={{ "& iframe": { minHeight: { xs: "500px", sm: "100%" } }, minHeight: "500px" }}>
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
                {BOOKINGKIND === 1 && (
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
                )}
                {loading ? (
                  <Loading />
                ) : (
                  <FormControl sx={{ background: BOOKINGKIND === 1 ? "#f5f5f5" : "#fff" }} fullWidth>
                    <>
                      {BOOKINGTYPE === 0 && (
                        <>
                          <Calendar
                            buttons={false}
                            shadow={false}
                            numberOfMonths={mobile < 600 ? 1 : 2}
                            className="calendar"
                            onChange={(e) => {
                              setDateType0(e!.format("YYYY-MM-DD").toString());
                              setTime({ from: "", to: "", roomId: "" });
                            }}
                            mapDays={({ date }) => {
                              let isAvailable = Object.keys(data || {})
                                .map((el) => el.slice(0, 10))
                                .includes(date.toDate().toISOString().slice(0, 10));
                              if (!isAvailable) return { disabled: true, style: { color: "#ccc" }, onClick: () => {} };
                            }}
                          />
                          {(BOOKINGKIND === 1 || DOCID == "") && (
                            <Box sx={{ p: 2 }}>
                              <Typography sx={{ py: 1 }}>{t("bookingDialog.step1.morning")}</Typography>
                              <RadioGroup sx={{ display: "flex", flexDirection: "row", gap: 1, "[dir=ltr] &": { px: 1 } }}>
                                {dateType0 &&
                                  data[Object.keys(data).filter((key) => key.slice(0, 10) === dateType0)[0]]
                                    .filter((ele: any) => ele.shift === 0)
                                    .map((el: any, index: number) => (
                                      <FormControlLabel
                                        key={index}
                                        name="time"
                                        control={<Radio sx={{ display: "none" }} name={el.from.slice(0, 5)} />}
                                        label={el.from.slice(0, 5)}
                                        sx={{
                                          userSelect: "none",
                                          "& span": {
                                            fontSize: { xs: "12px", sm: "16px" },
                                            borderRadius: "100px",
                                            // color: "#FFF",
                                            backgroundColor: time.from.slice(0, 5) === el.from.slice(0, 5) ? "#004B71" : "#F3F2F5",
                                            color: time.from.slice(0, 5) === el.from.slice(0, 5) ? "#fff" : "#000",
                                            px: 6,
                                            py: 0.5,
                                          },
                                        }}
                                        onClick={() => setTime(el)}
                                      />
                                    ))}
                              </RadioGroup>
                              <Typography sx={{ py: 1 }}>{t("bookingDialog.step1.night")}</Typography>
                              <RadioGroup sx={{ display: "flex", flexDirection: "row", gap: 1, "[dir=ltr] &": { px: 1 } }}>
                                {dateType0 &&
                                  data[Object.keys(data).filter((key) => key.slice(0, 10) === dateType0)[0]]
                                    .filter((ele: any) => ele.shift === 1)
                                    .map((el: any, index: number) => (
                                      <FormControlLabel
                                        key={index}
                                        name="time"
                                        control={<Radio sx={{ display: "none" }} name={el.from.slice(0, 5)} />}
                                        label={el.from.slice(0, 5)}
                                        sx={{
                                          userSelect: "none",
                                          "& span": {
                                            fontSize: { xs: "12px", sm: "16px" },
                                            borderRadius: "100px",
                                            // color: "#FFF",
                                            backgroundColor: time.from.slice(0, 5) === el.from.slice(0, 5) ? "#004B71" : "#F3F2F5",
                                            color: time.from.slice(0, 5) === el.from.slice(0, 5) ? "#fff" : "#000",
                                            px: 6,
                                            py: 0.5,
                                          },
                                        }}
                                        onClick={() => setTime(el)}
                                      />
                                    ))}
                              </RadioGroup>
                            </Box>
                          )}
                          {BOOKINGKIND === 0 && (
                            <Button
                              disabled={!dateType0}
                              variant="contained"
                              color="primary"
                              sx={{ alignSelf: "center", my: 2, p: { xs: "8px 64px 8px 64px", md: "15px 160px 15px 160px" } }}
                              onClick={() => setActiveStep((prevActiveStep) => prevActiveStep + 1)}
                            >
                              {mobile < 600 ? t("bookingDialog.confirm") : `${t("bookingDialog.step1.book")}: ${dateType0}`}
                            </Button>
                          )}
                          {(BOOKINGKIND === 1 || DOCID == "") && (
                            <Button
                              disabled={!dateType0 || !time.from}
                              variant="contained"
                              color="primary"
                              sx={{ alignSelf: "center", my: 2, p: { xs: "8px 64px 8px 64px", md: "15px 160px 15px 160px" } }}
                              onClick={() => setActiveStep((prevActiveStep) => prevActiveStep + 1)}
                            >
                              {mobile < 600
                                ? t("bookingDialog.confirm")
                                : `${t("bookingDialog.step1.book")}: ${dateType0} - ${time.from.slice(0, 5)}`}
                            </Button>
                          )}
                        </>
                      )}
                      {BOOKINGTYPE === 1 && (
                        <>
                          <Box>
                            <Typography
                              sx={{
                                fontSize: { xs: "18px", sm: "26px" },
                                fontWeight: 700,
                                lineHeight: "28px",
                                p: 2,
                                color: { xs: "#fff", sm: "#004B71" },
                                background: { xs: "#004B71", sm: "transparent" },
                              }}
                            >
                              سيتم حجز الموعد بتاريخ {dateType1}
                            </Typography>
                          </Box>
                          {(BOOKINGKIND === 1 || DOCID == "") && (
                            <>
                              {dateType1 ? (
                                <Box sx={{ p: 2 }}>
                                  <Typography sx={{ py: 1 }}>{t("bookingDialog.step1.morning")}</Typography>
                                  <RadioGroup sx={{ display: "flex", flexDirection: "row", gap: 1, "[dir=ltr] &": { px: 1 } }}>
                                    {data[Object.keys(data)[0]].length !== 0 ? (
                                      data[Object.keys(data).filter((key) => key.slice(0, 10) === dateType1)[0]]
                                        .filter((ele: any) => ele.shift === 0)
                                        .map((el: any, index: number) => (
                                          <FormControlLabel
                                            key={index}
                                            name="time"
                                            control={<Radio sx={{ display: "none" }} name={el.from.slice(0, 5)} />}
                                            label={el.from.slice(0, 5)}
                                            sx={{
                                              userSelect: "none",
                                              "& span": {
                                                fontSize: { xs: "12px", sm: "20px" },
                                                borderRadius: "100px",
                                                // color: "#FFF",
                                                backgroundColor: time.from.slice(0, 5) === el.from.slice(0, 5) ? "#004B71" : "#F3F2F5",
                                                color: time.from.slice(0, 5) === el.from.slice(0, 5) ? "#fff" : "#000",
                                                px: 6,
                                                py: 0.5,
                                              },
                                            }}
                                            onClick={() => setTime(el)}
                                          />
                                        ))
                                    ) : (
                                      <Typography>لايوجد مواعيد</Typography>
                                    )}
                                  </RadioGroup>
                                  <Typography sx={{ py: 1 }}>{t("bookingDialog.step1.night")}</Typography>
                                  <RadioGroup sx={{ display: "flex", flexDirection: "row", gap: 1, "[dir=ltr] &": { px: 1 } }}>
                                    {data[Object.keys(data)[0]].length !== 0 ? (
                                      data[Object.keys(data).filter((key) => key.slice(0, 10) === dateType1)[0]]
                                        .filter((ele: any) => ele.shift === 1)
                                        .map((el: any, index: number) => (
                                          <FormControlLabel
                                            key={index}
                                            name="time"
                                            control={<Radio sx={{ display: "none" }} name={el.from.slice(0, 5)} />}
                                            label={el.from.slice(0, 5)}
                                            sx={{
                                              userSelect: "none",
                                              "& span": {
                                                fontSize: { xs: "12px", sm: "20px" },
                                                borderRadius: "100px",
                                                // color: "#FFF",
                                                backgroundColor: time.from.slice(0, 5) === el.from.slice(0, 5) ? "#004B71" : "#F3F2F5",
                                                color: time.from.slice(0, 5) === el.from.slice(0, 5) ? "#fff" : "#000",
                                                px: 6,
                                                py: 0.5,
                                              },
                                            }}
                                            onClick={() => setTime(el)}
                                          />
                                        ))
                                    ) : (
                                      <Typography>لايوجد مواعيد</Typography>
                                    )}
                                  </RadioGroup>
                                </Box>
                              ) : (
                                <Typography>لايوجد مواعيد</Typography>
                              )}
                            </>
                          )}
                          {BOOKINGKIND === 0 && (
                            <Box sx={{ display: "grid", placeItems: "center", minHeight: 400, alignSelf: "center" }}>
                              <Button
                                fullWidth={mobile < 600 ? true : false}
                                variant="contained"
                                disabled={!data[Object.keys(data)[0]]}
                                color="primary"
                                sx={{ my: 2, p: { xs: "8px 64px 8px 64px", md: "15px 160px 15px 160px" } }}
                                onClick={() => setActiveStep((prevActiveStep) => prevActiveStep + 1)}
                              >
                                {mobile < 600 ? t("bookingDialogg.confirm") : `${t("bookingDialog.step1.book")}: ${dateType1}`}
                              </Button>
                            </Box>
                          )}
                          {(BOOKINGKIND === 1 || DOCID == "") && (
                            <Button
                              fullWidth={mobile < 600 ? true : false}
                              disabled={!time.from}
                              variant="contained"
                              color="primary"
                              sx={{ alignSelf: "center", my: 2, p: { xs: "8px 64px 8px 64px", md: "15px 160px 15px 160px" } }}
                              onClick={() => setActiveStep((prevActiveStep) => prevActiveStep + 1)}
                            >
                              {mobile < 600
                                ? t("bookingDialog.confirm")
                                : `${t("bookingDialog.step1.book")}: ${dateType0} - ${time.from.slice(0, 5)}`}
                            </Button>
                          )}
                        </>
                      )}
                    </>
                  </FormControl>
                )}
              </Box>
            )}
            {/* ********************************************************************************************* */}
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
                <Box p={{ xs: "0 16px 16px 16px", sm: "0 32px 32px 32px" }}>
                  <Formik
                    validationSchema={schema}
                    enableReinitialize
                    initialValues={{
                      id: "",
                      name: "",
                      phoneNumber: "",
                      birthdate: dayjs(),
                      gender: 0,
                      address: "",
                      wayKnowClinicId: null,
                      otp: "",
                    }}
                    onSubmit={async (values) => {
                      console.log(values);
                      axios
                        .get(apiRoutes.website.CheckPatient(values.name, values.phoneNumber, values.birthdate.toISOString()))
                        .then((res) => {
                          patientId.current = res.data.data.id;
                          handleNext();
                        })
                        .catch((err) => toast.error(err.response.data.message))
                        .finally(() => {});
                    }}
                  >
                    {({ handleSubmit, values, setFieldValue, setFieldTouched, setFieldError }) => (
                      <Form onSubmit={handleSubmit}>
                        <InputField name="phoneNumber" label={t("bookingDialog.step2.mobile")} focused />

                        <Box maxWidth="100%">
                          {next ? (
                            <>
                              <Box
                                sx={{
                                  display: "flex",
                                  gap: 2,
                                  flexDirection: { xs: "column", sm: "row" },
                                }}
                              >
                                <Box sx={{ flex: 1 }}>
                                  <InputField name="name" label={t("bookingDialog.step2.firstname")} />
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                  <InputField name="address" label={t("bookingDialog.step2.address")} />
                                </Box>
                              </Box>
                              <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
                                <Box sx={{ flex: 1 }}>
                                  <FormTitle title={t("bookingDialog.step2.gender")} />
                                  <Select
                                    onChange={(e) => setFieldValue("gender", e.target.value)}
                                    size="small"
                                    value={values.gender}
                                    fullWidth
                                  >
                                    <MenuItem value={0}>ذكر</MenuItem>
                                    <MenuItem value={1}>انثى</MenuItem>
                                  </Select>
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                  <FormTitle title={t("bookingDialog.step2.birthdate")} />
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                      sx={{ width: "100%", "& input": { py: 1 } }}
                                      value={values.birthdate}
                                      onChange={(newValue) => setFieldValue("birthdate", newValue!.toISOString())}
                                    />
                                  </LocalizationProvider>
                                </Box>
                              </Box>
                              <Box>
                                <FormTitle title={t("bookingDialog.step2.howYouKnowUs")} />
                                {wayKnowClinicLoading ? (
                                  <SkeletonLoading />
                                ) : (
                                  <Select
                                    value={values.wayKnowClinicId}
                                    fullWidth
                                    size="small"
                                    onChange={(event) => setFieldValue("wayKnowClinicId", event.target.value)}
                                  >
                                    {wayKnowClinicData
                                      ? wayKnowClinicData.data.results.map((wayKnowClinic: any, i: number) => {
                                          return (
                                            <MenuItem key={i} value={wayKnowClinic.id}>
                                              {wayKnowClinic.text}
                                            </MenuItem>
                                          );
                                        })
                                      : []}
                                  </Select>
                                )}
                              </Box>
                            </>
                          ) : (
                            <></>
                          )}
                          <Box sx={{ display: "flex", width: "100%", justifyContent: "center", mt: 5 }}>
                            {next ? (
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
                                type="submit"
                                // onClick={handleSubmit}
                              >
                                <Typography>{t("bookingDialog.confirm")}</Typography>
                                {locale === "en" ? <ArrowForward /> : <ArrowBack />}
                              </Button>
                            ) : (
                              <>
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
                                  onClick={() => {
                                    if (values.phoneNumber !== "") {
                                      setNext(true);
                                    } else {
                                      // setFieldError("mobile", "");
                                      toast.error("رقم الموبايل مطلوب");
                                    }
                                  }}
                                >
                                  <Typography>{t("bookingDialog.continue")}</Typography>
                                  {locale === "en" ? <ArrowForward /> : <ArrowBack />}
                                </Button>
                              </>
                            )}
                          </Box>
                        </Box>
                      </Form>
                    )}
                  </Formik>
                </Box>
              </Box>
            )}
            {activeStep === 2 && (
              <Box maxWidth="100%">
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
                <Box p={{ xs: 2, sm: 4 }}>
                  <Box sx={{ width: "100%", textAlign: "center", mb: 4, mt: 6 }}>
                    <Typography sx={{ fontSize: "20px", fontWeight: 400, lineHeight: "22.32px" }}>
                      {t("bookingDialog.step3.title")}
                    </Typography>
                  </Box>
                  <Formik
                    // validationSchema={schema}
                    enableReinitialize
                    initialValues={
                      DOCID
                        ? {
                            from: BOOKINGKIND === 0 ? Object.keys(data)[0] : `${dateType0}T${time.from}`,
                            doctorId: DOCID,
                            serviceId: SERVICEID,
                            patientId: patientId.current,
                            complaint: "",
                            otp: "",
                          }
                        : {
                            from: BOOKINGKIND === 0 ? Object.keys(data)[0] : `${dateType0}T${time.from}`,
                            roomId: time.roomId,
                            serviceId: SERVICEID,
                            patientId: patientId.current,
                            complaint: "",
                            otp: "",
                          }
                    }
                    onSubmit={async (values, { setSubmitting }) => {
                      console.log(values);
                      axios
                        .post(apiRoutes.website.AddAppointment, values)
                        .then((res) => {
                          setActiveStep((prevActiveStep) => prevActiveStep + 1);
                        })
                        .catch((err) => toast.error(err.response.data.message))
                        .finally(() => setSubmitting(false));
                    }}
                  >
                    {({ handleSubmit, values, isSubmitting }) => (
                      <Form onSubmit={handleSubmit}>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                          <Box sx={{ width: "70%" }}>
                            <InputField
                              name="otp"
                              label={t("bookingDialog.step2.mobile")}
                              placeholder={t("bookingDialog.step3.placeholder")}
                            />
                          </Box>
                          <LoadingButton
                            loading={isSubmitting}
                            fullWidth={mobile < 600 ? true : false}
                            variant="contained"
                            color="primary"
                            sx={{
                              p: { xs: "8px 64px 8px 64px", md: "15px 160px 15px 160px" },
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                            type="submit"
                            // onClick={() => setActiveStep((prevActiveStep) => prevActiveStep + 1)}
                          >
                            <Typography>{t("bookingDialog.step3.confirm")}</Typography>
                            {locale === "en" ? <ArrowForward /> : <ArrowBack />}
                          </LoadingButton>
                        </Box>
                      </Form>
                    )}
                  </Formik>
                </Box>
              </Box>
            )}
          </React.Fragment>
        )}
      </Box>
    </Dialog>
  );
}
const schema = Yup.object().shape({
  phoneNumber: Yup.string().required("رقم الوبايل مطلوب"),
  name: Yup.string().required("الاسم مطلوب"),
  birthdate: Yup.string().required("تاريخ الميلاد مطلوب"),
});
interface BookingDialogProps {
  open: { open: boolean; doctorId: string; bookingKind: number; serviceId: string };
  onClose: any;
  locale: any;
}
