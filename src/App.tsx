import React, {useEffect, useState, createContext }  from "react"
import { BrowserRouter, Routes, Route, Navigate }  from "react-router-dom"

import { CommonLayout } from "components/layouts/CommonLayout"
import { Home } from "components/pages/Home"
import { SignIn } from "components/pages/SignIn"
import { SignUp } from "components/pages/SignUp"
import { Menu }from "components/pages/Menu"
import { Schedule } from "components/pages/Schedule"

import { getCurrentUser } from "lib/api/auth"
import { User } from "interfaces/index"


export const AuthContext = createContext({} as {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  isSignedIn: boolean
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: User | undefined
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
})

function App() {
  const [loading, setLoading] = useState<boolean>(true)
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | undefined>()

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser()
      console.log(res)

      if (res?.status === 200) {
        setIsSignedIn(true)
        setCurrentUser(res?.data.currentUser)
      }
      else {
        console.log("No current User")
      }
    }
    catch(err) {
      console.log(err)
    }

    setLoading(false)
  }

  useEffect(() => {
    handleGetCurrentUser()
  }, [setCurrentUser])

  const Private =({ children }: {children: React.ReactElement }) => {
    if(!loading) {
      if(isSignedIn) {
        return children
      }
      else {
        return <Navigate to ="/signin"/>
      }
    }
    else {
      return<></>
    }
  }

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ loading, setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser }}>
        <CommonLayout>
          <Routes>
            <Route  path="/signup" element={<SignUp />} />
            <Route  path="/signin" element={<SignIn />} />
            <Route  path="/" element={<Home />} />
            <Route  path="/menu" element={<Menu />} />
            <Route  path="/schedule" element={<Schedule />} />
          </Routes>
        </CommonLayout>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App

