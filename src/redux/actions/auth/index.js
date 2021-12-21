// ** UseJWT import to get config
import useJwt from '@src/auth/jwt/useJwt'

const config = useJwt.jwtConfig

// ** Handle User Login
export const handleLogin = data => {
  
  // convert expiration Date into time

  const expirationDate = new Date(Date.parse(data.expiration)).getTime()

  return dispatch => {
    dispatch({
      type: 'LOGIN',
      data,
      config,
      [config.storageTokenKeyName]: data[config.storageTokenKeyName],
      [config.storageExpirationKeyName]: data[config.storageExpirationKeyName],
      [config.storageRefreshTokenKeyName]: data[config.storageRefreshTokenKeyName]
    })

    // ** Add to user, accessToken & refreshToken to localStorage
    localStorage.setItem('userData', JSON.stringify(data))
    localStorage.setItem(config.storageTokenKeyName, data.accessToken)
    localStorage.setItem(config.storageExpirationKeyName, expirationDate)
    localStorage.setItem(config.storageRefreshTokenKeyName, JSON.stringify(data.refreshToken))
  }
}

// ** Handle User Logout
export const handleLogout = () => {
  return dispatch => {
    dispatch({ type: 'LOGOUT', [config.storageTokenKeyName]: null, [config.storageRefreshTokenKeyName]: null, [config.storageExpirationKeyName]: null })

    // ** Remove user, accessToken & refreshToken from localStorage
    localStorage.removeItem('userData')
    localStorage.removeItem(config.storageTokenKeyName)
    localStorage.removeItem(config.storageExpirationKeyName)
    localStorage.removeItem(config.storageRefreshTokenKeyName)
  }
}

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
      setTimeout(() => {
          dispatch(handleLogout())
      }, expirationTime)
  }
}

// 
export const authCheckState = () => {
  return dispatch => {
      const token = localStorage.getItem('accessToken')
      if (!token) {
          dispatch(handleLogout())
      } else {
          const expirationDate = localStorage.getItem('expiration')
          if (expirationDate <= new Date().getTime()) {
              dispatch(handleLogout())
          } else {
              // const userId = localStorage.getItem('userId')
              // dispatch(authSuccess(token, userId))
              const nowTime =  new Date().getTime()
              const expirationTimeout = expirationDate - nowTime
              dispatch(checkAuthTimeout(expirationTimeout))
          }   
      }
  }
}