import { Box, Grid, Container } from "@mui/material";
import { ClinicOverview, IncreasingNumbers, Map, MedicalTeam, OurBranches, SearchComponent, Specialties, Welcome } from "../../components";
import "../globals.css";
import React from "react";
import { notFound } from "next/navigation";
import { apiRoutes } from "@/src/api";
import { AllClinic, AllDoctor, AllSpecialty, MedicalCenterInfo } from "@/src/api/types";

async function getMedicalInfo() {
  let res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api${apiRoutes.website.GetMedicalCenterInfo}`, {
    headers: { "Content-Type": "application/json", key: `${process.env.NEXT_PUBLIC_BASE_KEY}` },
    cache: "no-cache",
  });
  let data: MedicalCenterInfo = await res.json();
  if (!data) notFound();
  return data;
}
async function getServices() {
  let res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api${apiRoutes.website.GetAllServices}`, {
    headers: { "Content-Type": "application/json", key: `${process.env.NEXT_PUBLIC_BASE_KEY}` },
    cache: "no-cache",
  });
  let data: AllSpecialty = await res.json();
  if (!data) notFound();
  return data;
}
async function getDoctors() {
  let res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api${apiRoutes.website.GetAllDoctor("")}`, {
    headers: { "Content-Type": "application/json", key: `${process.env.NEXT_PUBLIC_BASE_KEY}` },
    cache: "no-cache",
  });
  let data: AllDoctor = await res.json();
  if (!data) notFound();
  return data;
}

export default async function Home({ params: { locale } }: any) {
  let medicalInfo = await getMedicalInfo();

  let services = await getServices();
  // let clinics = await getClinics();
  let doctors = await getDoctors();

  // console.log(specialities);
  // console.log(clinics);
  // console.log(doctors.data.results);
  // console.log(medicalInfo);
  return (
    <Box>
      {/* *** LANDING *** */}
      <Box sx={{ background: "linear-gradient(181.27deg, #007291 -37.39%, #004B71 112.37%);" }}>
        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            overflow: "hidden",
            padding: 4,
            paddingBottom: 0,
            height: "100%",
            display: "flex",
            alignItems: "center",
            minHeight: "calc(100vh - 70px)",
          }}
        >
          <Welcome locale={locale} data={medicalInfo} />
        </Container>
      </Box>
      {/* <SearchComponent /> */}
      <Specialties locale={locale} data={services} />
      {/* <OurBranches slides={clinics} locale={locale} /> */}
      <ClinicOverview locale={locale} />
      <MedicalTeam locale={locale} data={doctors} />
      <IncreasingNumbers />

      <Map locale={locale} location={medicalInfo.data.clinicMapUrl} />
    </Box>
  );
}
