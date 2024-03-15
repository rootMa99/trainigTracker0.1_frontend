import c from "./Employee.module.css";
import imglogo from "../../assets/aptiv-logo.svg";

const Employee = (p) => {
  return (
    <div className={c["form-container"]}>
      <div className={c.logo}>
        <img src={imglogo} alt="logo for aptiv" />
      </div>
      <div className={c.employeeT}>
        <span></span>
        <h1>Employee Info</h1>
      </div>
      <div className={c.infoC}>

      </div>
    </div>
  );
};

export default Employee;
