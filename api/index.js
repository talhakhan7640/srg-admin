import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import path from "path";
import vehicleRoute from "./routes/vehicleRoute.js"
dotenv.config();


const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

// API
app.use("/api/users", userRoute);
app.use("/api/vehicles", vehicleRoute);

app.use(express.static(path.join(__dirname, "expense_tracker", "build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "expense_tracker", "build", "index.html"));
});
// 
// app.use(express.static(path.join(__dirname +  '../build')))
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../build'))
// })
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
})