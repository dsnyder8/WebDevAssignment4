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
            

            const dbFilter = {};

            //FILITERING
            if (req.query.dayOfWeek !== undefined) {
                dbFilter.dayOfWeek = req.query.dayOfWeek;
            }
            if (req.query.targetBodyPart !== undefined) {
                dbFilter.targetBodyPart = req.query.targetBodyPart;
            }
            if (req.query.isRestDay !== undefined) {
                dbFilter.isRestDay = req.query.isRestDay === "true";
            }

            //SORTING
		    const sorting = req.query.sort;

            //PAGINATION
		    const pageNum = parseInt(req.query.page) || 1
		    const limitOfResults = parseInt(req.query.limit) || 10
		    const skip = (pageNum - 1) * limitOfResults;

            const schedules = await Schedule.find(dbFilter).populate("user").populate("exercise").sort(sorting).limit(limitOfResults).skip(skip);

            res.json(schedules);
        } catch (error) {
            res.status(500).json({ error: "Failed to get schedules" });
        }
});


//GET ONE
router.get("/:id", async (req, res) => {
    try{
        const schedule = await Schedule.findById(req.params.id).populate("user").populate("exercise");
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

