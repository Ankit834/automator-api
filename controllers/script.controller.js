const Script = require('../models/script.model');

const getScripts = async (req, res) => {
  try {
    const scripts = await Script.find({});
    res.status(200).json(scripts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getScript = async (req, res) => {
  try {
    const { id } = req.params;
    const script = await Script.findById(id);
    res.status(200).json(script);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createScript = async (req, res) => {
  try {
    const script = await Script.create(req.body);
    res.status(200).json(script);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateScript = async (req, res) => {
  try {
    const { id } = req.params;

    const script = await Script.findByIdAndUpdate(id, req.body);

    if (!script) {
      return res.status(404).json({ message: 'Script not found' });
    }

    const updatedScript = await Script.findById(id);
    res.status(200).json(updatedScript);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteScript = async (req, res) => {
  try {
    const { id } = req.params;

    const script = await Script.findByIdAndDelete(id);

    if (!script) {
      return res.status(404).json({ message: 'Script not found' });
    }

    res.status(200).json({ message: 'Script deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getScripts,
  getScript,
  createScript,
  updateScript,
  deleteScript,
};
