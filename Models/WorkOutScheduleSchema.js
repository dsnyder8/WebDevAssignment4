import mongoose from "mongoose";
const Schema = mongoose.Schema;

const workoutScheduleSchema = new Schema({

    //User (Grabs from the UserSchema)
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    //What day of the week it is
    dayOfWeek: {
        type: String,
        enum: [
            "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
        ],
        required: true,
    },

    //What body part is being worked out
    targetBodyPart: {
        type: String,
        enum: [
            "Chest", "Back", "Legs", "Shoulders", "Arms", "Core", "Full Body", "Cardio"
        ],
        required: false,
    },

    //Exercise (Grabs from the ExerciseSchema.js)
 exercises: [{ 
        type: Schema.Types.ObjectId,
        ref: "Exercise"
    }],

    //Check to see if it is a rest day
    isRestDay: {
        type: Boolean,
        default: false
    }
}, 

{timestamps: true, toJSON: { virtuals: true }});

// This will display everything in the format: Targeted Body Part Based On Day: "Tuesday: Chest"
workoutScheduleSchema.virtual("Targeted Body Part Based On Day").get(function() {
    return `${this.dayOfWeek}: ${this.targetBodyPart}`;
  });
export default mongoose.model("WorkoutSchedule", workoutScheduleSchema);