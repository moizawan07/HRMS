import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
   let [userConData, setUserConData] = useState(false)
   console.log('userConData ==>', userConData);

   return (
      <UserContext.Provider value={{ userConData, setUserConData }}>
         {children}
      </UserContext.Provider>
   )

}