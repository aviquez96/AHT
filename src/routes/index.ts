import {Router} from 'express'
import { getHabits, addHabit, updateHabit, deleteHabit } from '../controllers/habits'

const router: Router = Router()

router.get('/habits', getHabits);
router.post('/add-habit', addHabit);
router.put('/edit-habit/:id', updateHabit);
router.delete('/delete-habit/:id', deleteHabit)

export default router