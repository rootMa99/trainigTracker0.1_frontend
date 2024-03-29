import React, { useState } from "react";
import c from "./AddSession.module.css";
import Cns from "./Cns";

const AddSession = (p) => {
  const [switcher, setSwitcher] = useState("cns");

  return (
    <React.Fragment>
      <ul className={c.interLink}>
        <li
          style={
            switcher === "cns"
              ? {
                  opacity: "1",

                  borderBottom: "2px solid white",
                }
              : {}
          }
          onClick={(e) => setSwitcher("cns")}
        >
          create a new session
        </li>
        <li
          style={
            switcher === "uf"
              ? {
                  opacity: "1",

                  borderBottom: "2px solid white",
                }
              : {}
          }
          onClick={(e) => setSwitcher("uf")}
        >
          upload files
        </li>
      </ul>

      {switcher === "cns" && <Cns />}
      {switcher === "uf" && <h1>uf</h1>}
    </React.Fragment>
  );
};

export default AddSession;
