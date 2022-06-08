import React, {useEffect, useState, useContext }  from "react"
import { BrowserRouter, Routes, Route, Navigate }  from "react-router-dom"

import { CommonLayout } from "components/layouts/CommonLayout"
import { Home } from "components/pages/Home"
import { SignIn } from "components/pages/SignIn"
import { SignUp } from "components/pages/SignUp"
import { Menu }from "components/pages/Menu"
import { Schedule } from "components/pages/Schedule"
import { Ship } from "components/pages/Ship"

import { getCurrentUser } from "lib/api/auth"
import { User } from "interfaces/index"
import { AuthContextProvider } from "components/providers/AuthContextProvider"


function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <CommonLayout>
          <Routes>
            <Route  path="/signup" element={<SignUp />} />
            <Route  path="/signin" element={<SignIn />} />
            <Route  path="/" element={<Home />} />
            <Route  path="/menu" element={<Menu />} />
            <Route  path="/schedule" element={<Schedule />} />
            <Route  path="/ship" element={<Ship />} />
          </Routes>
        </CommonLayout>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App

