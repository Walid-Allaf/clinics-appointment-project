const prefix = "/Website";

const MedicalCenterWebAPIs = {
  website: {
    GetMedicalCenterInfo: prefix + "/GetClinic",

    GetAllSpecialty: prefix + "/GetAllSpecialty",

    GetAllDoctor: (serviceId: string) => prefix + `/GetAllDoctor?serviceId=${serviceId}`,

    GetDoctor: (id: string) => prefix + `/GetDoctor?id=${id}`,

    GetAllClinic: prefix + "/GetAllClinic",

    GetAllServices: prefix + "/GetAllService",

    GetAvailableAppointmentCount: (doctorId: string) => prefix + `/GetAvailableAppointmentCount?doctorId=${doctorId}`,

    GetAvailableAppointmentTimes: (doctorId: string) => prefix + `/GetAvailableAppointmentTimes?doctorId=${doctorId}`,

    GetAllWayKnowClinic: prefix + "/GetAllWayKnowClinic",

    CheckPatient: (name: string, phoneNumber: string, birthdate: string) =>
      prefix + `/CheckPatient?name=${name}&phoneNumber=${phoneNumber}&birthdate=${birthdate}`,

    AddAppointment: prefix + "/AddAppointment",
  },
};
export default MedicalCenterWebAPIs;
