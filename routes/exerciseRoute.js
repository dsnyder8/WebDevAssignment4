import express from "express";
import Exercise from "../Models/ExerciseSchema.js";

const router = express.Router();

// GET ALL
router.get("/", async (req, res) => {
	try {
		const dbFilter = {};

		//FILITERING
		if (req.query.category !== undefined) {
			dbFilter.category = req.query.category;
		}
		if(req.query.targetBodyPart !== undefined) {
			dbFilter.targetBodyPart = req.query.targetBodyPart;
		}

		//$regex
        if (req.query.search) {
			//The i here at the end makes is so no case sensitivity
            dbFilter.description = { $regex: req.query.search, $options: "i" };
        }

		//SORTING
		const sorting = req.query.sort;

		//PAGINATION
		const pageNum = parseInt(req.query.page) || 1
		const limitOfResults = parseInt(req.query.limit) || 10
		const skip = (pageNum - 1) * limitOfResults;


		const exercises = await Exercise.find(dbFilter).populate("user").sort(sorting).limit(limitOfResults).skip(skip);
		res.json(exercises);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch exercises" });
	}
});

// GET ONE
router.get("/:id", async (req, res) => {
	try {
		const exercise = await Exercise.findById(req.params.id).populate("user");

		if (!exercise) {
			return res.status(404).json({ error: "Exercise not found" });
		}

		res.json(exercise);
	} catch (error) {
		res.status(400).json({ error: "Invalid exercise ID" });
	}
});

//POST
router.post("/", async (req, res) => {
	try {
		const newExercise = await Exercise.create({
			description: req.body.description,
			category: req.body.category,
			targetRepetitions: req.body.targetRepetitions,
			targetTimeDuration: req.body.targetTimeDuration,
			user: req.body.user,
		});

		res.status(201).json(newExercise);
	} catch (error) {
		res.status(400).json({ error: "Failed to create exercise" });
	}
});

//UPDATE
router.put("/:id", async (req, res) => {
	try {
		const exercise = await Exercise.findById(req.params.id);
		if (!exercise) {
			return res.status(404).json({ error: "Exercise not found" });
		}

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

		await exercise.save();
		res.json(exercise);
	} catch (error) {
		res.status(400).json({ error: "Invalid exercise ID" });
	}
});

//DELETE
router.delete("/:id", async (req, res) => {
	try {
		const deletedExercise = await Exercise.findByIdAndDelete(req.params.id);

		if (!deletedExercise) {
			return res.status(404).json({ error: "Exercise not found" });
		}

		res.status(204).send();
	} catch (error) {
		res.status(400).json({ error: "Invalid exercise ID" });
	}
});

export default router;
