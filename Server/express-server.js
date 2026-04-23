import express from "express";
import { connectDB } from "../MangoDB/mongo-connection.js";
import "../Models/ExerciseSchema.js";
import "../Models/UserSchema.js";
import exerciseRoute from "../routes/exerciseRoute.js";
import userRoute from "../routes/userRoute.js";

const app = express();

await connectDB();
app.use(express.json());

app.use("/api/exercises", exerciseRoute);
app.use("/api/users", userRoute);

app.listen(3000, "0.0.0.0", () => {
  console.log("Server is running on port 3000");
});
