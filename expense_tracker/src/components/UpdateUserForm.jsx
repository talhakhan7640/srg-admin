import React, { useState } from "react";
import {useNavigate } from "react-router-dom";

import "./UpdateUserForm.css";

const UpdateUserForm = ({userData}) => {
  const navigate = useNavigate();

  let  [user, setUser] = useState({
    first_name: userData.First_Name,
		middle_name : '',
    last_name: userData.Last_Name,
    mobile_number: userData.Mobile_Number,
    alternate_mobile_number: userData.Alternate_Mobile_Number,
    address: userData.Address,
    username: userData.Username,
    password: userData.Password,
  });

  const userID = userData.First_Name + "-" + userData.Last_Name;

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("I got pressed.");
		const url = 'http://localhost:5000/users/update-user/' + userID;
		console.log(url);

		const response = await fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user)
		}, window.location.reload())
		
	}

  return (
    <div className="text-white py-2 px-2 lg:py-8 lg:px-8">
        {/* border-green-900 */}
        <div className="component-name">
          <h1 className=" text-2xl font-medium">
            <span className="component-number  mr-6 p-1">~</span>
            Update Employee
          </h1>
        </div>

        <form
          method="post"
          onSubmit={handleSubmit}
          action="/users/create-user"
          className="add-user-form-dashboard py-8 mt-6 "
          autoComplete="new-password"
        >
          <div className="flex justify-around">
            <div className="form__group ">
              <input
                type="text"
                id="first_name"
                className="form__field"
                name="first_name"
                placeholder="First Name"
                autoComplete="off"
                value={user.first_name}
                onChange={(e) => {
                  setUser({ ...user, first_name: e.target.value });
                }}
              />
              <label htmlFor="first_name" className="form__label">
                First Name
              </label>
            </div>

            <div className="form__group">
              <input
                type="text"
                id="last_name"
                className="form__field"
                name="last_name"
                placeholder="Last Name"
                value={user.last_name}
                onChange={(e) => {
                  setUser({ ...user, last_name: e.target.value });
                }}
              />
              <label htmlFor="last_name" className="form__label">
                Last Name
              </label>
            </div>
          </div>

          <div className="flex justify-around">
            <div className="form__group">
              <input
                type="tel"
                id="mobile_number"
                className="form__field"
                name="mobile_number"
                placeholder="Mobile Number"
                value={user.mobile_number}
                onChange={(e) => {
                  setUser({ ...user, mobile_number: e.target.value });
                }}
              />
              <label htmlFor="mobile_number" className="form__label">
                Mobile Number
              </label>
            </div>

            <div className="form__group">
              <input
                type="tel"
                id="alternate_mobile_number"
                className="form__field"
                name="alternate_mobile_number"
                placeholder="Alternate Number"
                value={user.alternate_mobile_number}
                onChange={(e) => {
                  setUser({ ...user, alternate_mobile_number: e.target.value });
                }}
              />
              <label htmlFor="alternate_mobile_number" className="form__label">
                Alternate Number
              </label>
            </div>
          </div>

          <div className="user-address-container">
            <div className="form__group__for__address mx-auto">
              <input
                type="a"
                id="address"
                className="form__field"
                name="address"
                placeholder="Address"
                value={user.address}
                onChange={(e) => {
                  setUser({ ...user, address: e.target.value });
                }}
              />
              <label htmlFor="address" className="form__label">
                Address
              </label>
            </div>
          </div>

          <div className="flex justify-around">
            <div className="form__group ">
              <input
                type="text"
                id="username"
                className="form__field"
                name="username"
                placeholder="Username"
                value={user.username}
                onChange={(e) => {
                  setUser({ ...user, username: e.target.value });
                }}
              />
              <label htmlFor="username" className="form__label">
                Username
              </label>
            </div>

            <div className="form__group">
              <input
                type="text"
                id="password"
                className="form__field"
                name="password"
                placeholder="Password"
                value={user.password}
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                }}
              />
              <label htmlFor="password" className="form__label">
                Password
              </label>
            </div>
          </div>

          <div className="flex justify-around mt-6">
            <div className="form__group ">
              <div> </div>
            </div>

            <div className="form__group flex justify-end">
              <button className="add-user-button py-2" type="submit">
               Update Employee
              </button>
            </div>
          </div>
        </form>
    </div>
  );
};

export default UpdateUserForm;
