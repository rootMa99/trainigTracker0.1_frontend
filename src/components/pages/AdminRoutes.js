import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../admin/Home";

const AdminRoutes = (p) => {
    console.log(p.d)
  return (
    <Suspense>
      <Routes>
        <Route index path="/" element={<Navigate replace to="/home" />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/dashboard" element={<h1>dashboard</h1>} />
        <Route exact path="/reporting" element={<h1>reporting</h1>} />
        <Route exact path="/uploadFiles" element={<h1>uploadFiles</h1>} />
        {p.role==="ROOT" && <Route exact path="/createuser" element={<h1>createuser</h1>} />}
        <Route path="*" element={<Navigate replace to="/home" />} />
      </Routes>
    </Suspense>
  );
};
export default AdminRoutes;
