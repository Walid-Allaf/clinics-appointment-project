import { Box, Grid, Container } from "@mui/material";
import { ClinicOverview, IncreasingNumbers, MedicalTeam, OurBranches, SearchComponent, Specialties, Welcome } from "../../components";
import Image from "next/image";
import { HEROIMAGE } from "../../assets";
import "../globals.css";
import { Branches } from "../../constants";
import React from "react";
import { notFound } from "next/navigation";
import { apiRoutes } from "@/src/api";
import { AllClinic, AllDoctor, AllSpecialty, MedicalCenterInfo } from "@/src/api/types";

async function getMedicalInfo() {
  let res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api${apiRoutes.website.GetMedicalCenterInfo}`, {
    headers: { "Content-Type": "application/json", key: `${process.env.NEXT_PUBLIC_BASE_KEY}` },
    cache: "force-cache",
  });
  let data: MedicalCenterInfo = await res.json();
  if (!data) notFound();
  return data;
}
async function getSpecialities() {
  let res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api${apiRoutes.website.GetAllSpecialty}`, {
    headers: { "Content-Type": "application/json", key: `${process.env.NEXT_PUBLIC_BASE_KEY}` },
    cache: "force-cache",
  });
  let data: AllSpecialty = await res.json();
  if (!data) notFound();
  return data;
}
async function getClinics() {
  let res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api${apiRoutes.website.GetAllClinic}`, {
    headers: { "Content-Type": "application/json", key: `${process.env.NEXT_PUBLIC_BASE_KEY}` },
    cache: "force-cache",
  });
  let data: AllClinic = await res.json();
  if (!data) notFound();
  return data;
}
async function getDoctors() {
  let res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api${apiRoutes.website.GetAllDoctor}`, {
    headers: { "Content-Type": "application/json", key: `${process.env.NEXT_PUBLIC_BASE_KEY}` },
    cache: "force-cache",
  });
  let data: AllDoctor = await res.json();
  if (!data) notFound();
  return data;
}

export default async function Home({ params: { locale } }: any) {
  let medicalInfo = await getMedicalInfo();
  let specialities = await getSpecialities();
  let clinics = await getClinics();
  let doctors = await getDoctors();
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
      <SearchComponent />
      <Specialties locale={locale} data={specialities} />
      <IncreasingNumbers />
      <OurBranches slides={clinics} locale={locale} />
      <ClinicOverview locale={locale} />
      <MedicalTeam locale={locale} data={doctors} />
    </Box>
  );
}
