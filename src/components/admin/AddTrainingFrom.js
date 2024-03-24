import { useRef, useState } from "react";
import c from "./AddTrainingFrom.module.css";
import { useSelector } from "react-redux";
import Select from "react-select";
import { getTodayFormat, getTypes, getlabelandvalue } from "../functions/utils";

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
const AddTrainingForm = (p) => {
  const { titleAndType } = useSelector((s) => s.login);
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
    matricules: p.matricule !== undefined ? [p.matricule] : [],
  });

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
        setDataForm((prev) => ({ ...prev, dph: e.value }));
        break;
      case "sd":
        setDataForm((prev) => ({ ...prev, ddb: e.value }));
        break;
      case "ed":
        setDataForm((prev) => ({ ...prev, ddf: e.value }));
        break;
      case "provider":
        setDataForm((prev) => ({ ...prev, prestataire: e.value }));
        break;
      case "trainer":
        setDataForm((prev) => ({ ...prev, formatteur: e.value }));
        break;
      case "eva":
        setDataForm((prev) => ({ ...prev, eva: e.value }));
        break;
      default:
        setDataForm((prev) => ({ ...prev, details: e.target.value }));
    }
  };

  return (
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
      <form className={c.form}>
        <div className={c["form-group"]}>
          <label htmlFor="userName">training Type</label>
          <Select
            options={getTypes(titleAndType)}
            id="multiSelect"
            inputId="shiftleader1"
            styles={customStyles}
            defaultValue={" "}
            onChange={(e) => onchangeHandler(e, "type")}
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
            defaultValue={" "}
            onChange={(e) => onchangeHandler(e, "title")}
          />
        </div>
        <div className={c["form-group"]}>
          <label htmlFor="modality">modality</label>
          <input
            required
            name="text"
            id="modality"
            type="number"
            placeholder="enter modality"
            value={dataForm.modalite}
            onChange={(e) => onchangeHandler(e, "modality")}
          />
        </div>
        <div className={c["form-group"]}>
          <label htmlFor="tsph">Time spent per hour</label>
          <input
            required
            name="tsph"
            step={0.01}
            id="tsph"
            type="number"
            value={dataForm.dph}
            onChange={(e) => onchangeHandler(e, "dph")}
            placeholder="enter TS/h"
          />
        </div>
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
            onChange={(e) => onchangeHandler(e, "sd")}
            value={dataForm.ddb}
            onClick={() => dateInputRef.current.showPicker()}
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
          />
        </div>
        <div className={c["form-group"]}>
          <label htmlFor="provider">provider</label>
          <input
            required
            name="provider"
            id="provider"
            type="text"
            onChange={(e) => onchangeHandler(e, "provider")}
            value={dataForm.prestataire}
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
            defaultValue={" "}
            onChange={(e) => onchangeHandler(e, "eva")}
          />
        </div>

        <button type="submit" className={c["form-submit-btn"]}>
          Submit
        </button>
        {p.note && (
          <h5 className={c.deleteTraining}>Delete training to this Employee</h5>
        )}
      </form>
    </div>
  );
};

export default AddTrainingForm;
