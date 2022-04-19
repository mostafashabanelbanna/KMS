// ** Initial State
const initialState = {
  allData: [],
  data: [],
  totalPages: 1,
  params: {},
  errorCode : 0,
  getResponse:{
    error : {},
    statusCode: 0,
    errors: []
  }
}

const oldIndiators = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_OLDINDICATOR_DATA':
      return {
        ...state,
        data: action.data,
        totalPages: action.totalPages,
        params: action.params,
        getResponse: action.response,
        errorCode: action.errorCode
      }
    case 'RESET_AUTH_ERROR':
      return {...state, errorCode : 0}
    default:
      return { ...state }
  }
}
export default oldIndiators
