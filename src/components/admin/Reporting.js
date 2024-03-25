import React from "react";
import c from "./Reporting.module.css";
const Reporting = (p) => {
  return (
    <React.Fragment>
      <div className={c.datatable}>
      <div className={c.btnhelperholder}>
      <button className={c.button} type="button" >
          <span className={c["button__text"]}>Download</span>
          <span className={c["button__icon"]}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 35 35"
              id="bdd05811-e15d-428c-bb53-8661459f9307"
              data-name="Layer 2"
              className={c.svg}
            >
              <path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z"></path>
              <path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z"></path>
              <path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z"></path>
            </svg>
          </span>
        </button>
      </div>
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
