const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
var fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const { findById } = require('../models/User');


// ROUTE 1 : get all notes using : GET "api/notes/fetchallnotes"

router.get('/fetchallnotes',fetchuser, async (req,res)=>{
    try {
        const notes = await Notes.find({ user : req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
})

// ROUTE 2 : add notes using : POST "api/notes/addnote"

router.post('/addnote',fetchuser,[
    body('title','Enter A valid title').isLength({min : 3}),
    body('description','Enter atlest 5 character').isLength({min : 5}),

], async (req,res)=>{

    try {
        
        const {title , description , tag} = req.body;
        
        // If there are errors, Return Bad Request and that errors
        
        const errors = validationResult(req);
        if (!errors.isEmpty())
            {
                return res.status(400).json({errors : errors.array()});
            }
            
            const note = new Notes({
                title,description,tag, user : req.user.id
            })
            
            const savednote = await note.save()
            res.json(savednote);

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server error");
        }
})

// ROUTE 3 : Update notes using : PUT "api/notes/updatenote" : Login required

router.put('/updatenote/:id',fetchuser, async (req,res)=>{

    try {
        
        const {title , description , tag} = req.body;
        
        // creae new note object
        const newNote = {}
        if(title) { newNote.title = title };
        if(description) { newNote.description = description };
        if(tag) { newNote.tag = tag };
        
        // find note to be update
        let note = await Notes.findById(req.params.id);
        if(!note){ return res.status(404)>send("Not Found")}
        
        if(note.user.toString() !== req.user.id)
            {
                return res.status(404).send("Not Allowed");
            }
            
            note = await Notes.findByIdAndUpdate(req.params.id , {$set:newNote} , {new : true})
            res.json({note});
            
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server error");
        }
    })


// ROUTE 4 : Delete notes using : DELETE "api/notes/deletenote" : Login required
router.delete('/deletenote/:id',fetchuser, async (req,res)=>{

    try {
        
        // find note to be delete and delete note
        let note = await Notes.findById(req.params.id);
        if(!note){ return res.status(404)>send("Not Found")}
        
        //Allow Deletion only if user owns this note
        if(note.user.toString() !== req.user.id)
            {
                return res.status(404).send("Not Allowed");
            }
            
            // Delete
            note = await Notes.findByIdAndDelete(req.params.id)
            res.json({"Success" : "Not has been deleted" , note : note});
            
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server error");
        }
    })


module.exports = router