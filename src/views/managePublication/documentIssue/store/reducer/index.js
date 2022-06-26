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
    selectedDocumentIssue:{},
    allClassifications: [],
    selectedClassificationValues: [{classificationValues: []}]
  }
  
  const DocumentIssue = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_DOCUMENTISSUE_DATA':
        return {
          ...state,
          data: action.data,
          totalPages: action.totalPages,
          params: action.params,
          errorCode : action.errorCode
        }
      case 'GET_DOCUMENTISSUE':
        return { ...state, selectedDocumentIssue: action.selectedDocumentIssue, errorCode: action.errorCode }
      case 'ADD_DOCUMENTISSUE':
        return { ...state, createResponse: action.response, errorCode: action.errorCode  }
      case 'UPDATE_DOCUMENTISSUE':
        return { ...state, updateResponse: action.response, errorCode: action.errorCode }
      case 'DELETE_DOCUMENTISSUE':
        return { ...state, deleteResponse: action.response, errorCode: action.errorCode }
      case 'SET_DOCUMENTISSUE_ALL_CLASSIFICATIONS':
        return { ...state, allClassifications: action.allClassifications}
      case 'SET_DOCUMENTISSUE_SELECTED_CLASSIFICATION_VALUES':
        return { ...state, selectedClassificationValues: action.selectedClassificationValues}
      case 'RESET_DOCUMENTISSUE_GET_RESPONSE':
        return { ...state, getResponse: {error:{}, statusCode: 0, errors:[]}}
      case 'RESET_DOCUMENTISSUE_CREATE_RESPONSE':
          return { ...state, createResponse: {error:{}, statusCode: 0, errors:[]}}
      case 'RESET_DOCUMENTISSUE_UPDATE_RESPONSE':
        return { ...state, updateResponse: {error:{}, statusCode: 0, errors:[]}}
      case 'RESET_DOCUMENTISSUE_DELETE_RESPONSE':
        return { ...state, deleteResponse: {error:{}, statusCode: 0, errors:[]}}   
     
      default:
        return { ...state }
    }
  }
  export default DocumentIssue
  