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
  selectedPeriodicity:{},
  seletctedInterval: []
}

const periodicities = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PERIODICITIES_DATA':
      return {
        ...state,
        data: action.data,
        totalPages: action.totalPages,
        params: action.params,
        getResponse: action.response,
        errorCode: action.errorCode
      }
    case 'GET_PERIODICITY':
      return { ...state, selectedPeriodicity: action.selectedPeriodicity }
    case 'ADD_PERIODICITY':
      return { ...state, createResponse: action.response, errorCode: action.errorCode  }
    case 'UPDATE_PERIODICITY':
      return { ...state, updateResponse: action.response, errorCode: action.errorCode }
    case 'DELETE_PERIODOCITY':
      return { ...state, deleteResponse: action.response }
    case 'RESET_GET_PERIODICITIES_RESPONSE':
      return { ...state, getResponse: {error:{}, statusCode: 0, errors:[]}}
    case 'RESET_CREATE_PERIODICITIES_RESPONSE':
      return { ...state, createResponse: {error:{}, statusCode: 0, errors:[]}}
    case 'RESET_UPDATE_PERIODICITIES_RESPONSE':
      return { ...state, updateResponse: {error:{}, statusCode: 0, errors:[]}}
    case 'RESET_DElETE_PERIODICITIES_RESPONSE':
      return { ...state, deleteResponse: {error:{}, statusCode: 0, errors:[]}}
    case 'RESET_AUTH_ERROR':
      return {...state, errorCode : 0}
    default:
      return { ...state }
  }
}
export default periodicities
