"use client";
import React from "react";
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
import { Calendar } from "react-multi-date-picker";
import "./CalendarComponentStyle.css";
import { useWindow } from "@/src/hooks";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useTranslation } from "react-i18next";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import CounterDown from "./CounterDown";
import { apiRoutes, axios } from "@/src/api";
import Loading from "../common/Loading";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import InputField from "../text-field/InputField";
import { LoadingButton } from "@mui/lab";
import toast from "react-hot-toast";
import SkeletonLoading from "../common/SkeletonLoading";

export default function BookingDialog({ open, onClose, locale }: BookingDialogProps) {
  const { t } = useTranslation();
  const router = useRouter();

  const IsOpen = open.open;
  const DoctorId = open.doctorId;
  const BookingKind = open.bookingKind;
  const ServiceId = open.serviceId;

  const patientId = React.useRef<string | null>(null);

  const steps = [t("bookingDialog.step1"), t("bookingDialog.step2"), t("bookingDialog.step3")];

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const mobile = useWindow(767);

  const [dateType1, setDateType1] = React.useState<string>("");

  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<any>({});

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (activeStep === 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    setSkipped(newSkipped);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const [location, setLocation] = React.useState("");
  const getClinicLocation = async () => {
    await axios
      .get(apiRoutes.website.GetMedicalCenterInfo)
      .then((response) => setLocation(response.data.data.clinicMapUrl))
      .catch((err) => toast.error(err.response.data.message));
  };

  const getAvailableAppointmentCount = async () => {
    setLoading(true);
    await axios
      .get(apiRoutes.website.GetAvailableAppointmentCount(DoctorId))
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
      .get(apiRoutes.website.GetAvailableAppointmentTimes(DoctorId))
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
      .get(apiRoutes.website.GetAvailableAppointmentTimesForService(ServiceId))
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
  const checkPatient = async (name: any, phoneNumber: any, birthdate: any) => {
    axios
      .get(apiRoutes.website.CheckPatient(name, phoneNumber, birthdate))
      .then((res) => {
        patientId.current = res.data.data.id;
        handleNext();
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  React.useEffect(() => {
    if (IsOpen) {
      if (DoctorId !== "") {
        if (BookingKind === 0) {
          getAvailableAppointmentCount();
        } else {
          getAvailableAppointmentTimes();
        }
      } else {
        getAvailableAppointmentTimesForService();
      }
    }
  }, []);

  const FormTitle = ({ title }: any) => {
    return <FormLabel sx={{ display: "block", mt: 2, mb: 1 }}>{title}</FormLabel>;
  };

  const [wayKnowClinicLoading, setWayKnowClinicLoading] = React.useState(false);
  const [wayKnowClinicData, setWayKnowClinicData] = React.useState<any>();
  function getWayKnowClinic() {
    setWayKnowClinicLoading(true);
    axios
      .get(apiRoutes.website.GetAllWayKnowClinic)
      .then((res) => setWayKnowClinicData(res.data))
      .catch((err) => toast.error(err.response.data.message))
      .finally(() => setWayKnowClinicLoading(false));
  }
  const [bookingType, setBookingType] = React.useState<number>(10);
  React.useEffect(() => {
    getWayKnowClinic();

    getClinicLocation();
    axios
      .get(apiRoutes.website.GetMedicalCenterInfo)
      .then((res) => setBookingType(res.data.data.bookingType))
      .catch((err) => toast.error(err.response.data.message));
  }, []);

  return (
    <Dialog
      open={open.open}
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
        <Formik
          validationSchema={schema}
          initialValues={{
            // from: "2024-10-10T16:01:19.555Z",
            // to: "2024-10-10T16:01:19.555Z",

            doctorId: DoctorId,
            serviceId: ServiceId,
            patientId: patientId.current,
            roomId: "",
            otp: "",
            fromDate: "",
            fromTime: "",
            complaint: "",

            // patient information
            name: "",
            birthdate: dayjs("2000-01-01T00:00:00").format("YYYY-MM-DDTHH:mm:00"),
            gender: 0,
            wayKnowClinicId: "",
            phoneNumber: "",
          }}
          onSubmit={async (values, { setSubmitting }) => {
            let vals = DoctorId
              ? {
                  from:
                    BookingKind === 0
                      ? bookingType === 0
                        ? `${values.fromDate}T00:00:00`
                        : `${dateType1}T00:00:00`
                      : `${values.fromDate}T${values.fromTime}`,
                  doctorId: values.doctorId,
                  serviceId: values.serviceId,
                  patientId: patientId.current,
                  complaint: values.complaint,
                  otp: values.otp,
                }
              : {
                  from: BookingKind === 0 ? `${values.fromDate}T00:00:00` : `${values.fromDate}T${values.fromTime}`,
                  roomId: values.roomId,
                  serviceId: values.serviceId,
                  patientId: patientId.current,
                  complaint: values.complaint,
                  otp: values.otp,
                };
            axios
              .post(apiRoutes.website.AddAppointment, vals)
              .then((res) => {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                toast.success("bookingDialog.success");
              })
              .catch((err) => toast.error(err.response.data.message))
              .finally(() => setSubmitting(false));
          }}
        >
          {({ handleSubmit, values, setFieldValue, isSubmitting }) => {
            console.log("values", values);
            console.log(
              "vals",
              DoctorId
                ? {
                    from:
                      BookingKind === 0
                        ? bookingType === 0
                          ? `${values.fromDate}T00:00:00`
                          : `${dateType1}T00:00:00`
                        : `${values.fromDate}T${values.fromTime}`,
                    doctorId: values.doctorId,
                    serviceId: values.serviceId,
                    patientId: patientId.current,
                    complaint: values.complaint,
                    otp: values.otp,
                  }
                : {
                    from: BookingKind === 0 ? `${values.fromDate}T00:00:00` : `${values.fromDate}T${values.fromTime}`,
                    roomId: values.roomId,
                    serviceId: values.serviceId,
                    patientId: patientId.current,
                    complaint: values.complaint,
                    otp: values.otp,
                  }
            );
            return (
              <Form onSubmit={handleSubmit}>
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
                              <Typography>{bookingType === 0 ? dateType1 : values.fromDate}</Typography>
                            </Box>
                            {bookingType !== 0 && (
                              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                                <Typography>{t("bookingDialog.step4.time")}</Typography>
                                <Typography>{values.fromTime.slice(0, 5)}</Typography>
                              </Box>
                            )}
                          </Box>
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
                        <iframe src={location} height="100%" width="100%"></iframe>
                      </Grid>
                    </Grid>
                  </Box>
                ) : (
                  <React.Fragment>
                    {activeStep === 0 && (
                      <Box sx={{ width: "100%" }}>
                        {loading ? (
                          <Loading />
                        ) : (
                          <FormControl sx={{ background: BookingKind === 1 ? "#f5f5f5" : "#fff" }} fullWidth>
                            <>
                              {bookingType === 0 && (
                                <>
                                  <Calendar
                                    buttons={false}
                                    shadow={false}
                                    numberOfMonths={mobile < 600 ? 1 : 2}
                                    className="calendar"
                                    onChange={(e) => {
                                      setFieldValue("fromTime", "");
                                      setFieldValue("fromDate", e!.format("YYYY-MM-DD"));
                                    }}
                                    mapDays={({ date }) => {
                                      let isAvailable = Object.keys(data || {})
                                        .map((el) => el.slice(0, 10))
                                        .includes(date.format("YYYY-MM-DDTHH:mm:00").slice(0, 10));
                                      if (!isAvailable) return { disabled: true, style: { color: "#ccc" }, onClick: () => {} };
                                    }}
                                  />
                                  {(BookingKind === 1 || DoctorId == "") && (
                                    <Box sx={{ p: 2 }}>
                                      <Typography sx={{ py: 1 }}>{t("bookingDialog.step1.morning")}</Typography>
                                      <RadioGroup sx={{ display: "flex", flexDirection: "row", gap: 1, "[dir=ltr] &": { px: 1 } }}>
                                        {values.fromDate &&
                                          data[Object.keys(data).filter((key) => key.slice(0, 10) === values.fromDate.slice(0, 10))[0]]
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
                                                    backgroundColor:
                                                      values.fromTime.slice(0, 5) === el.from.slice(0, 5) ? "#004B71" : "#F3F2F5",
                                                    color: values.fromTime.slice(0, 5) === el.from.slice(0, 5) ? "#fff" : "#000",
                                                    px: 6,
                                                    py: 0.5,
                                                  },
                                                }}
                                                onClick={() => {
                                                  setFieldValue("fromTime", el.from);
                                                  setFieldValue("roomId", el.roomId);
                                                }}
                                              />
                                            ))}
                                      </RadioGroup>
                                      <Typography sx={{ py: 1 }}>{t("bookingDialog.step1.night")}</Typography>
                                      <RadioGroup sx={{ display: "flex", flexDirection: "row", gap: 1, "[dir=ltr] &": { px: 1 } }}>
                                        {values.fromDate &&
                                          data[Object.keys(data).filter((key) => key.slice(0, 10) === values.fromDate.slice(0, 10))[0]]
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
                                                    backgroundColor:
                                                      values.fromTime.slice(0, 5) === el.from.slice(0, 5) ? "#004B71" : "#F3F2F5",
                                                    color: values.fromTime.slice(0, 5) === el.from.slice(0, 5) ? "#fff" : "#000",
                                                    px: 6,
                                                    py: 0.5,
                                                  },
                                                }}
                                                onClick={() => {
                                                  setFieldValue("fromTime", el.from);
                                                  setFieldValue("roomId", el.roomId);
                                                }}
                                              />
                                            ))}
                                      </RadioGroup>
                                    </Box>
                                  )}
                                  {BookingKind === 0 && (
                                    <Button
                                      disabled={!values.fromDate}
                                      variant="contained"
                                      color="primary"
                                      sx={{ alignSelf: "center", my: 2, p: { xs: "8px 64px 8px 64px", md: "15px 160px 15px 160px" } }}
                                      onClick={() => setActiveStep((prevActiveStep) => prevActiveStep + 1)}
                                    >
                                      {mobile < 600 ? t("bookingDialog.confirm") : `${t("bookingDialog.step1.book")}: ${values.fromDate}`}
                                    </Button>
                                  )}
                                  {(BookingKind === 1 || DoctorId == "") && (
                                    <Button
                                      disabled={!values.fromDate || !values.fromTime}
                                      variant="contained"
                                      color="primary"
                                      sx={{ alignSelf: "center", my: 2, p: { xs: "8px 64px 8px 64px", md: "15px 160px 15px 160px" } }}
                                      onClick={() => setActiveStep((prevActiveStep) => prevActiveStep + 1)}
                                    >
                                      {mobile < 600
                                        ? t("bookingDialog.confirm")
                                        : `${t("bookingDialog.step1.book")}: ${values.fromDate} - ${values.fromTime.slice(0, 5)}`}
                                    </Button>
                                  )}
                                </>
                              )}
                              {bookingType === 1 && (
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
                                  {(BookingKind === 1 || DoctorId == "") && (
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
                                                        backgroundColor:
                                                          values.fromTime.slice(0, 5) === el.from.slice(0, 5) ? "#004B71" : "#F3F2F5",
                                                        color: values.fromTime.slice(0, 5) === el.from.slice(0, 5) ? "#fff" : "#000",
                                                        px: 6,
                                                        py: 0.5,
                                                      },
                                                    }}
                                                    onClick={() => {
                                                      setFieldValue("fromTime", el.from);
                                                      setFieldValue("roomId", el.roomId);
                                                    }}
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
                                                        backgroundColor:
                                                          values.fromTime.slice(0, 5) === el.from.slice(0, 5) ? "#004B71" : "#F3F2F5",
                                                        color: values.fromTime.slice(0, 5) === el.from.slice(0, 5) ? "#fff" : "#000",
                                                        px: 6,
                                                        py: 0.5,
                                                      },
                                                    }}
                                                    onClick={() => {
                                                      setFieldValue("fromTime", el.from);
                                                      setFieldValue("roomId", el.roomId);
                                                    }}
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
                                  {BookingKind === 0 && (
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
                                  {(BookingKind === 1 || DoctorId == "") && (
                                    <Button
                                      fullWidth={mobile < 600 ? true : false}
                                      disabled={!values.fromTime}
                                      variant="contained"
                                      color="primary"
                                      sx={{ alignSelf: "center", my: 2, p: { xs: "8px 64px 8px 64px", md: "15px 160px 15px 160px" } }}
                                      onClick={() => setActiveStep((prevActiveStep) => prevActiveStep + 1)}
                                    >
                                      {mobile < 600
                                        ? t("bookingDialog.confirm")
                                        : `${t("bookingDialog.step1.book")}: ${values.fromDate} - ${values.fromTime.slice(0, 5)}`}
                                    </Button>
                                  )}
                                </>
                              )}
                            </>
                          </FormControl>
                        )}
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
                        <Box p={{ xs: "0 16px 16px 16px", sm: "0 32px 32px 32px" }}>
                          <InputField name="phoneNumber" label={t("bookingDialog.step2.mobile")} focused />
                          <Box maxWidth="100%">
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
                                    value={dayjs(values.birthdate)}
                                    onChange={(newValue) => setFieldValue("birthdate", newValue)}
                                  />
                                </LocalizationProvider>
                              </Box>
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <InputField name="complaint" label={t("bookingDialog.step2.complaint")} />
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
                                onClick={() => checkPatient(values.name, values.phoneNumber, values.birthdate)}
                              >
                                <Typography>{t("bookingDialog.confirm")}</Typography>
                                {locale === "en" ? <ArrowForward /> : <ArrowBack />}
                              </Button>
                            </Box>
                          </Box>
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
                        </Box>
                      </Box>
                    )}
                  </React.Fragment>
                )}
              </Form>
            );
          }}
        </Formik>
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
