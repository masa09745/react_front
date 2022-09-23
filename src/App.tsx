import React, { useContext }  from "react"
import {
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
 } from "react-router-dom"

import { CommonLayout } from "components/layouts/CommonLayout"
import { Home } from "components/pages/Home"
import { SignIn } from "components/pages/SignIn"
import { SignUp } from "components/pages/SignUp"
import { Ships, shipsLoader } from "components/pages/Ships"
import { ShipDetails, detailLoader } from "components/utils/ShipDetails"

import {AuthContext} from "components/providers/AuthContextProvider"

export const App: React.FC = () =>  {

  const {loading, isSignedIn} = useContext(AuthContext)
  const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    if(!loading) {
      if (isSignedIn) {
        return children
      } else {
        return  <Navigate to="/signin" replace/>;
      }
    }else {
      return  <></>
    }
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route  path="/" element={<CommonLayout />} >
        <Route index element={<Home />} />
        <Route  path="signup" element={<SignUp />} />
        <Route  path="signin" element={<SignIn />} />
        <Route  path="ships"
          loader = {shipsLoader}
          element={ <PrivateRoute><Ships/></PrivateRoute>}
        >
          < Route path=":id"
            loader = {detailLoader}
            element={<ShipDetails />}
          />
        </Route>
      </Route>
  ))

  return (
    <RouterProvider router={router}  />
  );
};