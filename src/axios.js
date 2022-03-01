import Axios from "axios"
import jwt from "./auth/jwt/useJwt"

const axios = Axios.create({
  // baseURL: process.env.REACT_APP_BASEURL,
  // REACT_APP_BASEURL = "http://163.121.36.62:81/api"
  // baseURL: "http://41.128.217.182:10081/api/api",
  // baseURL: "https://localhost:7262/api",
  // baseURL: "https://localhost:44386/api",
  baseURL: process.env.REACT_APP_BASEURL,
  headers:  {
        "Access-Control-Allow-Origin":  "*",
        Authorization : `Bearer ${jwt.getToken()}`,
        "Content-type": "application/json"
    }
  
})

export default axios
