export type SignUpData = {
  name: string
  email: string
  employeeNumber: string
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
  email: string
  firstName: string,
  lastName: string,
  firstKana: string,
  lastKana: string,
  employeeNumber: string
  section: string
  allowPasswordChange: boolean
}