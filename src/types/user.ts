export type SignUpData = {
  firstName: string,
  lastName: string,
  firstKana: string,
  lastKana: string,
  employeeNumber: string
  email: string
  section: string
  role: string
  password: string
  passwordConfirmation: string
}

export type SignInData = {
  employeeNumber: string
  password: string
}

export type User = {
  id: number
  uid: string
  provider: string
  firstName: string,
  lastName: string,
  firstKana: string,
  lastKana: string,
  employeeNumber: string
  email: string
  section: string
  role: string
  allowPasswordChange: boolean
}