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
  dateBetween:getThisYearStartToEnd(),
  employeeData:[],
  titleAndType:[],
  dataDashboard:[],
  handyData:{}
},
    reducers: {
      setTitleAndType(s,p){
        s.titleAndType=p.payload
      },
      setHandyData(s,p){
        s.handyData=p.payload;
      },
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
      },
      setEmployeeData(s,p){
        s.employeeData=p.payload;
      },
      addTrainingToEmployee(s,p){
        const data=s.employeeData;
        data.trainingFromExcels.push(p.payload);
        s.employeeData=data;
      },
      editTraining(s,p){
        const data = s.employeeData.trainingFromExcels;
        const newData= data.filter(f=>f.trainingId!== p.payload.id);
        newData.push(p.payload.data)
        s.employeeData.trainingFromExcels=newData;
      }, 
      deleteTrainigToEmployee(s,p){
        console.log(JSON.parse(JSON.stringify(s.employeeData.trainingFromExcels)), p.payload.id)
        const fd=JSON.parse(JSON.stringify(s.employeeData.trainingFromExcels)).filter(f=>f.trainingId!== p.payload.id)
        console.log(fd)
        s.employeeData.trainingFromExcels=fd;
      },
      addDataToDataDashboard(s, p){
        s.dataDashboard=p.payload;
      }
    },
});


export const loginActions = loginS.actions;
export default loginS;