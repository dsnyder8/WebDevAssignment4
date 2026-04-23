import express from "express";
import Exercise from "../Models/ExerciseSchema.js";

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const dbFilter = {};

		if (req.query.category !== undefined) {
			dbFilter.category = req.query.category;
		}

		const exercises = await Exercise.find(dbFilter);
		res.json(exercises);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch exercises" });
	}
});

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
