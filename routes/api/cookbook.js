const express = require('express');
const router = express.Router();


router.get ('/', (req,res)=> res.send('cookbooks Route'))

module.exports = router;