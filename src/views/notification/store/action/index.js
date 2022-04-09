import axios from '../../../../axios'
import { isLoading, isNotLoading } from '../../../../redux/actions/layout'

// ** Get users data 
export const getData = params => {
  return async dispatch => {
    dispatch(isLoading())
    await axios.post('/Account/GetUserNotifications', params).then(response => {
      dispatch({
        type: 'GET_USERNOTIFICATION_DATA',
        data: response.data.data.items,
        totalPages: response.data.data.totalPages,
        params,
        response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
        errorCode: 200
      })
      dispatch(isNotLoading())

    }).catch(error => {
      const ErrorCode = 500
      if (error.response) {
        ErrorCode = error.response.status
      }
      dispatch({
        type: 'GET_USERNOTIFICATION_DATA',
        data : [],
        errorCode : ErrorCode
      })
      dispatch(isNotLoading())
    })
  }
}

export const getIsNotSeenCount = () => {
  return async dispatch => {
    await axios.get(`/Account/GetIsNotSeenNotificationsCount`)
    .then(response => {
        console.log(response.data.data)
        dispatch({type: "SET_ISNOT_SEEN_NOTIFICATION", isNotSeenCount: response.data.data})
    })
    .catch(error => {})
  } 
  
}