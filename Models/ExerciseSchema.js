import mongoose from "mongoose";
import WorkOutScheduleSchema from "./WorkOutScheduleSchema.js";
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
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
  // For weightlifting exercises, this field can be used to specify the weight in pounds or kilograms.
    weightUSE: {
    type: Number,
    required: false,
    min: 0,  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, 
{timestamps: true, toJSON: { virtuals: true }});

// This will display everything in the format: combined: "Cardio: 1 mile run"
ExerciseSchema.virtual("combined").get(function() {
  return `${this.category}: ${this.description}`;
});
export default mongoose.model("Exercise", ExerciseSchema);
