const express = require('express');
const router = express.Router();


router.get ('/', (req,res)=> res.send('registerUser Route'))

module.exports = router;


