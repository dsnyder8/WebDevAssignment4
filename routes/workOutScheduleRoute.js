import express from "express";
import Schedule from "../Models/WorkOutScheduleSchema.js";


const router = express.Router();

//POST
router.post("/", async (req, res) => {
    try {
        const newSchedule = await Schedule.create({
            user: req.body.user,
            dayOfWeek: req.body.dayOfWeek,
            targetBodyPart: req.body.targetBodyPart,
            exercise: req.body.exercise,
            isRestDay: req.body.isRestDay,
        });

        res.status(201).json(newSchedule);
    } catch (error) {
        res.status(400).json({ error: "Failed to create schedule" });
    }
});


//GET ALL
router.get("/", async (req, res) => {
    try {
            const schedules = await Schedule.find();
            res.json(schedules);
        } catch (error) {
            res.status(500).json({ error: "Failed to get schedules" });
        }
});


//GET ONE
router.get("/:id", async (req, res) => {
    try{
        const schedule = await Schedule.findById(req.params.id);

        if(!schedule){
            return res.status(404).json({ error: "Schedule could not be found" });
        }
        res.json(schedule);

    } catch (error) {
        res.status(400).json({ error: "NOT VALID ID" });
    }
})


//UPDATE
router.put("/:id", async (req, res) => {
    try{
        const schedule = await Schedule.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!schedule) {
            return res.status(404).json({ error: "Schedule could not be found" });
        }
        res.json(schedule);
    } catch (error) {
        res.status(400).json({ error: "NOT VALID ID" });
    }
});


// DELETE
router.delete("/:id", async (req, res) => {
    try{
        const deletedSchedule = await Schedule.findByIdAndDelete(req.params.id);

        if (!deletedSchedule) {
            return res.status(404).json({ error: "Schedule could not be found" });
        }

        res.json({ message: "Deleted" });
    }   catch (error)  {
        res.status(400).json({ error: "NOT VALID ID" });
    }
});

export default router;
