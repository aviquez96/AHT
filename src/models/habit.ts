import { IHabit } from '../types/habit';
import { model, Schema } from 'mongoose';

const habitSchema : Schema = new Schema (
  {
    name:{
      type: String,
      required: true,
    },
    description:{
      type: String,
      required: true,
    },
    status:{
      type: Boolean,
      required: true,
    },
  },
  {timestamps: true}
)

export default model<IHabit>("Habit", habitSchema)