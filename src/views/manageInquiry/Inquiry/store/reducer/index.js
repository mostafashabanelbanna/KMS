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
    selectedInquiry:{},
    allClassifications: [],
    selectedClassificationValues: [{classificationValues: []}]
  }
  
  const Inquiry = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_INQUIRY_DATA':
        return {
          ...state,
          data: action.data,
          totalPages: action.totalPages,
          params: action.params,
          errorCode : action.errorCode
        }
      case 'GET_INQUIRY':
        return { ...state, selectedInquiry: action.selectedInquiry, errorCode: action.errorCode }
      case 'ADD_INQUIRY':
        return { ...state, createResponse: action.response, errorCode: action.errorCode  }
      case 'UPDATE_INQUIRY':
        return { ...state, updateResponse: action.response, errorCode: action.errorCode }
      case 'DELETE_INQUIRY':
        return { ...state, deleteResponse: action.response, errorCode: action.errorCode }
      case 'SET_INQUIRY_ALL_CLASSIFICATIONS':
        return { ...state, allClassifications: action.allClassifications}
      case 'SET_INQUIRY_SELECTED_CLASSIFICATION_VALUES':
        return { ...state, selectedClassificationValues: action.selectedClassificationValues}
      case 'RESET_INQUIRY_GET_RESPONSE':
        return { ...state, getResponse: {error:{}, statusCode: 0, errors:[]}}
      case 'RESET_INQUIRY_CREATE_RESPONSE':
          return { ...state, createResponse: {error:{}, statusCode: 0, errors:[]}}
      case 'RESET_INQUIRY_UPDATE_RESPONSE':
        return { ...state, updateResponse: {error:{}, statusCode: 0, errors:[]}}
      case 'RESET_INQUIRY_DELETE_RESPONSE':
        return { ...state, deleteResponse: {error:{}, statusCode: 0, errors:[]}}   
     
      default:
        return { ...state }
    }
  }
  export default Inquiry
  