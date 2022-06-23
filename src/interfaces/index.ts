export interface SignUpData {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export interface SignInData {
  email: string
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

export type ShipData = {
  id: number
  regiNumber: string
};

export type ScheduleData = {
  id: number
  from: string
  to: string
  depTime: string
  arrTime: string
}