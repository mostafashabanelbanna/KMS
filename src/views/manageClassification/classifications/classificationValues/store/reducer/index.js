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
    selectedClassificationValue:{}
  }
  
  const ClassificationValue = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_CLASSIFICATION_VALUE_DATA':
        return {
          ...state,
          data: action.data,
          totalPages: action.totalPages,
          params: action.params,
          getResponse: action.response,
          errorCode : action.errorCode
        }
      case 'GET_CLASSIFICATION_VALUE':
        return { ...state, selectedClassificationValue: action.selectedClassificationValue, errorCode: action.errorCode }
      case 'ADD_CLASSIFICATION_VALUE':
        return { ...state, createResponse: action.response, errorCode: action.errorCode  }
      case 'UPDATE_CLASSIFICATION_VALUE':
        return { ...state, updateResponse: action.response, errorCode: action.errorCode }
      case 'DELETE_CLASSIFICATION_VALUE':
        return { ...state, deleteResponse: action.response, errorCode: action.errorCode }
      case 'RESET_CLASSIFICATION_VALUE_GET_RESPONSE':
        return { ...state, getResponse: {error:{}, statusCode: 0, errors:[]}}
      case 'RESET_CLASSIFICATION_VALUE_CREATE_RESPONSE':
          return { ...state, createResponse: {error:{}, statusCode: 0, errors:[]}}
      case 'RESET_CLASSIFICATION_VALUE_UPDATE_RESPONSE':
        return { ...state, updateResponse: {error:{}, statusCode: 0, errors:[]}}
      case 'RESET_CLASSIFICATION_VALUE_DELETE_RESPONSE':
        return { ...state, deleteResponse: {error:{}, statusCode: 0, errors:[]}}
      default:
        return { ...state }
    }
  }
  export default ClassificationValue
  