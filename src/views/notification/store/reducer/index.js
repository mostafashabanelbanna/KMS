// ** Initial State
const initialState = {
    allData: [],
    data: [],
    totalPages: 1,
    params: {},
    errorCode : 0,
    isNotSeenCount : 0,
    connection: {}
  }
  
  const UserNotification = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_USERNOTIFICATION_DATA':
        return {
          ...state,
          data: action.data,
          totalPages: action.totalPages,
          params: action.params,
          errorCode : action.errorCode
        }
      case 'SET_ISNOT_SEEN_NOTIFICATION':
        return {
          ...state,
          isNotSeenCount: action.isNotSeenCount
        }
      case 'SET_NOTIFICATION_CONNECTION':
        return {
          ...state,
          connection: action.connection
        }
      default:
        return { ...state }
    }
  }
  export default UserNotification
  