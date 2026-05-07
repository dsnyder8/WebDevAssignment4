import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "../MangoDB/mongo-connection.js";
import "../Models/ExerciseSchema.js";
import "../Models/UserSchema.js";
import exerciseRoute from "../routes/exerciseRoute.js";
import userRoute from "../routes/userRoute.js";
import workOutScheduleRoute from "../routes/workOutScheduleRoute.js";

const app = express();

await connectDB();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/exercises", exerciseRoute);
app.use("/api/users", userRoute);
app.use("/api/schedules", workOutScheduleRoute);

const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
