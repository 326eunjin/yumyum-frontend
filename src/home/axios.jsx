import axios from "axios";

const instance = axios.create({
  baseURL: "https://yumyum-backend-48405822bc43.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
