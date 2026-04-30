import express from "express";
import User from "../Models/UserSchema.js";

 

const router = express.Router();

// GET ALL
router.get("/", async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch users" });
	}
});


// GET ONE
router.get("/:id", async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		res.json(user);
	} catch (error) {
		res.status(400).json({ error: "Invalid user ID" });
	}
});


// POST
router.post("/", async (req, res) => {
	try {
		const newUser = await User.create({
			user_name: req.body.user_name,
			email: req.body.email,
			password: req.body.password,
		});

		res.status(201).json(newUser);
	} catch (error) {
		res.status(400).json({ error: "Failed to create user" });
	}
});

// UPDATE
router.put("/:id", async (req, res) => {
	try {
		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			{
				user_name: req.body.user_name,
				email: req.body.email,
				password: req.body.password,
			},
			{ new: true, runValidators: true }
		);

		if (!updatedUser) {
			return res.status(404).json({ error: "User not found" });
		}

		res.json(updatedUser);
	} catch (error) {
		res.status(400).json({ error: "Failed to update user" });
	}
});

//DELETE
router.delete("/:id", async (req, res) => {
	try {
		const deletedUser = await User.findByIdAndDelete(req.params.id);

		if (!deletedUser) {
			return res.status(404).json({ error: "User not found" });
		}

		res.json({ message: "User has been deleted" });
	} catch (error) {
		res.status(400).json({ error: "Failed to delete user" });
	}
});

export default router;
