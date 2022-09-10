import express, { response } from "express";
import db from "../firebaseConfig.js";
import { Timestamp } from "firebase-admin/firestore";

/**
 * ***** Get Users *****
 * -
 * The below function is a controller responsible for
 * getting all the user entries from database.
 *
 * And then the function is being exported for making an
 * API request for getting all users from databse.
 *
 */
export const getUsers = async (req, res) => {
  const usersRef = db.collection("Users");
  const snapshot = await usersRef.get();
  snapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
  });
};

/**
 *  ***** Create User *****
 *
 * The below function is a controller responsible for
 * performing a task of creating a new user entry in database.
 *
 * And then the function is being exported for making an
 * API request for creating a new user entry in databse.
 *
 */
export const createUser = async (req, res) => {
  // Set the name information.
  var firstName = req.body.first_name;
  var lastName = req.body.last_name;

  // Set the contact information.
  var mobileNumber = req.body.mobile_number;
  var alternateMobileNumber = req.body.alternate_mobile_number;
  var address = req.body.address;

  // Create username and password for the user.
  var username = req.body.username;
  var password = req.body.password;

  // Set data for adding
  var data = {
    First_Name: firstName,
    Last_Name: lastName,
    Mobile_Number: mobileNumber,
    Alternate_Mobile_Number: alternateMobileNumber,
    Address: address,
    Username: username,
    Password: password,
    Added_on: Timestamp.fromDate(new Date()),
  };

  var docName = firstName + "-" + lastName;

  var res = await db
    .collection("Users")
    .doc(docName)
    .set({ data })
    .then(() => console.log(`Added user with Name: `, docName));
};

/**
 * ***** Update User *****
 *
 * The below function is a controller responsible for
 * performing a task of updating a user entry in database.
 *
 * And then the function is being exported for making an
 * API request for updating a user entry in databse.
 *
 */
export const updateUser = async (req, res) => {
  // Set the name information.
  var firstName = req.body.first_name;
  var middleName = req.body.middle_name;
  var lastName = req.body.last_name;

  // Set the contact information.
  var mobileNumber = req.body.mobile_number;
  var alternateMobileNumber = req.body.alternate_mobile_number;
  var address = req.body.address;

  // Create username and password for the user.
  var username = req.body.username;
  var password = req.body.password;

  var data = {
    First_Name: firstName,
    Middle_Name: middleName,
    Last_Name: lastName,
    Mobile_Number: mobileNumber,
    Alternate_Mobile_Number: alternateMobileNumber,
    Address: address,
    Username: username,
    Password: password,
  };

  var docName = firstName + "-" + lastName;

  var res = await db
    .collection("Users")
    .doc(req.params.id)
    .set({ data })
    .then(() => console.log(`Updated user with name: `, docName));
};

/**
 * ***** Delete User *****
 *
 * The below function is a controller responsible for
 * performing a task of deleting a user entry from database.
 *
 * And then the function is being exported for making an
 * API request for deleting a user entry from databse.
 *
 */
export const deleteUser = async (req, res) => {
  var res = await db
    .collection("Users")
    .doc(req.params.id)
    .delete()
    .then(() => console.log("Deleted user with name:", req.params.id));
};
