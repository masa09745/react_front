import React, { useContext }  from "react"
import { BrowserRouter, Routes, Route, Navigate }  from "react-router-dom"

import { CommonLayout } from "components/layouts/CommonLayout"
import { Home } from "components/pages/Home"
import { SignIn } from "components/pages/SignIn"
import { SignUp } from "components/pages/SignUp"
import { Ships } from "components/pages/Ships"

import {AuthContext} from "components/providers/AuthContextProvider"

export const App: React.FC = () =>  {

  const {loading, isSignedIn} = useContext(AuthContext)

  const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    if(!loading) {
      if (!isSignedIn) {
        return <Navigate to="/signin" replace/>;
      } else {
        return children
      }
    }else {
      return  <></>
    }
  }


  return (
    <BrowserRouter>
      <CommonLayout>
        <Routes>
          <Route  path="/signup" element={<SignUp />} />
          <Route  path="/signin" element={<SignIn />} />
          <Route  path="/ships" element={ <PrivateRoute><Ships/></PrivateRoute>} />
          <Route  path="/" element={ <PrivateRoute><Home /></PrivateRoute> }/>
        </Routes>
      </CommonLayout>
    </BrowserRouter>
  );
};