const mongoose = require('mongoose');

const StepSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    required: false,
  },
  value: {
    type: String,
    required: false,
  },
  timestamp: {
    type: Number,
    required: false,
  },
  value: {
    type: String,
    required: false,
  },
  testId: {
    type: String,
    required: false,
  },
  className: {
    type: String,
    required: false,
  },
});

const ScriptSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter script name'],
    },

    steps: {
      type: [StepSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Script = mongoose.model('Script', ScriptSchema);

module.exports = Script;
