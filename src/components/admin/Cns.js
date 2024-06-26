import { useSelector } from "react-redux";
import c from "./AddTrainingFrom.module.css";
import Select from "react-select";
import { getTodayFormat, getTypes, getlabelandvalue } from "../functions/utils";
import React, { useState } from "react";
import api from "../../service/api";
import NetworkNotify from "../UI/NetworkNotify";
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "97%",
    height: "auto",
    fontWeight: "lighter",
    textTransform: "uppercase",
    borderRadius: "8px",
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

const Cns = (p) => {
  const { titleAndType, isLoged } = useSelector((s) => s.login);
  const today = getTodayFormat();
  const [err, setErr] = useState({ status: false, message: "" });
  const [success, setSuccess] = useState({ status: false, message: "" });
  const [dataForm, setDataForm] = useState({
    trainingType: "",
    trainingTitle: "",
    modalite: "",
    dph: 0,
    ddb: today,
    ddf: today,
    prestataire: "",
    formatteur: "",
    eva: false,
    matricules: "",
  });
  const onchangeHandler = (e, t) => {
    switch (t) {
      case "type":
        setDataForm((prev) => ({ ...prev, trainingType: e.value }));
        break;
      case "title":
        setDataForm((prev) => ({ ...prev, trainingTitle: e.value }));
        break;
      case "modality":
        setDataForm((prev) => ({ ...prev, modalite: e.value }));
        break;
      case "dph":
        setDataForm((prev) => ({ ...prev, dph: +e.target.value }));
        break;
      case "sd":
        setDataForm((prev) => ({ ...prev, ddb: e.target.value }));
        break;
      case "ed":
        setDataForm((prev) => ({ ...prev, ddf: e.target.value }));
        break;
      case "provider":
        setDataForm((prev) => ({ ...prev, prestataire: e.value }));
        break;
      case "trainer":
        setDataForm((prev) => ({ ...prev, formatteur: e.target.value }));
        break;
      case "eva":
        setDataForm((prev) => ({ ...prev, eva: e.value }));
        break;
      case "matricules":
        setDataForm((prev) => ({ ...prev, matricules: e.target.value }));
        break;
      default:
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const body = {
      ...dataForm,
      matricules: dataForm.matricules.split(",").map((num) => parseInt(num)),
    };
    console.log(body);

    try {
      const response = await fetch(`${api}/admin/addTrainingToEmployees`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isLoged.token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      setSuccess({
        status: true,
        message: "The training sessio has been successfully created.",
      });
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
      setErr({
        status: true,
        message:
          "Something has gone wrong, we were not able to save this action, please try it again. ",
      });
    }
  };
  if (err.status || success.status) {
    setTimeout(() => {
      setErr({ status: false, message: "" });
      setSuccess({ status: false, message: "" });
    }, 2000);
  }
  return (
    <React.Fragment>
      {err.status && <NetworkNotify message={err.message} success={false} />}
      {success.status && (
        <NetworkNotify message={success.message} success={true} />
      )}
      <div className={`${c.formCAdmin} ${c.csn}`}>
        <form
          className={c.form}
          style={{ height: "100%" }}
          onSubmit={submitHandler}
        >
          <div className={c["form-group"]} style={{ width: "95%" }}>
            <label htmlFor="userName">training Type</label>
            <Select
              options={getTypes(titleAndType)}
              id="multiSelect"
              inputId="shiftleader1"
              styles={customStyles}
              onChange={(e) => onchangeHandler(e, "type")}
              placeholder="select training type"
            />
          </div>
          <div className={c["form-group"]}>
            <label htmlFor="traininTitle">training title</label>
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
              onChange={(e) => onchangeHandler(e, "title")}
              placeholder="select training title"
            />
          </div>
          <div className={c["form-group"]}>
            <label htmlFor="modality">modality</label>
            <Select
              options={[
                { value: "presential", label: "presential" },
                { value: "remote", label: "remote" },
              ]}
              id="modality"
              inputId="modality"
              styles={customStyles}
              onChange={(e) => onchangeHandler(e, "modality")}
              placeholder="select modality"
            />
          </div>
          <div className={c["form-group"]}>
            <label htmlFor="tsph">Time spent per hour</label>
            <input
              required
              name="tsph"
              id="tsph"
              type="number"
              onChange={(e) => onchangeHandler(e, "dph")}
              placeholder="enter TS/h"
              min={0}
              style={{ marginTop: 0 }}
            />
          </div>
          <div className={c["form-group"]}>
            <label htmlFor="sd">start date</label>
            <input
              required
              name="sd"
              id="sd"
              type="date"
              placeholder="enter TS/h"
              onChange={(e) => onchangeHandler(e, "sd")}
              value={dataForm.ddb}
              max={dataForm.ddf}
              style={{ marginTop: 0 }}
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
              onChange={(e) => onchangeHandler(e, "ed")}
              value={dataForm.ddf}
              min={dataForm.ddb}
              style={{ marginTop: 0 }}
            />
          </div>
          <div className={c["form-group"]}>
            <label htmlFor="provider">provider</label>
            <Select
              options={[
                { value: "APTIV", label: "APTIV" },
                { value: "OTHER", label: "other" },
              ]}
              id="modality"
              inputId="privider"
              styles={customStyles}
              onChange={(e) => onchangeHandler(e, "provider")}
              placeholder="enter provider"
            />
          </div>
          <div className={c["form-group"]}>
            <label htmlFor="trainer">trainer</label>
            <input
              required
              name="trainer"
              id="trainer"
              type="text"
              placeholder="enter trainer"
              onChange={(e) => onchangeHandler(e, "trainer")}
              value={dataForm.formatteur}
              style={{ marginTop: 0 }}
            />
          </div>
          <div className={c["form-group"]}>
            <label htmlFor="eva">eva</label>
            <Select
              options={[
                { value: false, label: "false" },
                { value: true, label: "true" },
              ]}
              id="multiSelect"
              inputId="shiftleader1"
              styles={customStyles}
              defaultValue={{ label: `${dataForm.eva}`, value: dataForm.eva }}
              onChange={(e) => onchangeHandler(e, "eva")}
              placeholder="select eva"
            />
          </div>
          <div className={c["form-group"]} style={{ width: "100%" }}>
            <label htmlFor="matrcules">matrcules*</label>
            <input
              required
              name="matricules"
              id="matricules"
              type="text"
              placeholder={`enter matricules i.e: "m1,m2,m3..."`}
              onBlur={(e) => onchangeHandler(e, "matricules")}
            />
            <p>
              note: The list of matricules must be entered as "1,22,33" with no
              spaces, only commas ","**
            </p>
          </div>
          <button type="submit" className={c["form-submit-btn"]}>
            Submit
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Cns;
