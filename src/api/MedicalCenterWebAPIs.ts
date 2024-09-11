const MedicalCenterWebAPIs = {
  website: {
    GetMedicalCenterInfo: "/Website/GetMedicalCenterInfo",
    GetAllSpecialty: "/Website/GetAllSpecialty",
    GetAllDoctor: "/Website/GetAllDoctor",
    GetDoctor: (id: string) => `/Website/GetDoctor?id=${id}`,
    GetAllClinic: "/Website/GetAllClinic",
  },
};
export default MedicalCenterWebAPIs;
