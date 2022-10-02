import React, { useContext } from "react"
import { AuthContext } from "components/providers/AuthContextProvider"

export const Home: React.FC = () =>  {
  const { currentUser } = useContext(AuthContext)

  const API_ENDPOINT = process.env.REACT_API_ENDPOINT!;
  console.log(API_ENDPOINT)

  return(
    <>
      <p>社員番号 : {currentUser?.employeeNumber}</p>
      <p>氏名 : {currentUser?.lastName} {currentUser?.firstName}</p>
      <p>所属 : {currentUser?.section}</p>
    </>
  )
}
