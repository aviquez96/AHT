import { Document } from "mongoose"

export interface IHabit extends Document {
  name: string,
  description: string,
  status: boolean
}