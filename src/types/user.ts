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
  name: string
  employeeNumber: string
  nickname?: string
  image?: string
  allowPasswordChange: boolean
}