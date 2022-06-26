import { ajaxTransport } from "jquery"

const initialState = {
    allLookups: [],
    lookupName:'',
    data: [],
    totalPages: 1,
    params: {},
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
    selectedLookup:{}
    
  }
  const Lookups = (state = initialState, action) => {
    switch (action.type) {
      // case 'GET_ALL_DATA':
      //   return { ...state, allData: action.data }
      case 'GET_LOOKUPS':
        return {
          ...state,
          allLookups : action.AllLookups
        }
      case 'GET_LOOKUP_DATA':
        return {
          ...state,
          data: action.data,
          totalPages: action.totalPages,
          params: action.params,
          lookupName: action.lookupName
        }
      case 'ADD_LOOKUP':
        return { ...state, createResponse: action.response }
      case 'GET_LOOKUP':
        return { ...state, selectedLookup: action.selectedLookup }
      case 'UPDATE_LOOKUP':
        return { ...state, updateResponse: action.response }
      case 'DELETE_LOOKUP':
        return { ...state, deleteResponse: action.response }
      case 'RESET_CREATE_LOOKUP_RESPONSE':
        return { ...state, createResponse: {error:{}, statusCode: 0, errors:[]}}
      case 'RESET_UPDATE_LOOKUP_RESPONSE':
        return { ...state, updateResponse: {error:{}, statusCode: 0, errors:[]}}
      case 'RESET_DELETE_LOOKUP_RESPONSE':
        return { ...state, deleteResponse: {error:{}, statusCode: 0, errors:[]}}
      default:
        return { ...state }
    }
  }
  export default Lookups