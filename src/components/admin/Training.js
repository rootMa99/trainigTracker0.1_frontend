import c from "./Training.module.css";

const Training = (p) => {
  return (
    <div className={c.trainingH}>
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
  );
};

export default Training;
