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
  selectedWebResource:{}
}

const webResources = (state = initialState, action) => {
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
    case 'GET_WEB_SOURCE':
      return { ...state, selectedWebResource: action.selectedWebResource, errorCode: action.errorCode }
    case 'ADD_WEB_SOURCE':
      return { ...state, createResponse: action.response, errorCode: action.errorCode  }
    case 'UPDATE_WEB_SOURCE':
      return { ...state, updateResponse: action.response, errorCode: action.errorCode }
    case 'DELETE_WEB_SOURCE':
      return { ...state, deleteResponse: action.response, errorCode: action.errorCode  }
    case 'RESET_WEB_SOURCE_GET_RESPONSE':
      return { ...state, getResponse: {error:{}, statusCode: 0, errors:[]}}
    case 'RESET_WEB_SOURCE_CREATE_RESPONSE':
      return { ...state, createResponse: {error:{}, statusCode: 0, errors:[]}}
    case 'RESET_WEB_SOURCE_UPDATE_RESPONSE':
      return { ...state, updateResponse: {error:{}, statusCode: 0, errors:[]}}
    case 'RESET_WEB_SOURCE_DELETE_RESPONSE':
      return { ...state, deleteResponse: {error:{}, statusCode: 0, errors:[]}}
    case 'RESET_AUTH_ERROR':
      return {...state, errorCode : 0}
    default:
      return { ...state }
  }
}
export default webResources
