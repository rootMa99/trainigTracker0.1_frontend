import c from "./Order.module.css";

const Order = ({ data }) => {
  return (
    <div className={c.trainingH}>
      <div className={c.trainingD}>
        <div className={c.dataT} style={{ width: "40%" }}>
          <span>qualification</span>
          <h3>{data.qualification}</h3>
        </div>

        <div className={c.dataT} style={{ width: "10%" }}>
          <span>shift</span>
          <h3>{data.shift}</h3>
        </div>
        <div className={c.dataT} style={{ width: "30%" }}>
          <span>qualification Date</span>
          <h3>{data.qualificationDate}</h3>
        </div>
        <div className={c.dataT} style={{ width: "20%" }}>
          <span>submit Date</span>
          <h3>{data.submitDate}</h3>
        </div>
      </div>
      <div className={c.trainingDi}>
        <div className={c.dataT} style={{ width: "40%" }}>
          <span>shiftLeader</span>
          <h3>{data.shiftLeader}</h3>
        </div>
        <div className={c.dataT} style={{ width: "60%" }}>
          <span>employees</span>
          <div className={c.mlls}>
            {data.employeeRests.map((m, i) => (
              <h3 key={i}>{m.matricule}</h3>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
