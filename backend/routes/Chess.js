const express = require('express');
const router = express.Router();
const {handleGenerateCode,handleEnterCode} = require('../Controllers/Chess')


router.get('/Create-Code',handleGenerateCode);
router.get('/Start-ChessGame/:EnterCode',handleEnterCode)
module.exports =router;