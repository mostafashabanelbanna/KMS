// ** Core JWT Import
import useJwt from '@src/@core/auth/jwt/useJwt'

// const { jwt } = useJwt({loginEndpoint : "https://localhost:44386/api/Account/Login", logoutEndpoint : "https://localhost:44386/api/Account/Logout"})
// const { jwt } = useJwt({loginEndpoint : "http://163.121.36.62:81/api/Account/Login", logoutEndpoint : "http://163.121.36.62:81/api/Account/Logout"})
const { jwt } = useJwt({loginEndpoint : `${process.env.REACT_APP_BASEURL}/Account/Login`, logoutEndpoint :  `${process.env.REACT_APP_BASEURL}/Account/Logout`})

// console.log(jwt.getToken())
export default jwt
//loginEndpoint : "https://localhost:44386/api/Account/Login", logoutEndpoint : "https://localhost:44386/api/Account/Logout"