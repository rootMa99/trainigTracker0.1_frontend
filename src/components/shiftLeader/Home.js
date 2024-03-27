import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../service/api";
import { loginActions } from "../../store/loginSlice";
import c from "./Home.module.css";
import MakeOreder from "./MakeOreder";
import ViewOreders from "./ViewOreders";

const Home = (p) => {
  const { isLoged } = useSelector((s) => s.login);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("vo");
  const callback = useCallback(async () => {
    try {
      const response = await fetch(
        `${api}/other?shiftLeader=${isLoged.userName}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${isLoged.token}`,
          },
        }
      );

      const data = await response.json();
      console.log(data);
      dispatch(loginActions.addEBSL(data));
    } catch (error) {
      console.error("Error:", error);
    }
  }, [isLoged, dispatch]);

  useEffect(() => {
    callback();
  }, [callback]);
const close=()=>{
    setSelected("vo")
}
  return (
    <React.Fragment>
      <ul className={c.options}>
        <li
          style={
            selected === "vo"
              ? { opacity: 1, borderBottom: "2px solid white" }
              : {}
          }
          onClick={(e) => setSelected("vo")}
        >
          qualification orders
        </li>
        <li
          style={
            selected === "mo"
              ? { opacity: 1, borderBottom: "2px solid white" }
              : {}
          }
          onClick={(e) => setSelected("mo")}
        >
          make new qualification order
        </li>
      </ul>

      <div className={c.bobyContainer} >
      {
        selected==="vo" && <ViewOreders />
      }
      {
        selected==="mo" && <MakeOreder click={close} />
      }
      </div>

    </React.Fragment>
  );
};

export default Home;
