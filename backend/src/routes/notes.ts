import express from 'express';
import * as Notescontroller from '../controllers/notes'

const router = express.Router();

router.get("/",Notescontroller.getNotes);
router.get("/:noteId", Notescontroller.getNote);
router.post("/",Notescontroller.createNote);
router.patch("/:noteId",Notescontroller.UpdateNote);
router.delete("/:noteId",Notescontroller.deletNote);




export default router;