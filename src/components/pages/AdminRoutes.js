import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../admin/Home";
import Dashboard from "../admin/Dashboard";
import CreateUser from "../admin/CreateUser";
import AddSession from "../admin/AddSession";

const AdminRoutes = (p) => {
    console.log(p.d)
  return (
    <Suspense>
      <Routes>
        <Route index path="/" element={<Navigate replace to="/home" />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/dashboard" element={<Dashboard type="dashboard" />} />
        <Route exact path="/reporting" element={<Dashboard type="reporting" />} />
        <Route exact path="/uploadFiles" element={<AddSession />} />
        {p.role==="ROOT" && <Route exact path="/createuser" element={<CreateUser />} />}
        <Route path="*" element={<Navigate replace to="/home" />} />
      </Routes>
    </Suspense>
  );
};
export default AdminRoutes;
