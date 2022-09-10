import express from "express";
import db from "../firebaseConfig.js";
import { Timestamp } from "firebase-admin/firestore";

/**
 * ***** Get Vehicles *****
 * -
 * The below function is a controller responsible for
 * getting all the vehicle entries from database.
 *
 * And then the function is being exported for making an
 * API request for getting all vehicles from databse.
 *
 */
export const getVehicles = async (req, res) => {
  const vehicleRef = db.collection("Vehicles");
  const snapshot = await vehicleRef.get();
  snapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
  });
};

/**
 *  ***** Add Vehicle Information *****
 *
 * The below function is a controller responsible for
 * performing a task of adding a new vehicle entry in database.
 *
 * And then the function is being exported for making an
 * API request for adding a new vehilce entry in databse.
 *
 */
export const addVehicleInforamtion = async (req, res) => {
  // Set the vehicle number.
  var vehicleNumber = req.body.vehicle_number;

  // Set vehicle's RC information.
  var rcRegistrationDate = req.body.rc_registration_date;
  var rcExpirationData = req.body.rc_expiration_date;

  // Set vehicle's PUC information.
  var pucRegistrationDate = req.body.puc_registration_date;
  var pucExpirationDate = req.body.puc_expiration_date;

  // Set vehicle's insurance information.
  var insuranceRegistrationDate = req.body.insurance_registration_date;
  var insuranceExpirationDate = req.body.insurance_expiration_date;

  // Prepare data for adding.
  var data = {
    Vehicle_Number: vehicleNumber,
    RC_Registration_Date: rcRegistrationDate,
    RC_Expiration_Date: rcExpirationData,
    PUC_Registration_Date: pucRegistrationDate,
    PUC_Expiration_Date: pucExpirationDate,
    Insurance_Registration_Date: insuranceRegistrationDate,
    Insurance_Expiration_Date: insuranceExpirationDate,
    Added_On: Timestamp.fromDate(new Date()),
  };

  var res = await db
    .collection("Vehicles")
    .doc(vehicleNumber)
    .set({ data })
    .then(() => console.log("Added vehicle with number: ", vehicleNumber));
};

/**
 * ***** Update Vehicle Inforamtion *****
 *
 * The below function is a controller responsible for
 * performing a task of updating a vehicle information in database.
 *
 * And then the function is being exported for making an
 * API request for updating a vehicle information in databse.
 *
 */
export const updateVehicleInformation = async (req, res) => {
  // Set the vehicle number.
  var vehicleNumber = req.body.vehicle_number;

  // Set vehicle's RC information.
  var rcRegistrationDate = req.body.rc_registration_date;
  var rcExpirationData = req.body.rc_expiration_date;

  // Set vehicle's PUC information.
  var pucRegistrationDate = req.body.puc_registration_date;
  var pucExpirationDate = req.body.puc_expiration_date;

  // Set vehicle's insurance information.
  var insuranceRegistrationDate = req.body.insurance_registration_date;
  var insuranceExpirationDate = req.body.insurance_expiration_date;

  // Prepare data for adding.
  var data = {
    Vehicle_Number: vehicleNumber,
    RC_Registration_Date: rcRegistrationDate,
    RC_Expiration_Date: rcExpirationData,
    PUC_Registration_Date: pucRegistrationDate,
    PUC_Expiration_Date: pucExpirationDate,
    Insurance_Registration_Date: insuranceRegistrationDate,
    Insurance_Expiration_Date: insuranceExpirationDate,
  };

  var res = await db
    .collection("Vehicles")
    .doc(vehicleNumber)
    .set({ data })
    .then(() => console.log("Updated vehicle with number: ", vehicleNumber));
};

/**
 * ***** Delete Vehicle Information *****
 *
 * The below function is a controller responsible for
 * performing a task of deleting a vehicle information from database.
 *
 * And then the function is being exported for making an
 * API request for deleting a vehicle information from databse.
 *
 */
export const deleteVehicleInformation = async (req, res) => {
  var res = await db
    .collection("Vehicles")
    .doc(req.params.id)
    .delete()
    .then(() => console.log("Deleted vehicle with number:", req.params.id));
};
