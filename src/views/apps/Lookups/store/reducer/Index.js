import { ajaxTransport } from "jquery"

const initialState = {
    allLookups: [],
    lookupName:'',
    data: [],
    totalPages: 1,
    params: {},
    createresponse: {
      error : {},
      statusCode: 0,
      errors: []
    } 
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
      case 'GET_DATA':
        return {
          ...state,
          data: action.data,
          totalPages: action.totalPages,
          params: action.params,
          lookupName: action.lookupName
        }
      case 'ADD_LOOKUP':
        return { ...state, createresponse: action.response }
      case 'UPDATE_LOOKUP':
        return { ...state, error: action.response }
      case 'DELETE_LOOKUP':
        return { ...state, response: action.response }
      case 'RESET_RESPONSE':
        return { ...state, createresponse: {error:{}, statusCode: 0, errors:[]}}
      default:
        return { ...state }
    }
  }
  export default Lookups