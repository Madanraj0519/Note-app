const express = require('express');
const { authenticateToken } = require('../utilities');
const { addNote, editNote, getAllNotes, deleteNotes, updatePinned, searchNotes, checkedNotes } = require('../controller/note.controller');
const noteRoute = express.Router();


noteRoute.post('/add-note', authenticateToken, addNote);
noteRoute.put('/edit-note/:noteId', authenticateToken, editNote);
noteRoute.get('/get-all-notes', authenticateToken, getAllNotes);
noteRoute.delete('/delete-note/:noteId', authenticateToken, deleteNotes);
noteRoute.put('/update-note-pinned/:noteId', authenticateToken, updatePinned);
noteRoute.put('/update-checked-note/:noteId', authenticateToken, checkedNotes);
noteRoute.get('/search-notes', authenticateToken, searchNotes);

module.exports = { noteRoute };

