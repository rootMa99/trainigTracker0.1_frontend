import React, { useState } from "react";
import c from "./Training.module.css";
import BackDrop from "../UI/BackDrop";
import AddTrainingForm from "./AddTrainingFrom";

const Training = (p) => {

  const [editT, setEditT]=useState(false);

  const clickHandler=e=>{
    setEditT(true);
  }

  const close=e=>{
    setEditT(false)
  }

  return (

<React.Fragment>
{
  editT && <BackDrop zindex={22221} click={close}/>
}
{
  editT && <AddTrainingForm note={true} />
}
    <div className={c.trainingH} onClick={clickHandler}>
      <div className={c.trainingD}>
        <div className={c.dataT}>
          <span>training title</span>
          <h3>Administration du personnel</h3>
        </div>
        <div className={c.dataT}>
          <span>training type</span>
          <h3>Softskills</h3>
        </div>
        <div className={c.dataT}>
          <span>modalite</span>
          <h3>Présentielle</h3>
        </div>
        <div className={c.dataT}>
          <span>dph</span>
          <h3>1.0</h3>
        </div>
      </div>
      <div className={c.trainingDi}>
        <div className={c.dataT}>
          <span>ddb</span>
          <h3>2023-01-27</h3>
        </div>
        <div className={c.dataT}>
          <span>ddf</span>
          <h3>2023-01-27</h3>
        </div>
        <div className={c.dataT}>
          <span>provider</span>
          <h3>APTIV</h3>
        </div>
        <div className={c.dataT}>
          <span>trainer</span>
          <h3>ZOUKRI Manal</h3>
        </div>
      </div>
    </div>
</React.Fragment>

  );
};

export default Training;
