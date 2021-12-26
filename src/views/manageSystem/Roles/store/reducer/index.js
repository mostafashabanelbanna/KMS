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
    selectedRole:{}
  }
  
  const Roles = (state = initialState, action) => {
    switch (action.type) {
      // case 'GET_ALL_DATA':
      //   return { ...state, allData: action.data }
      case 'GET_ROLES_DATA':
        return {
          ...state,
          data: action.data,
          totalPages: action.totalPages,
          params: action.params,
          errorCode : action.errorCode
        }
      case 'GET_ROLE':
        return { ...state, selectedRole: action.selectedRole, errorCode: action.errorCode }
      case 'ADD_ROLE':
        return { ...state, createResponse: action.response, errorCode: action.errorCode  }
      case 'UPDATE_ROLE':
        return { ...state, updateResponse: action.response, errorCode: action.errorCode }
      case 'RESET_ROLE_GET_RESPONSE':
        return { ...state, getResponse: {error:{}, statusCode: 0, errors:[]}}
      case 'RESET_ROLE_CREATE_RESPONSE':
          return { ...state, createResponse: {error:{}, statusCode: 0, errors:[]}}
      case 'RESET_ROLE_UPDATE_RESPONSE':
        return { ...state, updateResponse: {error:{}, statusCode: 0, errors:[]}}
      case 'RESET_ROLE_DELETE_RESPONSE':
        return { ...state, deleteResponse: {error:{}, statusCode: 0, errors:[]}}   
      case 'DELETE_ROLE':
        return { ...state, deleteResponse: action.response, errorCode: action.errorCode }
      default:
        return { ...state }
    }
  }
  export default Roles
  