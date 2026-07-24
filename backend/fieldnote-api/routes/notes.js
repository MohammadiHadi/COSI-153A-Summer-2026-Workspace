import epxress from "express";
import {
  getNotes,
  addNote,
  getNoteById,
  deleteNote,
  updateNote,
} from "../controllers/notesController.js";

const router = epxress.Router();

router.get("/", getNotes);
router.get("/:id", getNoteById);
router.post("/", addNote);
router.delete("/:id", deleteNote);
router.patch("/:id", updateNote);

export default router;
