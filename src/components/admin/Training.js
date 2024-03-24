import React, { useState } from "react";
import c from "./Training.module.css";
import BackDrop from "../UI/BackDrop";
import AddTrainingForm from "./AddTrainingFrom";

const Training = ({ data }) => {
  console.log("runon", data);
  const [editT, setEditT] = useState(false);

  const clickHandler = (e) => {
    setEditT(true);
  };

  const close = (e) => {
    setEditT(false);
  };

  return (
    <React.Fragment>
      {editT && <BackDrop zindex={22221} click={close} />}
      {editT && <AddTrainingForm note={true} />}
      {data !== undefined && (
        <div className={c.trainingH} onClick={clickHandler}>
          <div className={c.trainingD}>
            <div className={c.dataT}>
              <span>training title</span>
              <h3>{data.trainingTitle}</h3>
            </div>
            <div className={c.dataT}>
              <span>training type</span>
              <h3>{data.trainingType}</h3>
            </div>
            <div className={c.dataT}>
              <span>modality</span>
              <h3>{data.modalite}</h3>
            </div>
            <div className={c.dataT}>
              <span>ts/h</span>
              <h3>{data.dph}</h3>
            </div>
          </div>
          <div className={c.trainingDi}>
            <div className={c.dataT}>
              <span>sd</span>
              <h3>{data.ddb}</h3>
            </div>
            <div className={c.dataT}>
              <span>ed</span>
              <h3>{data.ddf}</h3>
            </div>
            <div className={c.dataT}>
              <span>provider</span>
              <h3>{data.prestataire}</h3>
            </div>
            <div className={c.dataT}>
              <span>trainer</span>
              <h3>{data.formatteur}</h3>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Training;
