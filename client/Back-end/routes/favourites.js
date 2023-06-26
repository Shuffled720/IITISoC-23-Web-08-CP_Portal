
const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const fav = require('../mongoose_models/Favourites');
const { body, validationResult } = require('express-validator');

// ROUTE 1:Get all the user's to do list items using: GET "/api/auth" . login will be required
router.get('/fetchfavlist', fetchuser, async (req, res) => {
    try {
        const notes = await fav.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new fav list item using: POST "/api/auth/addfav". Login required
router.post('/addfav', fetchuser,[
    body('problem_tag','Enter a valid problem tag').exists(),
    

], async (req, res) => {


        try {

            const { problem_date ,user_note, problem_name, problem_tag } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new fav({
                problem_date ,user_note, problem_name, problem_tag , user: req.user.id
            })
            const savedfav = await note.save()

            res.json(savedfav)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })


    // ROUTE 3: Update an existing fav list item using: PUT "/api/notes/updatefav". Login required
router.put('/updatefav/:id', fetchuser, async (req, res) => {
    const { problem_date ,user_note, problem_name, problem_tag } = req.body;
    try{

        // Create a newNote object
        const newNote  = {};
        if(user_note){newNote.user_note = user_note}
    
        // Find the list item to be updated and update it
        let note = await fav.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")}
    
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }
    
        note = await fav.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
        res.json({note});
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
    })

    // ROUTE 4: Delete an existing list item using: DELETE "/api/notes/deletefav". Login required
router.delete('/deletefav/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let note = await fav.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await fav.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router
