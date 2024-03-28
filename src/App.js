import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import NavBar from "./components/UI/NavBar";
import Login from "./components/login/Login";
import AdminRoutes from "./components/pages/AdminRoutes";
import ShiftLeaderRoutes from "./components/pages/ShiftLeaderRoutes";
import TrainerRoutes from "./components/pages/TrainerRoutes";
import { useCallback, useEffect } from "react";
import api from "./service/api";
import { loginActions } from "./store/loginSlice";

function App() {
  const { isLoged } = useSelector((s) => s.login);
  const dispatch = useDispatch();
  console.log(isLoged, isLoged.role === "ROOT");

  const callback = useCallback(async () => {
    try {
      const response = await fetch(`${api}/other/trainingTypeAndTitle`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      dispatch(loginActions.setTitleAndType(data));
    } catch (error) {
      console.error("Error:", error);
    }
    try {
      const response = await fetch(`${api}/other/categoriesAndDepartments`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      dispatch(loginActions.setHandyData(data));
    } catch (error) {
      console.error("Error:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    callback();
  }, [callback]);

  return (
    <div className="App">
      <NavBar />
      {!isLoged.login ? (
        <Login />
      ) : isLoged.role === "ROOT" ? (
        <AdminRoutes role={isLoged.role} />
      ) : isLoged.role === "ADMIN" ? (
        <AdminRoutes role={isLoged.role} />
      ) : isLoged.role === "SHIFT_LEADER" ? (
        <ShiftLeaderRoutes />
      ) : (
        <TrainerRoutes />
      )}
    </div>
  );
}

export default App;
