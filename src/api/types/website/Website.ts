import { MainType } from "../MainType";

export interface MedicalCenterInfo extends MainType {
  data: {
    id: string;
    name: string;
    nameEn: number;
    siteName: number;
    siteNameEn: string;
    description: string;
    descriptionEn: string;
    websiteUrl: string;
    image: string;
  };
}
export interface AllSpecialty extends MainType {
  data: {
    results: Array<Specialty>;
    totalCount: number;
    pageSize: number;
    page: number;
  };
}
export interface AllDoctor extends MainType {
  data: {
    results: Array<{
      doctorId: string;
      doctorName: string;
      doctorNameEn: string;
      doctorDescription: string;
      doctorDescriptionEn: string;
      doctorBio: string;
      doctorBioEn: string;
      doctorPhoneNumber: string;
      doctorImage: string;
      doctorSpecialty: Specialty;
    }>;
    totalCount: number;
    pageSize: number;
    page: number;
  };
}
export interface Doctor extends MainType {
  data: {
    clinic: Clinic;
    doctorBirthdate: string;
    doctorConsultationDuration: number;
    workingDays: Array<WorkingDay>;
    doctorId: string;
    doctorName: string;
    doctorNameEn: string;
    doctorDescription: string;
    doctorDescriptionEn: string;
    doctorBio: string;
    doctorBioEn: string;
    doctorPhoneNumber: string;
    doctorImage: string;
    doctorSpecialty: Specialty;
  };
  totalCount: number;
  pageSize: number;
  page: number;
}
export interface AllClinic extends MainType {
  data: {
    results: Array<Clinic>;
    totalCount: number;
    pageSize: number;
    page: number;
  };
  totalCount?: number;
  pageSize?: number;
  page?: number;
}
