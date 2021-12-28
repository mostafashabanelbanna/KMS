import Axios from "axios"
import jwt from "./auth/jwt/useJwt"

const axios = Axios.create({
  // baseURL: process.env.REACT_APP_BASEURL,
  baseURL: "https://localhost:44386/api",
  headers:  {
        "Access-Control-Allow-Origin":  "*",
        Authorization : `Bearer ${jwt.getToken()}`,
        "Content-type": "application/json"
    }
  
})

export default axios
