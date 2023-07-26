
// const express= require('express');
// const Problems = require('../mongoose_models/Problems');
// const router = express.Router();
// const { body , validationResult } = require('express-validator');
// var fetchuser = require('../middleware/fetchuser');


// // ROUTE 1:Get all the problesm from a specific platform using: GET "/api/problem/getproblems" . login will be required
// router.get('/fetchtodolist', fetchuser, async (req, res) => {
//     try {
//         const problems = await Problems.find({ platform: req.body.platform });
//         res.json(problems)
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error");
//     }
// })