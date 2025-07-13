import { UserContext } from "@/context/userContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  let [check, setCheck] = useState(false);
  let { userConData, setUserConData } = useContext(UserContext);
  let pathName = useLocation.pathname
  let navigate = useNavigate(false);

  useEffect(() => {
    
    if (!userConData) {
      // navigate("/login");
      return;
    }
    setCheck(true);
    navigate(window.location.pathname); // for testing
    
  }, [userConData]);  // depensy array state is for the testing

  return (
  <div>
    {check && children}
    {console.log('chec==>', check)}
  </div>
  )
}

export default ProtectedRoute;
