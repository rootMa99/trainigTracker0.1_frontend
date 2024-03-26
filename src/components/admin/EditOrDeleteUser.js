import React, { useEffect, useState } from "react";
import c from "./CreateUser.module.css";
import { useSelector } from "react-redux";
import api from "../../service/api";
import NetworkNotify from "../UI/NetworkNotify";

const EditOrDeleteUser = (p) => {
  const { isLoged } = useSelector((s) => s.login);
  const [pwd, setPwd] = useState({ pwd: "", mPwd: "" });
  const [matchP, setMatchP] = useState(true);
  const [err, setErr] = useState({ status: false, message: "" });
  const [success, setSuccess] = useState({ status: false, message: "" });
  const [isVibrating, setIsVibrating] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVibrating(false); // Stop vibration after 2 seconds
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVibrating(true); // Start vibration again after 2 seconds
      setTimeout(() => {
        setIsVibrating(false); // Stop vibration after 2 seconds
      }, 2000);
    }, 4000); // Interval of 4 seconds (2 seconds stop + 2 seconds wait)

    return () => clearInterval(interval);
  }, []);

  const changeMatchedpwd = (e) => {
    setPwd((prevState) => {
      const updatedPwd = { ...prevState, mPwd: e.target.value };
      if (updatedPwd.pwd !== updatedPwd.mPwd) {
        setMatchP(false);
      } else {
        setMatchP(true);
      }
      return updatedPwd;
    });
  };

  const submitHadler = async (e) => {
    e.preventDefault();
    console.log(p.data.userName, pwd.pwd);
    if (pwd.pwd.trim() !== "" && pwd.mPwd.trim() !== "") {
      let url =
        p.data.userName !== "root"
          ? `${api}/root/data/updateUserPwd?userName=${p.data.userName}&password=${pwd.pwd}`
          : `${api}/root/data/updateRootPwd?password=${pwd.pwd}`;
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${isLoged.token}`,
          },
        });

        // const data = await response.json();
        setSuccess({ status: true, message: "password updated successfully" });
        // console.log(data);
        p.click();
      } catch (error) {
        console.error("Error:", error);
        setErr({
          status: true,
          message:
            "Something has gone wrong, we were not able to save this action, please try it again. ",
        });
      }
    }
  };

  return (
    <React.Fragment>
      {err.status && <NetworkNotify message={err.message} success={false} />}
      {success.status && (
        <NetworkNotify message={success.message} success={true} />
      )}
      <div className={c.editDelete}>
      {p.data.userName === "root" && (
        <p className={ isVibrating ? `${c['vibrating-element']} ${c.notewarning}` : c.notewarning}>
        warning: Please be aware that you are trying to change the root password.
        </p>
      )}
        {!matchP && (
          <p className={c.noteS}>
            Note: In order to proceed, you will need to match the password and
            the re-password.
          </p>
        )}
        <p className={c.accountS}>
          <span>Account:</span> {p.data.userName}
        </p>
        <form className={c.form} onSubmit={submitHadler}>
          <div className={c["form-group"]}>
            <label htmlFor="tsph">Password</label>
            <input
              required
              name="tsph"
              id="tsph"
              type="text"
              placeholder="Enter New Password"
              onChange={(e) => setPwd((p) => ({ ...p, pwd: e.target.value }))}
            />
          </div>
          <div className={c["form-group"]}>
            <label htmlFor="rps">Re-Password</label>
            <input
              required
              name="rps"
              id="rps"
              type="text"
              placeholder="Re-Enter New Password"
              onChange={changeMatchedpwd}
            />
          </div>
          <button type="submit" className={c["form-submit-btn"]}>
            Submit
          </button>
          {p.data.userName !== "root" && (
            <h5 className={c.deleteTraining}>Delete this account</h5>
          )}
        </form>
      </div>
    </React.Fragment>
  );
};

export default EditOrDeleteUser;
