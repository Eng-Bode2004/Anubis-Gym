const express = require('express');
const router = express.Router();
const ImagesControllers = require('../Controllers/ImagesControllers');



                            // Upload User Profile Image //

const specializations = require('../Middlewares/Multer-Specializations-Images'); // parser
router.post('/specialization', specializations.single('image'), ImagesControllers.uploadPhoto);

const posts = require('../Middlewares/Multer-Posts'); // parser
router.post('/posts', posts.single('image'), ImagesControllers.uploadPhoto);





module.exports = router;
