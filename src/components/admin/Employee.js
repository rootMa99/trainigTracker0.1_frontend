import c from "./Employee.module.css";
import imglogo from "../../assets/aptiv-logo.svg";
import Training from "./Training";
import React, { useState } from "react";
import AddTrainingForm from "./AddTrainingFrom";
import BackDrop from "../UI/BackDrop";

const Employee = (p) => {
  const [addTraining, setAddTraining] = useState(false);

  const onClickHandler = (e) => {
    setAddTraining(true);
  };
   const close=p=>{
    setAddTraining(false)
   }

  return (
    <React.Fragment>
    {
      addTraining && <BackDrop zindex={22221} click={close}/>
    }
    {
      addTraining && <AddTrainingForm />
    }
      <div className={c["form-container"]}>
        <div className={c.logo}>
          <img src={imglogo} alt="logo for aptiv" />
        </div>
        <div className={c.employeeT}>
          <span></span>
          <h1>Employee Info</h1>
        </div>
        <div className={c.infoC}>
          <div className={c.perInfo}>
            <div className={c.wrapData}>
              <h3>matricule</h3>
              <span>965</span>
            </div>
            <div className={c.wrapData}>
              <h3>name</h3>
              <span>tayia</span>
            </div>
            <div className={c.wrapData}>
              <h3>last name</h3>
              <span>amin</span>
            </div>
            <div className={c.wrapData}>
              <h3>category</h3>
              <span>IH</span>
            </div>
            <div className={c.wrapData}>
              <h3>function</h3>
              <span>Contremaître</span>
            </div>
            <div className={c.wrapData}>
              <h3>department</h3>
              <span>ASSEMBLY-4-</span>
            </div>
            <button className={c.classBtn} onClick={onClickHandler}>
              add training
            </button>
          </div>
          <div className={c.trainingInfo}>
            <Training />
            <Training />
            <Training />
            <Training />
            <Training />
            <Training />
            <Training />
            <Training />
            <Training />
            <Training />
            <Training />
            <Training />
            <Training />
            <Training />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Employee;
