import React, { useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import c from "./MakeOreder.module.css";
import { getNextWeekDates, getlabelandvalue } from "../functions/utils";
import api from "../../service/api";
import NetworkNotify from "../UI/NetworkNotify";
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "97%",
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

const MakeOreder = (p) => {
  const { employeesByShiftLeader, titleAndType, isLoged } = useSelector(
    (s) => s.login
  );
  const [order, setOrder] = useState({
    qualification: "",
    orderdate: getNextWeekDates(),
    shiftLeaderName: isLoged.userName,
    shift: "",
    matricules: [],
  });
  const [filled, setFilled]=useState(false);
  const [err, setErr] = useState(false);
  const onchangeHandler = (e, t) => {
    const datap = [];
    t === "mlls" && e.map((m) => datap.push(m.value));
    switch (t) {
      case "q":
        setOrder((prev) => ({ ...prev, qualification: e.value }));
        break;
      case "od":
        setOrder((prev) => ({ ...prev, orderdate: e.target.value }));
        break;
      case "s":
        setOrder((prev) => ({ ...prev, shift: e.value }));
        break;
      case "mlls":
        setOrder((prev) => ({ ...prev, matricules: datap }));
        break;

      default:
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      order.qualification.trim() !== "" &&
      order.shift.trim() !== "" &&
      order.matricules.length > 0
    ) {
        setFilled(false)
      try {
        const response = await fetch(`${api}/other/addOrder`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${isLoged.token}`,
          },
          body: JSON.stringify([order]),
        });

        const data = await response.json();
        console.log(data);
        p.click();
      } catch (error) {
        console.error("Error:", error);
        setErr(true);
      }
    }else{
        setFilled(true)
    }
  };
  if(filled){
    setTimeout(()=>{
        setFilled(false)
    }, 4000)
  }
  console.log(order);
  return (
    <React.Fragment>
    {err && (
        <NetworkNotify
          message={
            "Something has gone wrong, we were not able to save this action, please try it again. "
          }
          success={false}
        />
      )}
      <div className={c.formCAdmin}>
      {filled&&<p>Be sure to fill out all fields.</p>}
        <form className={c.form} onSubmit={submitHandler}>
          <div className={c["form-group"]}>
            <label htmlFor="userName">qualification</label>
            <Select
              options={getlabelandvalue(
                titleAndType.filter((f) => f.trainingType === "Process")[0]
                  .trainingTitles
              )}
              id="multiSelect"
              inputId="shiftleader1"
              styles={customStyles}
              placeholder="select Qualification"
              onChange={(e) => onchangeHandler(e, "q")}
            />
          </div>

          <div className={c["form-group"]}>
            <label htmlFor="modality">Employees by matricule</label>
            <Select
              options={getlabelandvalue(employeesByShiftLeader)}
              id="modality"
              inputId="modality"
              styles={customStyles}
              placeholder="select Employees"
              isMulti
              onChange={(e) => onchangeHandler(e, "mlls")}
            />
          </div>
          <div className={c["form-group"]}>
            <label htmlFor="modality">shift</label>
            <Select
              options={[
                { label: "morning", value: "morning" },
                { label: "evening", value: "evening" },
                { label: "nigth", value: "nigth" },
              ]}
              id="modality"
              inputId="modality"
              styles={customStyles}
              placeholder="select shift"
              onChange={(e) => onchangeHandler(e, "s")}
            />
          </div>
          <div className={c["form-group"]}>
            <label htmlFor="sd">date</label>
            <input
              required
              name="sd"
              id="sd"
              type="date"
              placeholder="enter date"
              value={order.orderdate}
              onChange={(e) => onchangeHandler(e, "od")}
            />
          </div>
          <button type="submit" className={c["form-submit-btn"]}>
            Submit
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};
export default MakeOreder;
