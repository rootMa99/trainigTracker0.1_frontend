import { useState } from "react";
import c from "./CreateUser.module.css";

const EditOrDeleteUser = (p) => {
  const [pwd, setPwd] = useState({ pwd: "", mPwd: "" });
  const [matchP, setMatchP] = useState(true);
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

  return (
    <div className={c.editDelete}>
      {!matchP && (
        <p className={c.noteS}>
          Note: In order to proceed, you will need to match the password and the
          re-password.
        </p>
      )}
      <p className={c.accountS}>
        <span>Account:</span> {p.data.userName}{" "}
      </p>
      <form className={c.form}>
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
        <h5 className={c.deleteTraining}>Delete this account</h5>
      </form>
    </div>
  );
};

export default EditOrDeleteUser;
