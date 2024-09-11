interface Specialty {
  specialtyId: string;
  specialtyName: string;
  specialtyNameEn: string;
}
interface WorkingDay {
  workDayId: string;
  workDayName: string;
  workDayNameEn: string;
  from: string;
  to: string;
}
interface Clinic {
  clinicId: string;
  clinicName: string;
  clinicNameEn: string;
  clinicDescription: string;
  clinicDescriptionEn: string;
  clinicImage: string;
  clinicCity: ClinicCity;
}
interface ClinicCity {
  cityId: string;
  cityName: string;
  cityNameEn: string;
}
