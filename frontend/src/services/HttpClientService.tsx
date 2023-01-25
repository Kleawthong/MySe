import React from "react";

import { PatienSceheduleInterface } from "../models/IPatienSchedule";
import { EmployeeInterface } from "../models/IEmployee";
const apiUrl = "http://localhost:3001";



// async function Login(data: SigninInterface) {
//   const requestOptions = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   };

//   let res = await fetch(`${apiUrl}/login_employee`, requestOptions)
//     .then((response) => response.json())
//     .then((res) => {
//       if (res.data) {
//         console.log(res.data);
//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("uid", res.data.id);
//         // เก็บข้อมูล position ที่ login เข้ามา
//         localStorage.setItem("position", res.data.position);
//         // เก็บข้อมูล position ที่ login เข้ามา
//         localStorage.setItem("role", res.data.role);
//         return res.data;
//       } else {
//         return false;
//       }
//     });

//   return res;
// }

// async function LoginStudent(data: SigninInterface) {
//   const requestOptions = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   };

//   let res = await fetch(`${apiUrl}/login_student`, requestOptions)
//     .then((response) => response.json())
//     .then((res) => {
//       if (res.data) {
//         console.log(res.data);
//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("uid", res.data.id);
//         // เก็บข้อมูล position ที่ login เข้ามา
//         localStorage.setItem("position", res.data.position);
//         // เก็บข้อมูล position ที่ login เข้ามา
//         localStorage.setItem("role", res.data.role);
//         return res.data;
//       } else {
//         return false;
//       }
//     });

//   return res;
// }

// --------------------------------Employee--------------------------------------
// ---------------------------------------------------------------------------------
async function GetRole() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/role`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetGender() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/gender`, requestOptions)  
    .then((response) => response.json()) 
    .then((res) => {   
      if (res.data) { 
        return res.data;
      } else {
        return false;
      }
    });
  
  return res;
}

async function GetProvince() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/provinces`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetDistrict() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/district`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetSubdistrict() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/sub_district`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetEmployee() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/employees`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

  async function CreateEmployee(data: EmployeeInterface) {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    let res = await fetch(`${apiUrl}/employee`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      });

    return res;
  }


// //*get token by ID
// async function GetEmployeeByUID() {
//   let uid = localStorage.getItem("uid");
//   const requestOptions = {
//       method: "GET",
//       headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "application/json"
//       },
//   };

//   let res = await fetch(`${apiUrl}/employee/${uid}`, requestOptions)
//       .then((response) => response.json())
//       .then((res) => {
//           if (res.data) {
//               console.log(res.data);
//               return res.data;
//           } else {
//               return false;
//           }
//       });

//   return res;
// }

// --------------------------------------------------------------
async function GetPatientSchedules() {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    let res = await fetch(`${apiUrl}/patien_schedules`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetReasons() {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/reasons`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
  }


  async function PatientSchedules(data: PatienSceheduleInterface) {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  
    let res = await fetch(`${apiUrl}/patien_schedules`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
  }

  export {
    GetPatientSchedules,
    GetReasons,
    PatientSchedules,
    GetRole,
    GetGender,
    GetProvince,
    GetDistrict,
    GetSubdistrict,
    GetEmployee,
    CreateEmployee,
  };