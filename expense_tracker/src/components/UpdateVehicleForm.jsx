import React, { useState } from "react";
import "./AddVehicleForm.css";

const UpdateVehicleForm = ({vehicleData}) => {
  let [vehicleDetails, setVehicleDetails] = useState({
    vehicle_number: vehicleData.Vehicle_Number,
    rc_registration_date: vehicleData.RC_Registration_Date,
    rc_expiration_date: vehicleData.RC_Expiration_Date,
    puc_registration_date: vehicleData.PUC_Registration_Date,
    puc_expiration_date: vehicleData.PUC_Expiration_Date,
    insurance_registration_date: vehicleData.Insurance_Registration_Date,
    insurance_expiration_date: vehicleData.Insurance_Expiration_Date,
  });

  // console.log(vehicleDetails);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(vehicleDetails);
    const url = "http://localhost:5000/vehicles/add-vehicle-information";
    await fetch(
      url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vehicleDetails),
      },
      window.location.reload()
    );
  }

  return (
    <div className="text-white py-2 px-2 lg:py-8 lg:px-8">
      {/* border-green-900 */}
      <div className="component-name">
        <h1 className="text-2xl font-medium">
          <span className="component-number mr-6 p-1">2</span>
          Add Vehicle
        </h1>
      </div>

      <form
        method="post"
        className="add-user-form-dashboard py-8 mt-6"
        autoComplete="new-password"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-around">
          <div className="form__group">
            <input
              type="text"
              id="vehicle_number"
              className="form__field"
              value={vehicleDetails.vehicle_number}
              name="vehicle_number"
              placeholder="Vehicle Number"
              autoComplete="off"
              onChange={(e) => {
                setVehicleDetails({
                  ...vehicleDetails,
                  vehicle_number: e.target.value,
                });
              }}
            />
            <label htmlFor="vehicle_number" className="form__label">
              Vehicle Number
            </label>
          </div>

          <div className="form__group"></div>
        </div>

        <div className="flex justify-around mt-6">
          <div className="form__group flex justify-start">
            <h2 className="heading text-lg font-medium"> - RC Details</h2>
          </div>

          <div className="form__group "></div>
        </div>

        <div className="flex justify-around">
          <div className="form__group">
            <input
              type="date"
              id="vehicle_number"
              className="form__field"
              value={vehicleDetails.rc_registration_date}
              name="rc_registration_date"
              placeholder="Vehicle Number"
              autoComplete="off"
              onChange={(e) => {
                setVehicleDetails({
                  ...vehicleDetails,
                  rc_registration_date: e.target.value,
                });
              }}
            />
            <label htmlFor="vehicle_number" className="form__label">
              Registered Date
            </label>
          </div>

          <div className="datepicker form__group">
            <input
              type="date"
              id="vehicle_number"
              className="form__field"
              value={vehicleDetails.rc_expiration_date}
              name="rc_expiration_date"
              placeholder="Vehicle Number"
              autoComplete="off"
              onChange={(e) => {
                setVehicleDetails({
                  ...vehicleDetails,
                  rc_expiration_date: e.target.value,
                });
              }}
            />
            <label htmlFor="vehicle_number" className="form__label">
              Expiry Date
            </label>
          </div>
        </div>

        <div className="flex justify-around mt-6">
          <div className="form__group flex justify-start">
            <h2 className="heading text-lg font-medium"> - PUC Details</h2>
          </div>

          <div className="form__group "></div>
        </div>

        <div className="flex justify-around">
          <div className="form__group ">
            <input
              type="date"
              id="vehicle_number"
              className="form__field"
              value={vehicleDetails.puc_registration_date}
              name="puc_registration_date"
              placeholder="Vehicle Number"
              autoComplete="off"
              onChange={(e) => {
                setVehicleDetails({
                  ...vehicleDetails,
                  puc_registration_date: e.target.value,
                });
              }}
            />
            <label htmlFor="vehicle_number" className="form__label">
              Registered Date
            </label>
          </div>

          <div className="datepicker form__group">
            <input
              type="date"
              id="vehicle_number"
              className="form__field"
              value={vehicleDetails.puc_expiration_date}
              name="puc_expiration_date"
              placeholder="Vehicle Number"
              autoComplete="off"
              onChange={(e) => {
                setVehicleDetails({
                  ...vehicleDetails,
                  puc_expiration_date: e.target.value,
                });
              }}
            />
            <label htmlFor="vehicle_number" className="form__label">
              Expiry Date
            </label>
          </div>
        </div>

        <div className="flex justify-around mt-6">
          <div className="form__group flex justify-start">
            <h2 className="heading text-lg font-medium">
              {" "}
              - Insurance Details
            </h2>
          </div>

          <div className="form__group "></div>
        </div>

        <div className="flex justify-around">
          <div className="form__group ">
            <input
              type="date"
              id="vehicle_number"
              className="form__field"
              value={vehicleDetails.insurance_registration_date}
              name="insurance_registration_date"
              placeholder="Vehicle Number"
              autoComplete="off"
              onChange={(e) => {
                setVehicleDetails({
                  ...vehicleDetails,
                  insurance_registration_date: e.target.value,
                });
              }}
            />
            <label htmlFor="vehicle_number" className="form__label">
              Registered Date
            </label>
          </div>

          <div className="datepicker form__group">
            <input
              type="date"
              id="vehicle_number"
              className="form__field"
              value={vehicleDetails.insurance_expiration_date}
              name="insurance_expiration_date"
              placeholder="Vehicle Number"
              autoComplete="off"
              onChange={(e) => {
                setVehicleDetails({
                  ...vehicleDetails,
                  insurance_expiration_date: e.target.value,
                });
              }}
            />
            <label htmlFor="vehicle_number" className="form__label">
              Expiry Date
            </label>
          </div>
        </div>

        <div className="flex justify-around mt-6">
          <div className="form__group ">
            <div></div>
          </div>

          <div className="form__group flex justify-end">
            <button className="add-vehicle-button py-2" type="submit">
              Add Vehicle
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateVehicleForm;
