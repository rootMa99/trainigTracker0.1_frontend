import React, { useState } from "react";
import c from "./CreateUser.module.css";
import Select from "react-select";

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
    { label: "SELECT ROLE", value: "" },
  { label: "SHIFTLEADER", value: "shiftleader" },
  { label: "ADMIN", value: "admin" },
  { label: "TRAINER", value: "trainer" },
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

const CreateUser = (p) => {
  const [user, setUser] = useState({
    role: "",
    data: { userName: "", password: "" },
  });


  console.log(user)
  return (
    <React.Fragment>
      <div className={c.createUser}>
        <div className={c.employeeT}>
          <span></span>
          <h1> Create User </h1>
        </div>
      </div>
      <div className={c.selectContainer}>
        <p>NOTE: IN ORDER TO CREATE A USER, YOU NEED TO SELECT A ROLE FIRST!</p>
        <div className={c["form-group"]}>
          <label htmlFor="trainingType">role</label>
          <Select
            options={ROLE}
            id="multiSelect"
            inputId="shiftleader1"
            styles={customStyles}
            placeholder="select ROLE"
            onChange={(e) => setUser((p) => ({ ...p, role: e.value }))}
            defaultValue={{ label: user.role, value: user.role }}
          />
        </div>
        {user.role !== "" && (
          <form className={c.form}>
            <div className={c["form-group"]}>
              <label htmlFor="trainer">username</label>
              {user.role === "shiftleader" ? (
                <Select
                  options={SL}
                  id="multiSelect"
                  inputId="shiftleader1"
                  styles={customStyles}
                  placeholder="select shiftleader"
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
                  placeholder="enter username"
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
                placeholder="enter password"
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
            </div>
            <button type="submit" className={c["form-submit-btn"]}>
              Submit
            </button>
          </form>
        )}
      </div>
    </React.Fragment>
  );
};
export default CreateUser;
