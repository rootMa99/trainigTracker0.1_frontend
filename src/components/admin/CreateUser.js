import React, { useState } from "react";
import c from "./CreateUser.module.css";
import Select from "react-select";
import { generateRandomString, sendEmail } from "../functions/utils";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "100%",

    textTransform: "none",
    borderRadius: "5px",
    fontFamily: `Formular, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                  "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
                  "Segoe UI Symbol"`,

    textAlign: "center",
    outline: "none",
    border: "1px solid #414141",
    backgroundColor: "transparent",
    boxShadow: "none",
    margin: "auto",
    "&:hover": {
      border: "1px solid #f33716",
      cursor: "pointer",
    },
  }),
  option: (provided, state) => ({
    width: "97%",
    padding: "0.5rem",
    color: state.isFocused ? "#f3f3f3" : "#f33716",
    backgroundColor: state.isFocused && "#474b4d",
    fontFamily: `Formular, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                  "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
                  "Segoe UI Symbol"`,
    textTransform: "none",
    outline: "none",
    textAlign: "center",
    "&:hover": {
      cursor: "pointer",
    },
  }),
  input: (provided) => ({
    ...provided,
    color: "#f3f3f3",
  }),
  singleValue: (p) => ({
    ...p,
    color: "#f3f3f3",
  }),
  menuList: (provided) => ({
    maxHeight: "200px",
    overflowY: "auto",
    overflowX: "hidden",
    scrollbarWidth: "thin",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": {
      width: "5px",
      backgroundColor: "#535151",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#f33716",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
  }),
};

const ROLE = [
  { label: "SELECT ROLE", value: "SELECT ROLE" },
  { label: "SHIFTLEADER", value: "SHIFTLEADER" },
  { label: "ADMIN", value: "ADMIN" },
  { label: "TRAINER", value: "TRAINER" },
];
const SL = [
  { label: "HAMDI ABDERRAHIM", value: "HAMDI ABDERRAHIM" },
  { label: "TOUMACH MUSTAPHA", value: "TOUMACH MUSTAPHA" },
  { label: "LAHMAMI ABDERRAHIM", value: "LAHMAMI ABDERRAHIM" },
  { label: "BENHMIDOU MOHAMMED", value: "BENHMIDOU MOHAMMED" },
  { label: "MOHAMED HMAMOU", value: "MOHAMED HMAMOU" },
  { label: "HAMDOUCH KAMAL", value: "HAMDOUCH KAMAL" },
  { label: "MOURAD LAOURCH", value: "MOURAD LAOURCH" },
  { label: "EL YAHYAOUI OUADIE", value: "EL YAHYAOUI OUADIE" },
  { label: "JAMAL IDRISS", value: "JAMAL IDRISS" },
  { label: "BASTANI YASSINE", value: "BASTANI YASSINE" },
  { label: "EL AOUFI KAMAL", value: "EL AOUFI KAMAL" },
  { label: "EL HADI MOHAMED", value: "EL HADI MOHAMED" },
  { label: "OU-DAALY MUSTAPHA", value: "OU-DAALY MUSTAPHA" },
  { label: "BAHMANE AHMED", value: "BAHMANE AHMED" },
];

const users=[
  {userName:"HAMDI ABDERRAHIM", role:"SHIFTLEADER" },
  {userName:"EL YAHYAOUI OUADIE", role:"SHIFTLEADER" },
  {userName:"BASTANI YASSINE", role:"SHIFTLEADER" },
  {userName:"BAHMANE AHMED", role:"SHIFTLEADER" },
  {userName:"EL HADI MOHAMED", role:"SHIFTLEADER" },
  {userName:"HAMDOUCH KAMAL", role:"SHIFTLEADER" },
  {userName:"MOHAMED HMAMOU", role:"SHIFTLEADER" },
]


const CreateUser = (p) => {
  const [user, setUser] = useState({
    role: "SELECT ROLE",
    data: { userName: "", password: "" },
  });

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(user);
    sendEmail();
    setUser({
      role: "SELECT ROLE",
      data: { userName: "", password: "" },
    });
  };
  const autoClicked = (e) => {
    setUser((p) => ({
      ...p,
      data: {
        ...p.data,
        password: generateRandomString(6),
      },
    }));
  };
  console.log(user);
  return (
    <React.Fragment>
      <div className={c.createUser}>
        <div className={c.employeeT}>
          <span></span>
          <h1> Create User </h1>
        </div>
        <div className={c.selectContainer}>
          <p>
            NOTE: IN ORDER TO CREATE A USER, YOU NEED TO SELECT A ROLE FIRST!
          </p>
          <div className={c["form-group"]}>
            <label htmlFor="trainingType">role</label>
            <Select
              options={ROLE}
              id="multiSelect"
              inputId="shiftleader1"
              styles={customStyles}
              placeholder="SELECT ROLE"
              onChange={(e) =>
                setUser((p) => ({
                  role: e.value,
                  data: { userName: "", password: "" },
                }))
              }
              value={{ label: user.role, value: user.role }}
            />
          </div>
          {user.role !== "SELECT ROLE" && (
            <form className={c.form} onSubmit={submitHandler}>
              <div className={c["form-group"]}>
                <label htmlFor="trainer">username</label>
                {user.role === "SHIFTLEADER" ? (
                  <Select
                    options={SL}
                    id="multiSelect"
                    inputId="shiftleader1"
                    styles={customStyles}
                    placeholder="SELECT SHIFTLEADER"
                    onChange={(e) =>
                      setUser((p) => ({
                        ...p,
                        data: {
                          ...p.data,
                          userName: e.value,
                        },
                      }))
                    }
                  />
                ) : (
                  <input
                    required
                    name="username"
                    id="trainer"
                    type="text"
                    placeholder="Enter Username"
                    onChange={(e) =>
                      setUser((p) => ({
                        ...p,
                        data: {
                          ...p.data,
                          userName: e.target.value,
                        },
                      }))
                    }
                  />
                )}
              </div>
              <div className={c["form-group"]}>
                <label htmlFor="pwd">password</label>
                <input
                  required
                  name="pwd"
                  id="pwd"
                  type="text"
                  placeholder="Enter Password"
                  value={user.data.password}
                  onChange={(e) =>
                    setUser((p) => ({
                      ...p,
                      data: {
                        ...p.data,
                        password: e.target.value,
                      },
                    }))
                  }
                />
                <label>or</label>
                <input
                  type="button"
                  value="AUTO GENERATE PASSWORD"
                  className={c.gen}
                  onClick={autoClicked}
                />
              </div>
              <button type="submit" className={c["form-submit-btn"]}>
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
      <div className={`${c.createUser} ${c.createUserShow}`}>
        <div className={c.employeeT}>
          <span></span>
          <h1> All Users </h1>
        </div>

       {users.length>0 && users.map(m=><div className={c.card}>
        <div className={c.bg}>
          <div className={c.detailsC}>
            <h4>user name</h4>
            <h3>{m.userName}</h3>
          </div>
          <div className={c.detailsC}>
            <h4>role</h4>
            <h3>{m.role}</h3>
          </div>
        </div>
        <div className={c.blob}></div>
      </div>) }
      </div>
    </React.Fragment>
  );
};
export default CreateUser;
