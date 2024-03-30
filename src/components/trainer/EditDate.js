import { useSelector } from "react-redux";
import c from "./ViewOreders.module.css";
import { useState } from "react";

const EditDate = (p) => {
    const { isLoged, orderDates } = useSelector((s) => s.login);
    const [orderDt, setOrderD]=useState(orderDates.start)
    console.log(p)
  return (
    <div
      className={c.formCAdmin}
      style={{ position:"fixed", zIndex: 33333, width: "40rem", flexDirection: "column" , top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)"}}
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
          onChange={e=>setOrderD(e.target.value)}
          min={orderDates.start}
        />
      </div>
      <button type="submit" className={c["form-submit-btn"]}>
        Submit
      </button>
    </div>
  );
};

export default EditDate;
