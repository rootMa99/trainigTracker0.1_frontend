import React from "react";
import c from "./Home.module.css";

import ViewOreders from "./ViewOreders";

const Home = (p) => {


  return (
    <React.Fragment>

      <div className={c.bobyContainer} >
      <ViewOreders />
      
      </div>

    </React.Fragment>
  );
};

export default Home;
