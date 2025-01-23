const express = require('express');
const Script = require('../models/script.model.js');
const router = express.Router();
const {
  getScripts,
  getScript,
  createScript,
  updateScript,
  deleteScript,
} = require('../controllers/script.controller.js');

router.get('/', getScripts);
router.get('/:id', getScript);

router.post('/', createScript);

// update a script
router.put('/:id', updateScript);

// delete a script
router.delete('/:id', deleteScript);

module.exports = router;
