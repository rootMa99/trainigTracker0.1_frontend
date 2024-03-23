import { useRef } from "react";
import c from "./AddTrainingFrom.module.css";

const AddTrainingForm = (p) => {
  const dateInputRef = useRef(null);
  const dateInputRefe = useRef(null);

  return (
    <div className={c.formCAdmin}>
     
      {p.note ? (
        <h1 className={c.title}>edit training</h1>
      ) : (
        <h1 className={c.title}>
          Add training to <span>890</span>
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
          <input
            required
            name="userName"
            id="userName"
            type="text"
            placeholder="enter userName"
            style={{ textTransform: "none" }}
          />
        </div>
        <div className={c["form-group"]}>
          <label htmlFor="traininTitle">training title</label>
          <input
            required
            name="traininTitle"
            id="traininTitle"
            type="text"
            placeholder="enter password"
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
          />
        </div>
        <div className={c["form-group"]} style={{ width: "100%" }}>
          <label htmlFor="eva">eva</label>
          <input
            required
            name="eva"
            id="eva"
            type="text"
            placeholder="enter eva"
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
