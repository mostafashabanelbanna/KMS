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
    selectedInquiryProcedure:{}
  }
  
  const DocumentLibrary = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_INQUIRYPROCEDURE_DATA':
        return {
          ...state,
          data: action.data,
          totalPages: action.totalPages,
          params: action.params,
          errorCode : action.errorCode
        }
      case 'GET_INQUIRYPROCEDURE':
        return { ...state, selectedInquiryProcedure: action.selectedInquiryProcedure, errorCode: action.errorCode }
      case 'ADD_INQUIRYPROCEDURE':
        return { ...state, createResponse: action.response, errorCode: action.errorCode  }
      case 'UPDATE_INQUIRYPROCEDURE':
        return { ...state, updateResponse: action.response, errorCode: action.errorCode }
      case 'DELETE_INQUIRYPROCEDURE':
        return { ...state, deleteResponse: action.response, errorCode: action.errorCode }
      case 'RESET_INQUIRYPROCEDURE_GET_RESPONSE':
        return { ...state, getResponse: {error:{}, statusCode: 0, errors:[]}}
      case 'RESET_INQUIRYPROCEDURE_CREATE_RESPONSE':
          return { ...state, createResponse: {error:{}, statusCode: 0, errors:[]}}
      case 'RESET_INQUIRYPROCEDURE_UPDATE_RESPONSE':
        return { ...state, updateResponse: {error:{}, statusCode: 0, errors:[]}}
      case 'RESET_INQUIRYPROCEDURE_DELETE_RESPONSE':
        return { ...state, deleteResponse: {error:{}, statusCode: 0, errors:[]}}   
     
      default:
        return { ...state }
    }
  }
  export default DocumentLibrary
  