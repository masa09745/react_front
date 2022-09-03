import React, { useContext } from "react"
import { AuthContext } from "components/providers/AuthContextProvider"

export const Home: React.FC = () =>  {
  const { currentUser } = useContext(AuthContext)

  return(
    <>
      <p>社員番号 : {currentUser?.employeeNumber}</p>
      <p>氏名 : {currentUser?.lastName} {currentUser?.firstName}</p>
      <p>所属 : {currentUser?.section}</p>
    </>
  )
}
