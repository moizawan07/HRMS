import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  let [userConData, setUserConData] = useState(
    {
    company: {
      companyField: "Education",
      companyLogo:
        "https://res.cloudinary.com/deojyafvf/image/upload/v1750156387/HRMS/cruahzdaz8q5tmbgzffu.png",
      companyName: "Tekvibe",
      companySize: "1-20",
      createdAt: "2025-06-17T10:37:35.602Z",
      headquarters: "Pakistan",
      updatedAt: "2025-06-17T10:37:35.602Z",
      _id: "6851456ff1be328181f544f0",
    },
    user: {
      address: "garden",
      campanyId: "6851456ff1be328181f544f0",
      createdAt: "2025-06-17T10:37:35.831Z",
      dateOfBirth: "2025-06-01T00:00:00.000Z",
      email: "ahad@gmail.com",
      firstName: "Ahad",
      gender: "male",
      invitedBy: "owner",
      lastName: "Raza",
      password: "$2b$10$CTkJ4hw8IlxmdlEsaN.Kdue0KJtwm03tEletpaErXaR74vq5egMPq",
      phoneNumber: "+921245779635",
      role: "owner",
      updatedAt: "2025-06-17T10:37:35.831Z",
      _id: "6851456ff1be328181f544f2",
}}
  );
  console.table("userConData ==>", userConData);

  return (
    <UserContext.Provider value={{ userConData, setUserConData }}>
      {children}
    </UserContext.Provider>
  );
};


// Dummyu Data
// {
//     company: {
//       companyField: "Education",
//       companyLogo:
//         "https://res.cloudinary.com/deojyafvf/image/upload/v1750156387/HRMS/cruahzdaz8q5tmbgzffu.png",
//       companyName: "Tekvibe",
//       companySize: "1-20",
//       createdAt: "2025-06-17T10:37:35.602Z",
//       headquarters: "Pakistan",
//       updatedAt: "2025-06-17T10:37:35.602Z",
//       _id: "6851456ff1be328181f544f0",
//     },
//     user: {
//       address: "garden",
//       campanyId: "6851456ff1be328181f544f0",
//       createdAt: "2025-06-17T10:37:35.831Z",
//       dateOfBirth: "2025-06-01T00:00:00.000Z",
//       email: "ahad@gmail.com",
//       firstName: "Ahad",
//       gender: "male",
//       invitedBy: "owner",
//       lastName: "Raza",
//       password: "$2b$10$CTkJ4hw8IlxmdlEsaN.Kdue0KJtwm03tEletpaErXaR74vq5egMPq",
//       phoneNumber: "+921245779635",
//       role: "admin",
//       updatedAt: "2025-06-17T10:37:35.831Z",
//       _id: "6851456ff1be328181f544f2",
// }}