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
  },
  createResponse: {
    error : {},
    statusCode: 0,
    errors: []
  },
  updateResponse: {
    error : {},
    statusCode: 0,
    errors: []
  },
  deleteResponse: {
    error : {},
    statusCode: 0,
    errors: []
  },
  selectedIndicator:{}
}

const users = (state = initialState, action) => {
  switch (action.type) {
    // case 'GET_ALL_DATA':
    //   return { ...state, allData: action.data }
    case 'GET_DATA':
      return {
        ...state,
        data: action.data,
        totalPages: action.totalPages,
        params: action.params,
        getResponse: action.response,
        errorCode: action.errorCode
      }
    case 'GET_INDICATOR':
      return { ...state, selectedIndicator: action.selectedIndicator }
    case 'ADD_INDICATOR':
      return { ...state, createResponse: action.response, errorCode: action.errorCode  }
    case 'UPDATE_INDICATOR':
      return { ...state, updateResponse: action.response, errorCode: action.errorCode }
    case 'DELETE_INDICATOR':
      return { ...state, deleteResponse: action.response }
    case 'RESET_GET_INDICATOR_RESPONSE':
      return { ...state, getResponse: {error:{}, statusCode: 0, errors:[]}}
    case 'RESET_CREATE_INDICATOR_RESPONSE':
      return { ...state, createResponse: {error:{}, statusCode: 0, errors:[]}}
    case 'RESET_INDICATOR_UPDATE_RESPONSE':
      return { ...state, updateResponse: {error:{}, statusCode: 0, errors:[]}}
    case 'RESET_INDICATOR_DELETE_RESPONSE':
      return { ...state, deleteResponse: {error:{}, statusCode: 0, errors:[]}}
    case 'RESET_AUTH_ERROR':
      return {...state, errorCode : 0}
    default:
      return { ...state }
  }
}
export default users
