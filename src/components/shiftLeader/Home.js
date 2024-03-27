import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../service/api";
import { loginActions } from "../../store/loginSlice";
import c from "./Home.module.css";

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

  return (
    <React.Fragment>
      <ul className={c.options}>
        <li
          style={
            selected === "vo"
              ? { opacity: 1, borderBottom: "2px solid white" }
              : {}
          }
        >
          qualification orders
        </li>
        <li
          style={
            selected === "mo"
              ? { opacity: 1, borderBottom: "2px solid white" }
              : {}
          }
        >
          make new qualification order
        </li>
      </ul>
    </React.Fragment>
  );
};

export default Home;
