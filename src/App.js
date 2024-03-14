import { useSelector } from "react-redux";
import "./App.css";
import NavBar from "./components/UI/NavBar";
import Login from "./components/login/Login";

function App() {
  const { isLoged } = useSelector((s) => s.login);
  return (
    <div className="App">
      <NavBar />
      {!isLoged.login && <Login />}
    </div>
  );
}

export default App;
