import React, { useState } from "react";
import aptivBgVid from "../../assets/videointro.mp4";
import c from "./Home.module.css";
import Employee from "./Employee";
import BackDrop from "../UI/BackDrop";
import api from "../../service/api";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../store/loginSlice";
import NetworkNotify from "../UI/NetworkNotify";

const Home = (p) => {
  const {isLoged}=useSelector((s) => s.login);
  const [typing, setTyping] = useState(false);
  const [value, setValue] = useState("");
  const [show, setShow]=useState(false);
  const [err, setErr]=useState(false);
  const dispatch= useDispatch();


  const onChangeHandler = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      if (value.trim() !== "" && +value !== 0) {
        setTyping(true);
        setValue(+value);
      } else if (value.trim() === "" || +value === 0) {
        setTyping(false);
        setValue(+value);
      }
    }
  };
  const onBlurHandler = (e) => {
    if (value === 0) {
      setTyping(false);
    }
  };
  const onClickHandler =async (e) => {
    try {
      const response = await fetch(`${api}/employee/employee?matricule=${value}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isLoged.token}`
        },
      });

      const data = await response.json();
      console.log(data);
      dispatch(loginActions.setEmployeeData(data))
      setTyping(false);
    setErr(false);
    setShow(true);
    } catch (error) {
      console.error("Error:", error);
      setErr(true);
    }
    
    //setValue("");
  };
  const onClose=e=>{
    setShow(false);
    setValue("");
  }
  const classBtn = !typing ? c.buttonOut : c.buttonIn;
  if (err) {
    setTimeout(() => {
      setErr(false);
    }, 8000);
  }
  return (
    <React.Fragment>
    {
      err && <NetworkNotify message={`No employee found by matricule: ${value}, please try again`} success={false} />
    }
      <video className={c.videoBg} autoPlay loop playsInline muted>
        <source src={aptivBgVid} type="video/mp4" />
      </video>
      {
        show && <BackDrop click={onClose}/>
      }
      {
        show && <Employee />
      }
      <div className={c.inputHolder}>
        <h1>
          <span>Level Up Your Skills:</span> Interactive Training at Your Fingertips
        </h1>
        <input
          type="text"
          placeholder="Search By matricule"
          pattern="[0-9]*"
          value={value}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
        />
        <button className={classBtn} onClick={onClickHandler}>
          Search
        </button>
      </div>
    </React.Fragment>
  );
};
export default Home;
