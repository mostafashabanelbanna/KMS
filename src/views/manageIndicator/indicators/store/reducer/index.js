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
  selectedIndicator:{},
  allClassifications: [],
  selectedClassificationValues: [],
  allUnitLabels: [],
  selectedUnits: []
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
    case 'SET_ALL_CLASSIFICATIONS':
      return { ...state, allClassifications: action.allClassifications}
    case 'SET_SELECTED_CLASSIFICATION_VALUES':
      return { ...state, selectedClassificationValues: action.selectedClassificationValues}
    case 'SET_ALL_UNIT_LABELS':
      return {...state, allUnitLabels: action.allUnitLabels}
    case 'SET_SELECTED_UNITS':
      return {...state, selectedUnits: action.selectedUnits}
    case 'RESET_AUTH_ERROR':
      return {...state, errorCode : 0}
    default:
      return { ...state }
  }
}
export default users
