import React from "react";
import c from "./Reporting.module.css";
import * as ExcelJS from "exceljs";
const Reporting = (p) => {
  const generateExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    if (p.data.length > 0) {
      const columns = [
        "matricule",
        "prenom",
        "nom",
        "categorie",
        "categorie de formation",
        "formation",
        "durée par heure",
        "date de début",
        "date de fin",
        "préstataire",
        "modalité",
        "formatteur",
        "eva",
      ];
      worksheet.columns = columns.map((column) => ({
        header: column,
        key: column,
        width: column === "formation" ? 50 : 25,
        height:15,
        filterButton: true,
      }));
      worksheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {
        if (rowNumber === 1) {
          row.eachCell({ includeEmpty: true }, function (cell) {
            cell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "FFA211" },
            };
            cell.font = { bold: true };
          });
        }
      });

      p.data.forEach((obj, index) => {
        const row = {
          matricule: obj.es.matricule,
          prenom: obj.es.prenom,
          nom: obj.es.nom,
          categorie: obj.es.category,
          "categorie de formation": obj.trainingType,
          formation: obj.trainingTitle,
          "durée par heure": obj.dph.toFixed(2),
          "date de début": obj.ddb,
          "date de fin": obj.ddf,
          préstataire: obj.prestataire,
          modalité: obj.modalite,
          formatteur: obj.formatteur,
          eva: obj.eva,
        };

        const worksheetRow = worksheet.addRow(row);
        if (index % 2 === 0) {
          worksheetRow.eachCell({ includeEmpty: true }, function (cell) {
            cell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "D3D3D3" }, // Light gray color for even rows
            };
          });
        }

        // Set font color for all rows
        worksheetRow.eachCell({ includeEmpty: true }, function (cell) {
          cell.font = { color: { argb: "000000" } }; // Black font color
        });
        worksheet.eachRow((row, rowNumber) => {
          row.eachCell((cell) => {
            cell.alignment = { horizontal: "center", vertical: "center" };
          });
        });
      });
    }

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "data.xlsx";
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <React.Fragment>
      <div className={c.datatable}>
        <div className={c.btnhelperholder}>
          <button className={c.button} type="button" onClick={generateExcel}>
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
            {p.data.map((m, i) => (
              <tr key={i}>
                <td>{m.es.matricule}</td>
                <td>{m.es.prenom}</td>
                <td>{m.es.nom}</td>
                <td>{m.es.category}</td>
                <td>{m.trainingType}</td>
                <td>{m.trainingTitle}</td>
                <td>{m.dph.toFixed(2)}</td>
                <td>{m.ddb}</td>
                <td>{m.ddf}</td>
                <td>{m.prestataire}</td>
                <td>{m.modalite}</td>
                <td>{m.formatteur}</td>
                <td>{m.eva ? "yes" : "no"}</td>
              </tr>
            ))}
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
