const { Router } = require("express");
const {
  getAllNotes,
  createNote,
  deleteNote,
  updateNote,
} = require("../controllers/notes.controllers");
const router = Router();

router.get("/notes", getAllNotes);
router.post("/notes", createNote);
router.put("/notes", updateNote);
router.delete("/notes/:id", deleteNote);

module.exports = router;
