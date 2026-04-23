const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  user_name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Warm-up", "Cardio", "Weightlifting", "Cool-down"],
  },
  targetRepetitions: {
    type: Number,
    required: false,
    min: 1,
    max: 20,
  },
  targetTimeDuration: {
    type: Number,
    required: false,
    min: 1,
    max: 180,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  timeCreated: {
    type: Date,
    default: Date.now,
  },
  timeCompleted: {
    type: Date,
    default: null,
  },
});
