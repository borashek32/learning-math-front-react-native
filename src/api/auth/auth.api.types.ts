export type UserType = {
  _id: string
  email: string
  password: string
  isVerified: boolean
  role: "USER" | "ADMIN"
  score: number
  avatarPath: string
  avatarName: string
}

export type RegistedUserType = {
  accessToken: string
  refreshToken: string
  user: UserType
}

export type RegisterType = {
  email: string
  password: string
  rememberMe?: boolean
}

export type ForgotPasswordType = {
  email: string
  // recapcha: string
}

export type PasswordRecoveryType = {
  email: string | undefined
  password: string
  // createNewPasswordLink: string
}

export type NewPasswordType = {
  userId: string | undefined
  password: string
  newPassword: string
}

export type NewEmailType = {
  userId: string | undefined
  newEmail: string
}

export type LogoutType = {
  accessToken: string
  refreshToken: string
}