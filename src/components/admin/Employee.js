import c from "./Employee.module.css";
import imglogo from "../../assets/aptiv-logo.svg";
import Training from "./Training";
import React, { useState } from "react";
import AddTrainingForm from "./AddTrainingFrom";
import BackDrop from "../UI/BackDrop";
import { useSelector } from "react-redux";

const Employee =React.memo( (p) => {
  const { employeeData } = useSelector((s) => s.login);
  const [addTraining, setAddTraining] = useState(false);

  const onClickHandler = (e) => {
    setAddTraining(true);
  };
  const close = (p) => {
    setAddTraining(false);
  };
  console.log(employeeData)
  return (
    <React.Fragment>
      {addTraining && <BackDrop zindex={22221} click={close} />}
      {addTraining && <AddTrainingForm matricule={employeeData.matricule} />}
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
              <span>{employeeData.matricule}</span>
            </div>
            <div className={c.wrapData}>
              <h3>name</h3>
              <span>{employeeData.nom}</span>
            </div>
            <div className={c.wrapData}>
              <h3>last name</h3>
              <span>{employeeData.prenom}</span>
            </div>
            <div className={c.wrapData}>
              <h3>category</h3>
              <span>{employeeData.category}</span>
            </div>
            <div className={c.wrapData}>
              <h3>function</h3>
              <span>{employeeData.fonction}</span>
            </div>
            <div className={c.wrapData}>
              <h3>department</h3>
              <span>{employeeData.department}</span>
            </div>
            <button className={c.classBtn} onClick={onClickHandler}>
              add training
            </button>
          </div>
          <div className={c.trainingInfo}>
            {employeeData.trainingFromExcels.length === 0 ? (
              <h3>No data found</h3>
            ) : (
              employeeData.trainingFromExcels.map(m=><Training data={m} key={m.trainingId} />)
            )}
            <Training />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
});

export default Employee;
