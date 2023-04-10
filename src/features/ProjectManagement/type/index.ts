import { Control, FieldErrors } from 'react-hook-form';

export interface ProjectType {
  customerName: string
  name: string
  code: string
  status: number
  pms: string[]
  activeMember: number
  projectType: number
  timeStart: string
  timeEnd: string
  id: number
}
export interface QuantityType {
  quantity: number
}
export interface TaskType {
  taskId: number
  taskName: string
  totalWorkingTime: number
  billableWorkingTime: number
  billable: boolean
}
export interface TeamType {
  userID: number
  userName: string
  projectUserType: number
  totalWorkingTime: number
  billableWorkingTime: number
}
export interface ClientType {
  name: string
  id: number
}
export interface UserType {
  name: string
  id: number
  isActive: boolean
  emailAddress: string
  branchId: number
  type: number
}
export interface TaskItemType {
  id: number
  name: string
  isDeleted: boolean
  billable: boolean
}
export interface BranchType {
  id: number
  name: string
  displayName: string
}
export interface ProjectsType {
  projects: ProjectType[]
  quantity: QuantityType[]
  timesheetStatisticTasks: TaskType[]
  timesheetStatisticTeams: TeamType[]
  clients: ClientType[]
  users: UserType[]
  tasks: TaskItemType[]
  allBranchFilter: BranchType[]
  infoProject: DataType
}
export interface stateType {
  projects: ProjectsType
}
export interface actionType {
  type: string
  payload: object
}

export interface GeneralFormInput {
  customerId: number
  name: string
  code: string
  timeStart: string
  timeEnd: string
  note: string
  isAllUserBelongTo: boolean
  projectType: number
}
export interface GeneralInputType {
  control: Control<GeneralFormInput>
  errors: FieldErrors<GeneralFormInput>
}
export interface DataTasks {
  taskId: number
  billable: boolean
}
export interface DataUsers {
  userId: number
  type: number
}
export interface NotifyType {
  isNotifyToKomu: boolean
  komuChannelId: string | null
  projectTargetUsers: []
  status: number
}
export interface DataType {
  name: string
  code: string
  customerId: number
  id: number
  isAllUserBelongTo: boolean
  isNotifyToKomu: boolean
  komuChannelId: string | null
  note: string
  projectTargetUsers: []
  projectType: number
  status: number
  timeStart: string
  timeEnd: string
  tasks: DataTasks[]
  users: DataUsers[]
}
