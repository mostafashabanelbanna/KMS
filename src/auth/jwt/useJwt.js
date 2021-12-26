// ** Core JWT Import
import useJwt from '@src/@core/auth/jwt/useJwt'

const { jwt } = useJwt({loginEndpoint : "https://localhost:7262/api/Account/Login", logoutEndpoint : "https://localhost:/api/Account/Logout"})

export default jwt
//loginEndpoint : "https://localhost:44386/api/Account/Login", logoutEndpoint : "https://localhost:44386/api/Account/Logout"