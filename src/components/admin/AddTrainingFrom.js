import React, { useRef, useState } from "react";
import c from "./AddTrainingFrom.module.css";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getTodayFormat, getTypes, getlabelandvalue } from "../functions/utils";
import api from "../../service/api";
import NetworkNotify from "../UI/NetworkNotify";
import { loginActions } from "../../store/loginSlice";

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

const today = getTodayFormat();
const AddTrainingForm = React.memo((p) => {
  const { titleAndType, isLoged } = useSelector((s) => s.login);
  const dispatch = useDispatch();
  const [dataForm, setDataForm] = useState({
    trainingType: p.data !== undefined ? p.data.trainingType : "",
    trainingTitle: p.data !== undefined ? p.data.trainingTitle : "",
    modalite: p.data !== undefined ? p.data.modalite : "",
    dph: p.data !== undefined ? p.data.dph : 0,
    ddb: p.data !== undefined ? p.data.ddb : today,
    ddf: p.data !== undefined ? p.data.ddf : today,
    prestataire: p.data !== undefined ? p.data.prestataire : "",
    formatteur: p.data !== undefined ? p.data.formatteur : "",
    eva: p.data !== undefined ? p.data.eva : false,
    matricules: p.matricule !== undefined ? [p.matricule] : [],
  });
  const [err, setErr] = useState(false);
  const [success, setSuccess] = useState(false);

  const dateInputRef = useRef(null);
  const dateInputRefe = useRef(null);
  console.log(titleAndType, getTypes(titleAndType));

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
      default:
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(dataForm);
    const uri = p.note
      ? `${api}/admin/updateTrainingById?trainingId=${p.data.trainingId}`
      : `${api}/admin/addTrainingToEmployees`;
    try {
      const response = await fetch(uri, {
        method: p.note ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isLoged.token}`,
        },
        body: JSON.stringify(dataForm),
      });

      const data = await response.json();
      setSuccess(true);
      console.log(data);
      if (p.note) {
        data.ddb = data.ddb.split("T")[0];
        data.ddf = data.ddf.split("T")[0];
      }
      if (p.note) {
        dispatch(
          loginActions.editTraining({
            data: { ...dataForm, trainingId: data.trainingId },
            id: data.trainingId,
          })
        );
      } else {
        dispatch(loginActions.addTrainingToEmployee(data));
      }
      p.click();
    } catch (error) {
      console.error("Error:", error);
      setErr(true);
    }
  };

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
      {success && (
        <NetworkNotify
          message={
            p.note
              ? "The training has been successfully updated."
              : `Adding training to employees with matricule: ${p.matricule}, successful.`
          }
          success={true}
        />
      )}
      <div className={c.formCAdmin}>
        {p.note ? (
          <h1 className={c.title}>edit training</h1>
        ) : (
          <h1 className={c.title}>
            Add training to <span>{p.matricule}</span>
          </h1>
        )}
        {p.note && (
          <p>
            Note: When you update this training, it will be updated for all
            employees who are relying on this training.
          </p>
        )}
        <form className={c.form} onSubmit={submitHandler}>
          <div className={c["form-group"]}>
            <label htmlFor="userName">training Type</label>
            <Select
              options={getTypes(titleAndType)}
              id="multiSelect"
              inputId="shiftleader1"
              styles={customStyles}
              defaultValue={{
                label: dataForm.trainingType,
                value: dataForm.trainingType,
              }}
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
              defaultValue={{
                label: dataForm.trainingTitle,
                value: dataForm.trainingTitle,
              }}
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
              defaultValue={{
                label: dataForm.modalite,
                value: dataForm.modalite,
              }}
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
              value={dataForm.dph}
              onChange={(e) => onchangeHandler(e, "dph")}
              placeholder="enter TS/h"
              min={0}
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
              ref={dateInputRef}
              onChange={(e) => onchangeHandler(e, "sd")}
              value={dataForm.ddb}
              onClick={() => dateInputRef.current.showPicker()}
              max={dataForm.ddf}
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
              onChange={(e) => onchangeHandler(e, "ed")}
              value={dataForm.ddf}
              onClick={() => dateInputRefe.current.showPicker()}
              min={dataForm.ddb}
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
              defaultValue={{
                label: dataForm.prestataire,
                value: dataForm.prestataire,
              }}
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
            />
          </div>
          <div className={c["form-group"]} style={{ width: "95%" }}>
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

          <button type="submit" className={c["form-submit-btn"]}>
            Submit
          </button>
          {p.note && (
            <h5 className={c.deleteTraining}>
              Delete training to this Employee
            </h5>
          )}
        </form>
      </div>
    </React.Fragment>
  );
});

export default AddTrainingForm;
