import { useSelector } from "react-redux";
import c from "./ViewOreders.module.css";
import React, { useState } from "react";
import api from "../../service/api";
import NetworkNotify from "../UI/NetworkNotify";

const EditDate = (p) => {
  const { isLoged, orderDates } = useSelector((s) => s.login);
  const [orderDt, setOrderD] = useState(orderDates.start);
  const [err, setErr] = useState(false);
  const cHandler = async (e) => {
    console.log(p, orderDt);

    try {
      const response = await fetch(
        `${api}/other/updateOrder/trainer?endDate=${orderDt}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${isLoged.token}`,
          },
          body: JSON.stringify(p.order),
        }
      );

      const data = await response.json();
      console.log(data);
      p.click();
        p.callback();
     
    } catch (error) {
      console.error("Error:", error);
      setErr(true);
    }
  };

  return (
    <React.Fragment>
    {err && <NetworkNotify message={
      "Something has gone wrong, we were not able to save this action, please try it again. "
    } success={false} />}
      <div
        className={c.formCAdmin}
        style={{
          position: "fixed",
          zIndex: 33333,
          width: "40rem",
          flexDirection: "column",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className={c["form-group"]}>
          <label htmlFor="sd">order date</label>
          <input
            required
            name="sd"
            id="sd"
            type="date"
            placeholder="enter date"
            value={orderDt}
            onChange={(e) => setOrderD(e.target.value)}
            min={orderDates.start}
          />
        </div>
        <button className={c["form-submit-btn"]} onClick={cHandler}>
          Submit
        </button>
      </div>
    </React.Fragment>
  );
};

export default EditDate;
