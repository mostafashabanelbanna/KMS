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
  selectedDimensionLevel:{}
}

const DimensionLevels = (state = initialState, action) => {
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
    case 'GET_INNER_DIMENSION_VALUE':
      return { ...state, selectedDimensionLevel: action.selectedDimensionLevel }
    case 'ADD_DIMENSION_LEVEL':
      return { ...state, createResponse: action.response, errorCode: action.errorCode  }
    case 'UPDATE_DIMENSION_LEVEL':
      return { ...state, updateResponse: action.response, errorCode: action.errorCode }
    case 'DELETE_DIMENSION_LEVEL':
      return { ...state, deleteResponse: action.response }
    case 'RESET_GET_INNER_DIMENSION_LEVEL_RESPONSE':
      return { ...state, getResponse: {error:{}, statusCode: 0, errors:[]}}
    case 'RESET_CREATE_DIMENSION_LEVEL_RESPONSE':
      return { ...state, createResponse: {error:{}, statusCode: 0, errors:[]}}
    case 'RESET_UPDATE_DIMENSION_LEVEL_RESPONSE':
      return { ...state, updateResponse: {error:{}, statusCode: 0, errors:[]}}
    case 'RESET_DELETE_DIMENSION_LEVEL_RESPONSE':
      return { ...state, deleteResponse: {error:{}, statusCode: 0, errors:[]}}
    case 'RESET_AUTH_ERROR':
      return {...state, errorCode : 0}
    default:
      return { ...state }
  }
}
export default DimensionLevels
