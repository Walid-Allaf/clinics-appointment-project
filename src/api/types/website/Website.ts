import { MainType } from "../MainType";

export interface MedicalCenterInfo extends MainType {
  data: {
    clinicId: string;
    clinicName: string;
    clinicNameEn: string;
    clinicDescription: string;
    clinicDescriptionEn: string;
    clinicMapUrl: string;
    clinicAddress: string;
    clinicAddressEn: string;
    clinicImage: string;
    activeTimeType: number;
    bookingType: number;
    openAt: string;
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
export interface Doctor extends MainType {
  data: {
    id: string;
    name: string;
    simpleDescription: string;
    simpleDescriptionEn: string;
    description: string;
    descriptionEn: string;
    phoneNumber: string;
    internalCode: string;
    docCode: string | null;
    birthdate: string;
    bookingKind: number;
    maximumBookingNumber: number;
    sessionTimeInMinutes: number;
    cost: number;
    needConfirmBooking: boolean;
    isAutoConfirmBooking: boolean;
    isOwner: boolean;
    image: string;
  };
  totalCount: number;
  pageSize: number;
  page: number;
}
export interface AllDoctor extends MainType {
  data: {
    results: Array<{
      id: string;
      name: string;
      simpleDescription: string;
      simpleDescriptionEn: string;
      description: string;
      descriptionEn: string;
      phoneNumber: string;
      internalCode: string;
      docCode: string | null;
      birthdate: string;
      bookingKind: number;
      maximumBookingNumber: number;
      sessionTimeInMinutes: number;
      cost: number;
      needConfirmBooking: boolean;
      isAutoConfirmBooking: boolean;
      isOwner: boolean;
      image: string;
    }>;
    totalCount: number;
    pageSize: number;
    page: number;
  };
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
