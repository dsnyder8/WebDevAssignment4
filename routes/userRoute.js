import express from "express";
import User from "../Models/UserSchema.js";

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch users" });
	}
});

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

router.put("/:id", async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		if (req.body.user_name !== undefined) {
			user.user_name = req.body.user_name;
		}
		if (req.body.email !== undefined) {
			user.email = req.body.email;
		}
		if (req.body.password !== undefined) {
			user.password = req.body.password;
		}

		await user.save();
		res.json(user);
	} catch (error) {
		res.status(400).json({ error: "Invalid user ID" });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const deletedUser = await User.findByIdAndDelete(req.params.id);

		if (!deletedUser) {
			return res.status(404).json({ error: "User not found" });
		}

		res.status(204).send();
	} catch (error) {
		res.status(400).json({ error: "Invalid user ID" });
	}
});

export default router;
