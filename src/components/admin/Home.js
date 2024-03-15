import React, { useState } from "react";
import aptivBgVid from "../../assets/videointro.mp4";
import c from "./Home.module.css";
import { useNavigate } from "react-router-dom";

const Home = (p) => {
  const [typing, setTyping] = useState(false);
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      if (value.trim() !== "") {
        setTyping(true);
        setValue(value);
      } else if (value.trim() === "" || +value <= 0) {
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
    setValue("");
    navigate(`/home/${value}`);
  };

  const classBtn = !typing ? c.buttonOut : c.buttonIn;
  return (
    <React.Fragment>
      <video className={c.videoBg} autoPlay loop playsInline muted>
        <source src={aptivBgVid} type="video/mp4" />
      </video>
      <div className={c.inputHolder}>
        <h1>
          <span>The Bridge to Success:</span> Training and Transformation
        </h1>
        <input
          type="number"
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
