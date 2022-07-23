import React, { useContext } from "react"
import { AuthContext } from "components/providers/AuthContextProvider"

export const Home: React.FC = () =>  {
  const { currentUser } = useContext(AuthContext)

  return(
    <>
      社員番号：{currentUser?.employeeNumber}
    </>
  )
}
