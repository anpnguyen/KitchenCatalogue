const express = require('express');
const router = express.Router();


router.get ('/', (req,res)=> res.send('authUser Route'))

module.exports = router;