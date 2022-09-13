import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import path from "path";
import { fileURLToPath } from "url";
import vehicleRoute from "./routes/vehicleRoute.js"
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildPath = path.join(__dirname, './expense_tracker/build');

console.log(buildPath);

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

// API
app.use("/api/users", userRoute);
app.use("/api/vehicles", vehicleRoute);

app.use(express.static(path.join(buildPath)));

// console.log(__dirname, '../expense_tracker', 'build', "index.html");

app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
})