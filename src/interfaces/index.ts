export interface SignUpData {
  name: string
  email: string
  employeeNumber: string
  password: string
  passwordConfirmation: string
}

export interface SignInData {
  employeeNumber: string
  password: string
}

export interface User {
  id: number
  uid: string
  provider: string
  email: string
  name: string
  nickname?: string
  image?: string
  allowPasswordChange: boolean
}


