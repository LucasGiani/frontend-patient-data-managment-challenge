export interface IPatientForm {
  name: string
  avatar: string
  description: string
  website: string
}

export interface IPatient extends IPatientForm {
  id: number
  createdAt: Date
}
