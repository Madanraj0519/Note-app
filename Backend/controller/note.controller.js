const User = require("../models/user.model");
const Note = require("../models/note.model");
const jwt = require("jsonwebtoken");



const addNote = async(req, res, next) => {

    const { title, content, tags } = req.body;
    const { user } = req.user;

    if(!title){
        return res.status(400).json({
            error : true, message : "Title is required"
        });
    }

    if(!content){
        return res.status(400).json({
            error : true, message : "Content is required"
        });
    }

    try{
        const note = new Note({
            title, content,
            tags : tags || [],
            userId : user._id,
        });

        await note.save();

        return res.json({
            error: false, note,
            message : "Note added successfully",
        });
    }catch(err){
        return res.status(500).json({
            error : true, message : "Internal Server Error",
        });
    }
};

const editNote = async(req, res, next) => {
    const noteId = req.params.noteId;
    const { title, content, tags, isPinned, isChecked } = req.body;
    const { user } = req.user;


    if(!title && !content && !tags) {
        return res.status(400).json({
            error : true, message : "No changes provided"
        });
    }

    try{
        const note = await Note.findOne({
            _id : noteId, userId : user._id
        });

        if(!note){
            return res.status(404).json({
                error : true, message : "Note not found"
            });
        }

        if(title) note.title = title;
        if(content) note.content = content;
        if(tags) note.tags = tags;
        if(isPinned) note.isPinned = isPinned;
        if(isChecked) note.isChecked = isChecked;

        await note.save();

        return res.json({
            error : true, note,
            message : "Note updated successfully",
        })
    }catch(err){
        return res.status(500).json({
            error : true, message : "Internal Server Error",
        });
    }
}

const getAllNotes = async(req, res, next) => {
    const { user } = req.user;

    try{
        const notes = await Note.find({
            userId : user._id
        }).sort({ isPinned : -1 });

        return res.json({
            error: false,
            notes,
            message : "All notes retrieved successfully",
        });
    }catch(err){
        return res.status(500).json({
            error : true,
            message : "Internal Server Error",
        });
    }
}

const deleteNotes = async(req, res, next) => {
    const noteId = req.params.noteId;
    const { user } = req.user;

    try{
        const note = await Note.findOne({
            _id : noteId, userId : user._id
        });

        if(!note){
            return res.status(404).json({
                error : true,
                message : "Note not found",
            });
        }

        await Note.deleteOne({ _id : noteId, userId : user._id });

        return res.json({
            error : true, message : "Note deleted successfully",
        });
    }catch(err){
        return res.status(404).json({
            error : true,
            message : "Internal server Error",
        });
    }
}

const updatePinned= async(req, res, next) => {
    const noteId = req.params.noteId;
    const { isPinned } = req.body;
    const { user } = req.user;

    try{
        const note = await Note.findOne({
            _id : noteId, userId : user._id
        });

        if(!note){
            return res.status(404).json({
                error : true, message : "Note not found"
            });
        }

        note.isPinned = isPinned;

        await note.save();

        return res.json({
            error : false, note,
            message : "Note updated successfully",
        })
    }catch(err){
        return res.status(500).json({
            error : true, message : "Internal Server Error",
        });
    }
}

const searchNotes = async(req, res, next) => {
    const { user } = req.user;
    const { query } = req.query;

    if(!query){
        return res.status(400).json({
            error : true, message : "Search query is required",
        });
    }


    try {
        const matchingNotes = await Note.find({
            userId : user._id,
            $or : [
                { title : { $regex : new RegExp(query, "i")}},
                { content : { $regex : new RegExp(query, "i")}},
            ],
        });

        return res.json({
            error : false,
            notes : matchingNotes,
            message : "Notes matching the search query retrieved successfully",
        })
    } catch (error) {
        return res.status(500).json({
            error : true, message : "Internal Server Error",
        });
    }
}

const checkedNotes = async(req, res, next) => {
    const noteId = req.params.noteId;
    const { isChecked } = req.body;
    const { user } = req.user;

    try {
        const note = await Note.findOne({
            _id : noteId ,userId : user._id
        });

        if(!note){
            return res.status(404).json({
                error : true, message : "Note not found"
            });
        }

        note.isChecked = isChecked;

        await note.save();

        return res.json({
            error : false, note,
            message : "Note Checked successfully",
        })

    } catch (error) {
        return res.status(500).json({
            error : true, message : "Internal Server Error",
        });
    }


}


module.exports = { addNote, editNote, 
                   getAllNotes, deleteNotes, 
                   updatePinned, searchNotes, checkedNotes };