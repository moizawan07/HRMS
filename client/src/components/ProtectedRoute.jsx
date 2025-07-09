import { UserContext } from "@/context/userContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  let [check, setCheck] = useState(false);
  let { userConData, setUserConData } = useContext(UserContext);
  let navigate = useNavigate(false);

  useEffect(() => {
    if (!userConData) {
      navigate("/login");
      return;
    }
    setCheck(true);
  }, []);

  return <div>{check && children}</div>;
}

export default ProtectedRoute;
