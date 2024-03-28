import React, { useState } from "react";
import c from "./Order.module.css";

const Order = ({ data }) => {
  const [exp, setExp] = useState(false);
  return (
    <React.Fragment>
    <div className={c.trainingH}>
    <input className={c.checkboxInput} type="checkbox" />
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
          <div className={c.dataT} style={{ width: "50%" }}>
            <span>employees</span>
            <div className={c.mlls}>
              {data.employeeRests.map((m, i) => (
                <h3 key={i}>{m.matricule}</h3>
              ))}
            </div>
          </div>
          <div
            className={c.dataT}
            style={{ width: "10%" }}
          >
            <span >
              
            </span>
            <label className={c.hamburger}>
            <input type="checkbox" className={c.exp} onClick={(e) => setExp(!exp)} />
            <svg viewBox="0 0 32 32">
              <path className={c["line line-top-bottom"]} d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
              <path className={c.line} d="M7 16 27 16"></path>
            </svg>
          </label> 
          </div>
        </div>
      </div>
      {exp && (
        <ul className={c.ulemp}>
          <li>
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
