import React, { useContext }  from "react"
import { BrowserRouter, Routes, Route, Navigate }  from "react-router-dom"

import { CommonLayout } from "components/layouts/CommonLayout"
import { Home } from "components/pages/Home"
import { SignIn } from "components/pages/SignIn"
import { SignUp } from "components/pages/SignUp"
import { Schedule } from "components/pages/Schedule"
import { Ship } from "components/pages/Ship"

import {AuthContext} from "components/providers/AuthContextProvider"

export const App: React.FC = () =>  {

  const {isSignedIn} = useContext(AuthContext)

  const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    if (!isSignedIn) {
      return <Navigate to="/signin" replace/>;
    }

    return children
  }

  return (
    <BrowserRouter>
      <CommonLayout>
        <Routes>
          <Route  path="/signup" element={<SignUp />} />
          <Route  path="/signin" element={<SignIn />} />
          <Route  path="/ship" element={ <PrivateRoute><Ship /></PrivateRoute>} />
          <Route  path="/schedule" element={ <PrivateRoute><Schedule /></PrivateRoute>} />
          <Route  path="/" element={ <PrivateRoute><Home /></PrivateRoute> }/>
        </Routes>
      </CommonLayout>
    </BrowserRouter>
  );
};