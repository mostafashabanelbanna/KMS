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
    selectedClassificationValues: [{classificationValues: []}],

    // Front Data
    frontData: [],
    frontTotalPages: 1,
    frontParams: {
      pageNumber: 1,
      rowsPerPage: 10,
      name: '',
      dateFrom: new Date("2004-01-01"),
      dateTo: new Date(),
      departments: [],
      providers: [],
      status: []
    }


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
      case 'GET_INQUIRY_FRONT_DATA':
        return {
          ...state,
          frontData: action.data,
          frontTotalPages: action.totalPages
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
      case 'SET_FRONT_INQUIRY_PARAMS':
        return { ...state, frontParams: action.frontParams}  
      default:
        return { ...state }
    }
  }
  export default Inquiry
  