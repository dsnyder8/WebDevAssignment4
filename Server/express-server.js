import express from 'express';
import{ connectDB} from './MangoDB/mango-connection.js';
import Exercise from './Models/ExerciseSchema.js';

const app = express();
await connectDB();
app.use(express.json()); // Essential Middleware

    
// ==========================================
// NEW: GET Route (Read Data from MongoDB)
// ==========================================
app.get("/api/exercises", async (req, res) => {
    let dbFilter = {};
    
    if (req.query.category !== undefined) {
        dbFilter.category = req.query.category;
    }
    
    let exercises = await Exercise.find(dbFilter);
    
    
    res.json(exercises);
});

// ==========================================
// NEW: POST Route (Create Data in MongoDB)
// ==========================================
app.post("/api/exercises", async (req, res) => {
    try {
        // Mongoose automatically generates a unique _id for us!
        const newExercise = await Exercise.create({
            description: req.body.description, 
            category: req.body.category,
            targetRepetitions: req.body.targetRepetitions,
            targetTimeDuration: req.body.targetTimeDuration,
            user: req.body.user,
        });
        
        // Send the newly created exercise back to the screen/Postman
        res.status(201).json(newExercise); 
    } catch (error) {
        // If the user forgets to send 'description' (which is required), catch the error
        res.status(400).json({ error: "Failed to create exercise. Description is required." });
    }
});

// ==========================================
// UPDATED: PUT Route (Update Data in MongoDB)
// ==========================================
app.put("/api/exercises/:id", async(req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.id);
        if (!exercise) {
            return res.status(404).json({ error: "Exercise not found" });
        }
        
        // Update fields if provided
        if (req.body.description !== undefined) {
            exercise.description = req.body.description;
        }
        if (req.body.category !== undefined) {
            exercise.category = req.body.category;
        }
        if (req.body.targetRepetitions !== undefined) {
            exercise.targetRepetitions = req.body.targetRepetitions;
        }
        if (req.body.targetTimeDuration !== undefined) {
            exercise.targetTimeDuration = req.body.targetTimeDuration;
        }
        if (req.body.user !== undefined) {
            exercise.user = req.body.user;
        }
        if (req.body.timeCreated !== undefined) {
            exercise.timeCreated = req.body.timeCreated;
        }
        if (req.body.timeCompleted !== undefined) {
            exercise.timeCompleted = req.body.timeCompleted;
        }
        
        await exercise.save();
        res.json(exercise);
    } catch (error) {
        // This catches invalid ID formats so your server doesn't crash
        res.status(400).json({ error: "Invalid exercise ID" });
    }
});

// ==========================================
// UPDATED: DELETE Route (Delete Data from MongoDB)
// ==========================================
app.delete("/api/exercises/:id", async(req, res) => {
    try {
        // This single line finds it and deletes it, replacing exercise.remove()
        const deletedExercise = await Exercise.findByIdAndDelete(req.params.id);
        
        if (!deletedExercise) {
            return res.status(404).json({ error: "Exercise not found" });
        }
        
        res.status(204).send(); // 204 = No Content
    } catch (error) {
        res.status(400).json({ error: "Invalid exercise ID" });
    }
});

app.listen(3000, "0.0.0.0", () => {
    console.log("Server is running on port 3000");
});