import {Response, Request} from 'express' //Types
import {IHabit} from '../../types/habit'
import Habit from '../../models/habit'

const getHabits = async (req: Request, res: Response) : Promise<void> => {
  try {
    const habits : IHabit[] = await Habit.find()
    res.status(200).json({ habits })
  } catch (error) {
    throw error
  }
}

const addHabit = async (req: Request, res: Response) : Promise<void> => {
  try {
    //Casts the body's request as an IHabit. The Pick part is an extra layer to avoid typos
    const body = req.body as Pick<IHabit, "name" | "description" | "status">

    const habit : IHabit = new Habit({
      name: body.name,
      description: body.description,
      status: body.status,
    })

    const newHabit : IHabit = await habit.save();
    const allHabits : IHabit[] = await Habit.find();

    res.status(201).json({message: "Habit added", habit: newHabit, habits: allHabits})

  } catch (error) {
    throw error
  }
}

const updateHabit = async (req: Request, res: Response) : Promise<void> => {
  try {
    //This is setting and body = {body} id = {params.id}
    const { params: {id}, body } = req

    const updateHabit : IHabit | null = await Habit.findByIdAndUpdate(
      {_id: id},
      body
    )
    const allHabits : IHabit [] = await Habit.find();

    res.status(200).json({message: "Habit updated", habit: updateHabit, habits: allHabits})
  } catch (error) {
    throw error
  }
}

const deleteHabit = async (req: Request, res: Response) : Promise<void> => {
  try {
    const deletedHabit : IHabit | null = await Habit.findByIdAndRemove(req.params.id)

    const allHabits : IHabit[] = await Habit.find();
    res.status(200).json({message: 'Habit deleted', habit: deletedHabit, habits: allHabits})
  } catch (error) {
    throw error
  }
}

export { getHabits, addHabit, updateHabit, deleteHabit }