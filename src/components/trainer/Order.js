import React, { useState } from "react";
import c from "./Order.module.css";

const Order = ({ data }) => {
  const [exp, setExp] = useState(false);
  return (
    <React.Fragment>
      <div className={c.trainingH} onClick={(e) => setExp(!exp)}>
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
          <div className={c.dataT} style={{ width: "35%" }}>
            <span>shiftLeader</span>
            <h3>{data.shiftLeader}</h3>
          </div>
          <div className={c.dataT} style={{ width: "50%" }}>
            <span>employees</span>
            <div className={c.mlls}>
              {data.employeeRests!==undefined&& data.employeeRests.map((m, i) => (
                <h3 key={i}>{m.matricule}</h3>
              ))}
            </div>
          </div>
          <div className={c.dataT} style={{ width: "15%" }}>
            <span>status</span>
            <h3>not set</h3>
              
          </div>
        </div>
      </div>
      {exp && (
        <ul className={c.ulemp}>
          <li style={{backgroundColor:"#F84018", color:"#E5E1DA" , fontWeight:"600", padding:"5px"}}>
            <span style={{ width: "10%" }}>{"matricule"}</span>
            <span style={{ width: "10%" }}>{"last name"}</span>
            <span style={{ width: "10%" }}>{"name"}</span>
            <span style={{ width: "10%" }}>{"category"}</span>
            <span style={{ width: "20%" }}>{"coordinator"}</span>
            <span style={{ width: "10%" }}>{"family"}</span>
            <span style={{ width: "10%" }}>{"poste"}</span>
            <span style={{ width: "20%" }}>{"teamLeader"}</span>
          </li>
          {data.employeeRests.map((m) => (
            <li key={m.matricule}>
              <span style={{ width: "10%" }}>{m.matricule}</span>
              <span style={{ width: "10%" }}>{m.nom}</span>
              <span style={{ width: "10%" }}>{m.prenom}</span>
              <span style={{ width: "10%" }}>{m.category}</span>
              <span style={{ width: "20%" }}>{m.coordinator}</span>
              <span style={{ width: "10%" }}>{m.family}</span>
              <span style={{ width: "10%" }}>{m.poste}</span>
              <span style={{ width: "20%" }}>{m.teamLeader}</span>
            </li>
          ))}
        </ul>
      )}
    </React.Fragment>
  );
};

export default Order;
