import React, { useState } from "react";
import aptivBgVid from "../../assets/videointro.mp4";
import c from "./Home.module.css";
import Employee from "./Employee";
import BackDrop from "../UI/BackDrop";


const Home = (p) => {
  const [typing, setTyping] = useState(false);
  const [value, setValue] = useState("");
  const [show, setShow]=useState(false);

  const onChangeHandler = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      if (value.trim() !== "" && +value !== 0) {
        setTyping(true);
        setValue(value);
      } else if (value.trim() === "" || +value === 0) {
        setTyping(false);
        setValue(e.target.value);
      }
    }
  };
  const onBlurHandler = (e) => {
    if (value === 0) {
      setTyping(false);
    }
  };
  const onClickHandler = (e) => {
    setTyping(false);
    setShow(true);
    //setValue("");
  };
  const onClose=e=>{
    setShow(false);
    setValue("");
  }
  const classBtn = !typing ? c.buttonOut : c.buttonIn;
  return (
    <React.Fragment>
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
          <span>The Bridge to Success:</span> Training and Transformation
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
