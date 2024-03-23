import { createSlice } from "@reduxjs/toolkit";
import { getThisYearStartToEnd } from "../components/functions/dateFunction";



const loginS = createSlice({
  name: "logins",
  initialState: {
    isLoged: {
      login: false,
      role: "",
      userName: "",
      token: "",
    },
  dateBetween:getThisYearStartToEnd()},
    reducers: {
      logIn(s, p) {
        s.isLoged.login = true;
        s.isLoged.role = p.payload.role;
        s.isLoged.userName = p.payload.userName;
        s.isLoged.token = p.payload.token;
      },
      logout(s, p) {
        s.isLoged = {
          login: false,
          role: "",
          userName: "",
          token: "",
        };
      },
      setDateBetween(s,p){
        s.dateBetween=p.payload;
      },
      setDateYearStart(s,p){
        s.dateBetween.start=p.payload;
      },
      setDateYearEnd(s,p){
        s.dateBetween.end=p.payload;
      }
    },
});


export const loginActions = loginS.actions;
export default loginS;