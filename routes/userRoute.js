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

export default router;
