// ** Initial State
const initialState = {
    allData: [],
    data: [],
    totalPages: 1,
    params: {},
    errorCode : 0,
    getResponse: {
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
    selectedClassification:{}
  }
  
  const Classification = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_CLASSIFICATION_DATA':
        return {
          ...state,
          data: action.data,
          totalPages: action.totalPages,
          params: action.params,
          getResponse: action.response,
          errorCode : action.errorCode
        }
      case 'GET_CLASSIFICATION':
        return { ...state, selectedClassification: action.selectedClassification, errorCode: action.errorCode }
      case 'ADD_CLASSIFICATION':
        return { ...state, createResponse: action.response, errorCode: action.errorCode  }
      case 'UPDATE_CLASSIFICATION':
        return { ...state, updateResponse: action.response, errorCode: action.errorCode }
      case 'DELETE_CLASSIFICATION':
        return { ...state, deleteResponse: action.response, errorCode: action.errorCode }
      case 'RESET_CLASSIFICATION_GET_RESPONSE':
        return { ...state, getResponse: {error:{}, statusCode: 0, errors:[]}}
      case 'RESET_CLASSIFICATION_CREATE_RESPONSE':
          return { ...state, createResponse: {error:{}, statusCode: 0, errors:[]}}
      case 'RESET_CLASSIFICATION_UPDATE_RESPONSE':
        return { ...state, updateResponse: {error:{}, statusCode: 0, errors:[]}}
      case 'RESET_CLASSIFICATION_DELETE_RESPONSE':
        return { ...state, deleteResponse: {error:{}, statusCode: 0, errors:[]}}
      default:
        return { ...state }
    }
  }
  export default Classification
  