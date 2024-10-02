interface Specialty {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  internalCode: string;
  docCode: string;
  needDoctor: boolean;
  cost: number;
  sessionTimeInMinutes: number;
  groupId: string;
  groupName: string;
  groupNameEn: string;
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
