import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../shiftLeader/Home";


const ShiftLeaderRoutes=p=>{
    return (
        <Suspense>
          <Routes>
            <Route index path="/" element={<Navigate replace to="/home" />} />
            <Route exact path="/home" element={<Home />} />
            <Route path="*" element={<Navigate replace to="/home" />} />
          </Routes>
        </Suspense>
      );
}
export default ShiftLeaderRoutes