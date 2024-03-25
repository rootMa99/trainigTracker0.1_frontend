import React from "react";
import c from "./Reporting.module.css";
const Reporting = (p) => {
  return (
    <React.Fragment>
      <div className={c.datatable}>
        <div className={c.employeeT}>
          <span></span>
          <h1> Reporting </h1>
        </div>
        <table className={c.table}>
          <thead>
            <tr>
              <th width="4%">mat</th>
              <th>name</th>
              <th>last name</th>
              <th width="3%">cat</th>
              <th>training type</th>
              <th width="15%">training title</th>
              <th width="3%">ts/h</th>
              <th>start date</th>
              <th>end Date</th>
              <th>provider</th>
              <th>modality</th>
              <th>trainer</th>
              <th width="3%">eva</th>
            </tr>
          </thead>
          <tbody>
           {p.data.map((m, i)=> <tr key={i}>
              <td>{m.es.matricule}</td>
              <td>{m.es.prenom}</td>
              <td>{m.es.nom}</td>
              <td>{m.es.category}</td>
              <td>{m.trainingType}</td>
              <td>{m.trainingTitle}</td>
              <td>{(m.dph).toFixed(2)}</td>
              <td>{m.ddb}</td>
              <td>{m.ddf}</td>
              <td>{m.prestataire}</td>
              <td>{m.modalite}</td>
              <td>{m.formatteur}</td>
              <td>{m.eva?"yes":"no"}</td>
            </tr>)}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </React.Fragment>
  );
};
export default Reporting;
