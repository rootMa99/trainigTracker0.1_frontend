import React, { useRef } from "react";
import c from "./Dashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../store/loginSlice";

const Dashboard = (p) => {
  const { dateBetween } = useSelector((s) => s.login);
const dispatch= useDispatch();
  const dateInputRef = useRef(null);
  const dateInputRefe = useRef(null);

  return (
    <React.Fragment>
      <div className={c.headerD}>
        <div className={c.inputHi}>
          <div className={c["form-group"]}>
            <label htmlFor="trainingType">training type</label>
            <input
              required
              name="sd"
              id="trainingType"
              type="text"
              placeholder="enter TS/h"
            />
          </div>
          <div className={c["form-group"]}>
            <label htmlFor="trainingTitle">training title</label>
            <input
              required
              name="ed"
              id="trainingTitle"
              type="text"
              placeholder="enter TS/h"
            />
          </div>
          <div className={c["form-group"]}>
            <label htmlFor="category">category</label>
            <input
              required
              name="ed"
              id="category"
              type="text"
              placeholder="enter TS/h"
            />
          </div>
          <div className={c["form-group"]}>
            <label htmlFor="department">department</label>
            <input
              required
              name="ed"
              id="department"
              type="text"
              placeholder="enter TS/h"
            />
          </div>
        </div>
        <div className={c.inputH}>
          <div className={c["form-group"]}>
            <label htmlFor="sd">start date</label>
            <input
              required
              name="sd"
              step={0.01}
              id="sd"
              type="date"
              placeholder="enter TS/h"
              ref={dateInputRef}
              onClick={() => dateInputRef.current.showPicker()}
              onChange={e=>dispatch(loginActions.setDateYearStart(e.target.value))}
              value={dateBetween.start}
              max={dateBetween.end}
            />
          </div>
          <div className={c["form-group"]}>
            <label htmlFor="ed">end date</label>
            <input
              required
              name="ed"
              id="ed"
              type="date"
              placeholder="enter TS/h"
              ref={dateInputRefe}
              onClick={() => dateInputRefe.current.showPicker()}
              onChange={e=>dispatch(loginActions.setDateYearEnd(e.target.value))}
              value={dateBetween.end}
              min={dateBetween.start}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
