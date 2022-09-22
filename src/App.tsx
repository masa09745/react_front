import React, { useContext }  from "react"
import { BrowserRouter, Routes, Route, Navigate, createBrowserRouter, createRoutesFromElements, RouterProvider }  from "react-router-dom"

import { CommonLayout } from "components/layouts/CommonLayout"
import { Home } from "components/pages/Home"
import { SignIn } from "components/pages/SignIn"
import { SignUp } from "components/pages/SignUp"
import { Ships } from "components/pages/Ships"
import { ShipDetails } from "components/utils/ShipDetails"

import {AuthContext} from "components/providers/AuthContextProvider"

export const App: React.FC = () =>  {

  const {loading, currentUser} = useContext(AuthContext)

  const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    if(!loading) {
      if (!currentUser) {
        return <Navigate to="/" replace/>;
      } else {
        return children
      }
    }else {
      return  <></>
    }
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route  path="/" element={<CommonLayout />} >
        <Route  path="signup" element={<SignUp />} />
        <Route  path="signin" element={<SignIn />} />
        <Route  path="ships" element={ <PrivateRoute><Ships/></PrivateRoute>} >
          < Route path=":shipId" element={<ShipDetails />} />
        </Route>
      </Route>
  )
  )

  return (
    <RouterProvider router={router}  />
  );
};