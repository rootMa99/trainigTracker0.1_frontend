import React, { useCallback, useEffect, useRef, useState } from "react";
import c from "./Dashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../store/loginSlice";
import api from "../../service/api";
import NetworkNotify from "../UI/NetworkNotify";
import Select from "react-select";
import { getTypes, getlabelandvalue } from "../functions/utils";
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "100%",
    height: "auto",
    fontWeight: "600",
    textTransform: "uppercase",
    borderRadius: "5px",
    fontFamily: `Formular, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
                "Segoe UI Symbol"`,
    letterSpacing: "2px",
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
    textTransform: "uppercase",
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
const Dashboard = (p) => {
  const { dateBetween, dataDashboard, isLoged, titleAndType } = useSelector((s) => s.login);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataForm, setDataForm] = useState({
    trainingType:"",
    trainingTitle:  "",
    category:"",
    department:""
  });
  const dispatch = useDispatch();
  const dateInputRef = useRef(null);
  const dateInputRefe = useRef(null);

  const callback = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${api}/admin/trainingDateBetween?dateDebut=${dateBetween.start}&dateFin=${dateBetween.end}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${isLoged.token}`,
          },
        }
      );

      const data = await response.json();
      console.log(data);
      dispatch(loginActions.addDataToDataDashboard(data));
      setLoading(false);
      setErr(false);
    } catch (error) {
      console.error("Error:", error);
      setErr(true);
      setLoading(false);
    }
  }, [dateBetween, isLoged, dispatch]);

  useEffect(() => {
    callback();
  }, [callback]);

  return (
    <React.Fragment>
    
      {err && (
        <NetworkNotify
          message={
            "Something has gone wrong, we were unable to retrieve any data, please try again."
          }
          success={false}
        />
      )}
      <div className={c.headerD}>
        <div className={c.inputHi}>
          <div className={c["form-group"]}>
            <label htmlFor="trainingType">training type</label>
            <Select
              options={getTypes(titleAndType)}
              id="multiSelect"
              inputId="shiftleader1"
              styles={customStyles}
            
              // onChange={(e) => onchangeHandler(e, "type")}
              placeholder="select training type"
            />
          </div>
          <div className={c["form-group"]}>
            <label htmlFor="trainingTitle">training title</label>
            <Select
              options={
                dataForm.trainingType === ""
                  ? []
                  : getlabelandvalue(
                      titleAndType.filter(
                        (f) => f.trainingType === dataForm.trainingType
                      )[0].trainingTitles
                    )
              }
              id="multiSelect"
              inputId="shiftleader1"
              styles={customStyles}
              // onChange={(e) => onchangeHandler(e, "title")}
              placeholder="select training title"
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
              onChange={(e) =>
                dispatch(loginActions.setDateYearStart(e.target.value))
              }
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
              onChange={(e) =>
                dispatch(loginActions.setDateYearEnd(e.target.value))
              }
              value={dateBetween.end}
              min={dateBetween.start}
            />
          </div>
         
        </div>
        <div className={c.inputH}>
          
        </div>
      </div>
      {
        loading && <h1 style={{color: "white"}} >loading....</h1>
      }
    </React.Fragment>
  );
};

export default Dashboard;
