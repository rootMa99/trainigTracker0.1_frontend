import { useSelector } from "react-redux";
import "./App.css";
import NavBar from "./components/UI/NavBar";
import Login from "./components/login/Login";
import AdminRoutes from "./components/pages/AdminRoutes";
import ShiftLeaderRoutes from "./components/pages/ShiftLeaderRoutes";
import TrainerRoutes from "./components/pages/TrainerRoutes";

function App() {
  const { isLoged } = useSelector((s) => s.login);
  console.log(isLoged, isLoged.role === "ROOT");
  return (
    <div className="App">
      <NavBar />
      {!isLoged.login ? (
        <Login />
      ) : isLoged.role === "ROOT" ? (
        <AdminRoutes d="9009" />
      ) : isLoged.role === "Admin" ? (
        <AdminRoutes />
      ) : isLoged.role === "SHIFT_LEADER" ? (
        <ShiftLeaderRoutes />
      ) : (
        <TrainerRoutes />
      )}
    </div>
  );
}

export default App;
