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
  selectedProvider:{}
}

const providers = (state = initialState, action) => {
  switch (action.type) {
    
    case 'GET_DATA':
      return {
        ...state,
        data: action.data,
        totalPages: action.totalPages,
        params: action.params,
        getResponse: action.response,
        errorCode: action.errorCode
      }
    case 'GET_PROVIDER':
      return { ...state, selectedProvider: action.selectedProvider, errorCode: action.errorCode }
    case 'ADD_PROVIDER':
      return { ...state, createResponse: action.response, errorCode: action.errorCode  }
    case 'UPDATE_PROVIDER':
      return { ...state, updateResponse: action.response, errorCode: action.errorCode }
    case 'DELETE_PROVIDER':
      return { ...state, deleteResponse: action.response, errorCode: action.errorCode  }
    case 'RESET_PROVIDER_GET_RESPONSE':
      return { ...state, getResponse: {error:{}, statusCode: 0, errors:[]}}
    case 'RESET_PROVIDER_CREATE_RESPONSE':
      return { ...state, createResponse: {error:{}, statusCode: 0, errors:[]}}
    case 'RESET_PROVIDER_UPDATE_RESPONSE':
      return { ...state, updateResponse: {error:{}, statusCode: 0, errors:[]}}
    case 'RESET_PROVIDER_DELETE_RESPONSE':
      return { ...state, deleteResponse: {error:{}, statusCode: 0, errors:[]}}
    case 'RESET_AUTH_ERROR':
      return {...state, errorCode : 0}
    default:
      return { ...state }
  }
}
export default providers
