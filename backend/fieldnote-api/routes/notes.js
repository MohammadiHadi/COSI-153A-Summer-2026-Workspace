import epxress from "express"
import { getNotes, addNote } from "../controllers/notesController.js"

const router = epxress.Router();

router.get('/', getNotes);
router.post('/', addNote);

export default router;