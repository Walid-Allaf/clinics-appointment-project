"use client";
import { Clinics, DoctorInformation, Doctors, Specialty } from "@/src/components";
import { Container, Box } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useTranslation } from "react-i18next";

export default function BookingAnAppointment({ params: { locale } }: any) {
  const [tabValue, setTabValue] = React.useState(0);
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const { replace, push } = useRouter();
  const pathname = usePathname();

  const handleChange = (event: any, newValue: any) => {
    setTabValue(newValue);
  };

  const steps = [t("bookingDialog.step1"), t("bookingDialog.step2"), t("bookingDialog.step3")];
  const params = new URLSearchParams(searchParams);
  const [activeStep, setActiveStep] = React.useState(Number(params.get("step")) || 0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  React.useEffect(() => {
    if (!Number(params.get("step"))) {
      params.set("step", "0");
      replace(`${pathname}?${params.toString()}`);
    }
    setActiveStep(Number(params.get("step")));
  }, [pathname, Number(params.get("step"))]);
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
    params.set("step", (activeStep + 1).toString());
    push(`${pathname}?${params.toString()}`);
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

  return (
    <Box>
      <Box sx={{ width: "100%", minHeight: "600px" }}>
        {activeStep === steps.length ? (
          <DoctorInformation locale={locale} />
        ) : (
          <Container sx={{ marginTop: 4 }}>
            {activeStep === 0 && (
              <Box sx={{ width: "100%" }}>
                <Clinics locale={locale} next={handleNext} />
              </Box>
            )}
            {activeStep === 1 && (
              <Box>
                <Specialty locale={locale} next={handleNext} />
              </Box>
            )}
            {activeStep === 2 && (
              <Box maxWidth="100%">
                <Doctors locale={locale} next={handleNext} />
              </Box>
            )}
          </Container>
        )}
      </Box>
    </Box>
  );
}
