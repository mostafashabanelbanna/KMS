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
    selectedDefinition:{}
  }
  
  const Definition = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_DEFINITION_DATA':
        return {
          ...state,
          data: action.data,
          totalPages: action.totalPages,
          params: action.params,
          errorCode : action.errorCode
        }
      case 'GET_DEFINITION':
        return { ...state, selectedDefinition: action.selectedDefinition, errorCode: action.errorCode }
      case 'ADD_DEFINITION':
        return { ...state, createResponse: action.response, errorCode: action.errorCode  }
      case 'UPDATE_DEFINITION':
        return { ...state, updateResponse: action.response, errorCode: action.errorCode }
      case 'DELETE_DEFINITION':
        return { ...state, deleteResponse: action.response, errorCode: action.errorCode }
      case 'RESET_DEFINITION_GET_RESPONSE':
        return { ...state, getResponse: {error:{}, statusCode: 0, errors:[]}}
      case 'RESET_DEFINITION_CREATE_RESPONSE':
          return { ...state, createResponse: {error:{}, statusCode: 0, errors:[]}}
      case 'RESET_DEFINITION_UPDATE_RESPONSE':
        return { ...state, updateResponse: {error:{}, statusCode: 0, errors:[]}}
      case 'RESET_DEFINITION_DELETE_RESPONSE':
        return { ...state, deleteResponse: {error:{}, statusCode: 0, errors:[]}}   
     
      default:
        return { ...state }
    }
  }
  export default Definition
  