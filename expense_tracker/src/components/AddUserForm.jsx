import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./AddUserForm.css";

const AddUserForm = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    mobile_number: "",
    alternate_mobile_number: "",
    address: "",
    username: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    // console.log("I got pressed.");
    const url = "http://localhost:5000/users/create-user";
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }, window.location.reload())
  }

  return (
    <div className="text-white py-2 px-2 lg:py-8 lg:px-8">
      {/* border-green-900 */}
      <div className="component-name">
        <h1 className=" text-2xl font-medium">
          <span className="component-number  mr-6 p-1">1</span>
          Add Employee
        </h1>
      </div>

      <form
        method="post"
        onSubmit={handleSubmit}
        action="/create-user"
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
              Add Employee
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;
