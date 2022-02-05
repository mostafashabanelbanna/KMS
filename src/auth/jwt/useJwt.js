// ** Core JWT Import
import useJwt from '@src/@core/auth/jwt/useJwt'

const { jwt } = useJwt({loginEndpoint : "https://localhost:44386/api/Account/Login", logoutEndpoint : "https://localhost:44386/api/Account/Logout"})
// const { jwt } = useJwt({loginEndpoint : "http://41.128.217.182:10081/api/api/Account/Login", logoutEndpoint : "http://41.128.217.182:10081/api/api/Account/Logout"})

export default jwt
//loginEndpoint : "https://localhost:44386/api/Account/Login", logoutEndpoint : "https://localhost:44386/api/Account/Logout"