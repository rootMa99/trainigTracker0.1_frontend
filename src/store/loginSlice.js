import { createSlice } from "@reduxjs/toolkit";

const login = createSlice({
  name: "logins",
  initialState: {
    isLoged: {
      login: false,
      role: "",
      userName: "",
      token: "",
    },
    reducers: {
      login(s, p) {
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
    },
  },
});
