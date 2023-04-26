const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');
const router = express.Router();
//ROUTE 1: Get All notes using:GET/api/notes/fetchallnotes: Login require
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")

    }
})
 
//ROUTE 2: Add a  note using:POST /api/notes/addnote: Login require

router.post('/addnote', fetchuser, [
    body('title', "Plz enter a valid title").isLength({ min: 3 }),
    body('description', "Description should be atleast 6 characters").isLength({ min: 6 }),], async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            // If there is errors return bad request
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }
            const note = new Notes({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save();
            res.json(savedNote)
        } catch (error) {
            console.error(error.message)
            res.status(500).send("Internal server error")
        }
    })

//ROUTE 3: Update existing note using:PUT /api/notes/updatenote: Login require
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    // create a newNote object   
    try {

        const newNote = {};
        // if in destructing title is there then newNode.title is equal to the title
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }
        // Find the note to be updated and update it
        let note = await Notes.findById(req.params.id)
        if (!note) {
            res.status(404).send("Not Found")
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }

})

//ROUTE 4: DELETE existing note using:DELETE /api/notes/deletenote: Login require
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    const { title, description, tag } = req.body;
    try {
        // Find the note to delete and delete it
        let note = await Notes.findById(req.params.id)
        if (!note) {
            return res.status(404).send("Not Found")
        }
        // Allow the deletion only if the user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Sucess": "Note has been deleted" })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }

})
module.exports = router