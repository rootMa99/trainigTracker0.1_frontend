import React, { useCallback, useEffect, useState } from "react";
import c from "./Dashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../store/loginSlice";
import api from "../../service/api";
import NetworkNotify from "../UI/NetworkNotify";
import Select from "react-select";
import { getTypes, getlabelandvalue } from "../functions/utils";
import {
  destractArray,
  extractedArray,
  getHoursByCategory,
  getHoursByMonth,
  getHoursBytt,
  getTotals,
  getfiltredArrayV2,
} from "../functions/dashboardFunctions";
import Charts from "../UI/Charts";
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "100%",

    textTransform: "uppercase",
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
  const { dateBetween, dataDashboard, isLoged, titleAndType, handyData } =
    useSelector((s) => s.login);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataForm, setDataForm] = useState({
    trainingType: "",
    trainingTitle: "",
    category: "",
    department: "",
  });
  const dispatch = useDispatch();

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
  // console.log(dataDashboard);
  const onchangeHandler = (e, t) => {
    switch (t) {
      case "type":
        setDataForm((prev) => ({ ...prev, trainingTitle: "" }));
        setDataForm((prev) => ({ ...prev, trainingType: e.value }));
        break;
      case "title":
        setDataForm((prev) => ({ ...prev, trainingTitle: e.value }));
        break;
      case "cat":
        setDataForm((prev) => ({ ...prev, category: e.value }));
        break;
      case "dep":
        setDataForm((prev) => ({ ...prev, department: e.value }));
        break;
      default:
    }
  };

  // const filA=getfiltredArray(dataDashboard, dataForm);
  // const total = getTotals(filA);
  // const extractedArr=extractedArray(filA)
  //   console.log(dataForm, total);
  //   console.log(
  //     filA,
  //     extractedArr,
  //     getHoursByCategory(extractedArr),
  //     getfiltredArray2(dataDashboard, dataForm)
  //     );
  const estd = getfiltredArrayV2(extractedArray(dataDashboard), dataForm);
  const total = getTotals(destractArray(estd));
  const hoursByCat = getHoursByCategory(estd, "category");
  const hoursByDep = getHoursByCategory(estd, "department");
  const hourByt = getHoursBytt(estd);
  const hourByMonth= getHoursByMonth(estd);
  console.log(estd, hoursByCat, hourByMonth);
  const bool =
    dataForm.trainingType !== "" ||
    dataForm.trainingTitle !== "" ||
    dataForm.category !== "" ||
    dataForm.department !== "";
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
        {bool && (
          <span
            className={c.cf}
            onClick={() =>
              setDataForm({
                trainingType: "",
                trainingTitle: "",
                category: "",
                department: "",
              })
            }
          >
            clear filter
          </span>
        )}
        <div className={c.inputHi}>
          <div className={c["form-group"]}>
            <label htmlFor="trainingType">training type</label>
            <Select
              options={[{ value: "", label: "n/a" }, ...getTypes(titleAndType)]}
              id="multiSelect"
              inputId="shiftleader1"
              styles={customStyles}
              onChange={(e) => onchangeHandler(e, "type")}
              value={{
                value: dataForm.trainingType,
                label: dataForm.trainingType,
              }}
              placeholder="select training type"
            />
          </div>
          <div className={c["form-group"]}>
            <label htmlFor="trainingTitle">training title</label>
            <Select
              options={[
                { value: "", label: "n/a" },
                ...(dataForm.trainingType === ""
                  ? []
                  : getlabelandvalue(
                      titleAndType.filter(
                        (f) => f.trainingType === dataForm.trainingType
                      )[0].trainingTitles
                    )),
              ]}
              value={{
                value: dataForm.trainingTitle,
                label: dataForm.trainingTitle,
              }}
              styles={customStyles}
              onChange={(e) => onchangeHandler(e, "title")}
              placeholder="select training title"
            />
          </div>
          <div className={c["form-group"]}>
            <label htmlFor="category">category</label>
            <Select
              options={[
                { value: "", label: "n/a" },
                ...getlabelandvalue(handyData.categories),
              ]}
              id="multiSelect"
              inputId="shiftleader1"
              styles={customStyles}
              value={{
                value: dataForm.category,
                label: dataForm.category,
              }}
              onChange={(e) => onchangeHandler(e, "cat")}
              placeholder="select category"
            />
          </div>
          <div className={c["form-group"]}>
            <label htmlFor="department">department</label>
            <Select
              options={[
                { value: "", label: "n/a" },
                ...getlabelandvalue(handyData.departments),
              ]}
              id="multiSelect"
              inputId="shiftleader1"
              styles={customStyles}
              value={{
                value: dataForm.department,
                label: dataForm.department
              }}
              onChange={(e) => onchangeHandler(e, "dep")}
              placeholder="select category"
            />
          </div>
        </div>
        <div className={c.inputH}>
          <div className={c["form-group"]}>
            <label htmlFor="sd">start date</label>
            <input
              required
              name="sd"
              id="sd"
              type="date"
              placeholder="enter TS/h"
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
              onChange={(e) =>
                dispatch(loginActions.setDateYearEnd(e.target.value))
              }
              value={dateBetween.end}
              min={dateBetween.start}
            />
          </div>
        </div>
        <div className={c.inputHs}>
          <div className={c.wraperD}>
            <div className={c.total}>
              <h5>nb/employees</h5>
              <p>{total.nbEmployee}</p>
            </div>
            <div className={c.total}>
              <h5>nb/session</h5>
              <p>{total.nbSession}</p>
            </div>
          </div>

          <div className={c.total}>
            <h5>total hours</h5>
            <p>{total.totalHour.toFixed(2)}</p>
          </div>
        </div>
      </div>
      {loading && <h1 style={{ color: "white" }}>loading....</h1>}
      {!loading && (
        <div className={c.chartHolder}>
          <div className={c.chart}>
            <Charts title="category" data={hoursByCat} type="bar"/>
          </div>
          <div className={c.chart}>
            <Charts title="training type" data={hourByt} type="bar"/>
          </div>
          <div className={c.charttt}>
            <Charts title="department" data={hoursByDep} type="bar"/>
          </div>
          <div className={c.charttt}>
            <Charts title="department" data={hourByMonth} type="line"/>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Dashboard;
