import React, { useCallback, useEffect, useState } from "react";
import c from "./CreateUser.module.css";
import Select from "react-select";
import BackDrop from "../UI/BackDrop";
import {
  generateRandomString,
  getlabelandvalue,
  sendEmail,
} from "../functions/utils";
import { useSelector } from "react-redux";
import api from "../../service/api";
import NetworkNotify from "../UI/NetworkNotify";
import EditOrDeleteUser from "./EditOrDeleteUser";

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

const CreateUser = (p) => {
  const { isLoged } = useSelector((s) => s.login);
  const [user, setUser] = useState({
    role: "SELECT ROLE",
    data: { userName: "", password: "" },
  });
  const [fetchedUsers, setUsers] = useState({
    shiftleaders: [],
    users: [],
  });
  const [err, setErr] = useState({ status: false, message: "" });
  const [success, setSuccess] = useState({ status: false, message: "" });
  const [edu, setEdu] = useState({ status: false, data: {} });
  const callback = useCallback(async () => {
    try {
      const response = await fetch(`${api}/root/data/shiftleaders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isLoged.token}`,
        },
      });

      const data = await response.json();
      console.log(data);
      setUsers((p) => ({ ...p, shiftleaders: data }));
    } catch (error) {
      console.error("Error:", error);
    }
    try {
      const response = await fetch(`${api}/root/data/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isLoged.token}`,
        },
      });

      const data = await response.json();
      setUsers((p) => ({ ...p, users: data }));
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  }, [isLoged]);

  useEffect(() => {
    callback();
  }, [callback]);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(user);
    let uri = `${api}/root`;
    if (user.role === "SHIFTLEADER") {
      uri += "/createSl";
    }
    if (user.role === "ADMIN") {
      uri += "/createAdmin";
    }
    if (user.role === "TRAINER") {
      uri += "/createTrainer";
    }
    try {
      const response = await fetch(uri, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isLoged.token}`,
        },
        body: JSON.stringify(user.data),
      });

      const data = await response.json();
      setSuccess({ status: true, message: "Account created successfully" });
      console.log(data);
      sendEmail(
        "emailTo@aptiv.com",
        "new account",
        `username: ${user.data.userName} your password: ${user.data.password}`
      );
      setUser({
        role: "SELECT ROLE",
        data: { userName: "", password: "" },
      });
      const rdata = fetchedUsers.users;
      rdata.push({ role: user.role, userName: user.data.userName });
      setUsers((p) => ({ ...p, users: rdata }));
    } catch (error) {
      console.error("Error:", error);
      setErr({
        status: true,
        message:
          "Something has gone wrong, we were not able to save this action, please try it again. ",
      });
    }
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

  if (err.status || success.status) {
    setTimeout(() => {
      setErr({ status: false, message: "" });
      setSuccess({ status: false, message: "" });
    }, 2000);
  }
  const close = () => {
    setEdu({ status: false, data: {} });
  };

  return (
    <React.Fragment>
      {edu.status && (
        <React.Fragment>
          <BackDrop click={close} />
          <EditOrDeleteUser data={edu.data} click={close} />
        </React.Fragment>
      )}

      {err.status && <NetworkNotify message={err.message} success={false} />}
      {success.status && (
        <NetworkNotify message={success.message} success={true} />
      )}
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
                    options={getlabelandvalue(
                      fetchedUsers.shiftleaders.filter((f) => f !== null)
                    )}
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
        <div className={c.containerCard}>
          {fetchedUsers.users.length > 0 &&
            fetchedUsers.users.map((m, i) => (
              <div
                className={c.card}
                key={i}
                onClick={() => setEdu({ status: true, data: m })}
              >
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
              </div>
            ))}
        </div>
      </div>
    </React.Fragment>
  );
};
export default CreateUser;
