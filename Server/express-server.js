import express from 'express';
import
const app = express();
await connectDB();
app.use(express.json()); // Essential Middleware

    
// ==========================================
// NEW: GET Route (Read Data from MongoDB)
// ==========================================
app.get("/api/tasks", async (req, res) => {
    let dbFilter = {};
    
    // 2. Check if the user is asking for a specific filter
    if (req.query.completed !== undefined) {
        dbFilter.completed = req.query.completed === "true";
    }
    
    // 1. Librarian gets the list from Mongoose using the filter
    // Notice we use your imported 'task' here instead of readTasks()
    let tasks = await Task.find(dbFilter);
    
    // 3. Send the list to the screen/Postman
    res.json(tasks);
});

// ==========================================
// NEW: POST Route (Create Data in MongoDB)
// ==========================================
app.post("/api/tasks", async (req, res) => {
    try {
        // Mongoose automatically generates a unique _id for us!
        const newTask = await Task.create({
            text: req.body.text, 
            completed: req.body.completed || false 
        });
        
        // Send the newly created task back to the screen/Postman
        res.status(201).json(newTask); 
    } catch (error) {
        // If the user forgets to send 'text' (which is required), catch the error
        res.status(400).json({ error: "Failed to create task. Text is required." });
    }
});

// ==========================================
// UPDATED: PUT Route (Update Data in MongoDB)
// ==========================================
app.put("/api/tasks/:id", async(req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        
        // Update fields if provided
        if (req.body.text !== undefined) {
            task.text = req.body.text;
        }
        if (req.body.completed !== undefined) {
            task.completed = req.body.completed;
        }
        
        await task.save();
        res.json(task);
    } catch (error) {
        // This catches invalid ID formats so your server doesn't crash
        res.status(400).json({ error: "Invalid task ID" });
    }
});

// ==========================================
// UPDATED: DELETE Route (Delete Data from MongoDB)
// ==========================================
app.delete("/api/tasks/:id", async(req, res) => {
    try {
        // This single line finds it and deletes it, replacing task.remove()
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        
        if (!deletedTask) {
            return res.status(404).json({ error: "Task not found" });
        }
        
        res.status(204).send(); // 204 = No Content
    } catch (error) {
        res.status(400).json({ error: "Invalid task ID" });
    }
});

app.listen(3000, "0.0.0.0", () => {
    console.log("Server is running on port 3000");
});