import DashLoading from "@/components/Dashboard/Loading";
import DashLayout from "@/layouts/DashLayout"
import { useEffect, useState } from "react";


function DLeaves() {
  let [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  }, [])

   if(loading) {
   return <DashLoading pageName="Leave"/>
  }

  return (
    <DashLayout>Leaves</DashLayout>
  )
}

export default DLeaves