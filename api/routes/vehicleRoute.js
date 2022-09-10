import express from "express";
import {
    getVehicles,
    addVehicleInforamtion,
    updateVehicleInformation,
    deleteVehicleInformation,
} from "../controller/vehicleController.js";
const router = express.Router();

router.get("/", getVehicles);

router.post("/add-vehicle-information", addVehicleInforamtion);

router.put("/update-vehicle-information/:id", updateVehicleInformation);

router.delete("/delete-vehicle-information/:id", deleteVehicleInformation);

export default router;