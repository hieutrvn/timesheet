export interface ProfileData {
  name: string
}
export interface ProfileType {
  profile: ProfileData
}
export interface stateType {
  auth: ProfileType
}
export interface actionType {
  type: string
  payload: null
}
export interface LoginFormInput {
  userNameOrEmailAddress: string
  password: string
  rememberClient: boolean
}
