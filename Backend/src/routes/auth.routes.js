const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');
const upload = require('../middlewares/multer.middleware');

router.post('/register', upload.single('avatar'), register);
router.post('/login', login);


module.exports = router;
