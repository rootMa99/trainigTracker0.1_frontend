import c from "./Training.module.css"

const Training = (p) => {
  return (
    <div className={c.trainingH}>
      <div className={c.trainingD}>
        <div>
          <span>training title</span>
          <h3>Administration du personnel</h3>
        </div>
        <div>
          <span>training type</span>
          <h3>Softskills</h3>
        </div>
        <div>
          <span>modalite</span>
          <h3>Présentielle</h3>
        </div>
        <div>
          <span>dph</span>
          <h3>1.0</h3>
        </div>
      </div>
      <div className={c.trainingD}>
        <div>
          <span>ddb</span>
          <h3>2023-01-27</h3>
        </div>
        <div>
          <span>ddf</span>
          <h3>2023-01-27</h3>
        </div>
        <div>
          <span>provider</span>
          <h3>APTIV</h3>
        </div>
        <div>
          <span>trainer</span>
          <h3>ZOUKRI Manal</h3>
        </div>
      </div>
    </div>
  );
};

export default Training;
