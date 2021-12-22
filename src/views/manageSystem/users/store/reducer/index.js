// ** Initial State
const initialState = {
  allData: [],
  data: [],
  totalPages: 1,
  params: {},
  error : {},
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
  selectedUser:{}
}

const users = (state = initialState, action) => {
  switch (action.type) {
    // case 'GET_ALL_DATA':
    //   return { ...state, allData: action.data }
    case 'GET_DATA':
      return {
        ...state,
        data: action.data,
        totalPages: action.totalPages,
        params: action.params,
        error : action.error
      }
    case 'GET_USER':
      return { ...state, selectedUser: action.selectedUser }
    case 'ADD_USER':
      return { ...state, createResponse: action.response  }
    case 'GET_USER':
      return { ...state, selectedUser: action.selectedUser }
    case 'UPDATE_USER':
      return { ...state, updateResponse: action.response }
    case 'RESET_CREATE_RESPONSE':
        return { ...state, createResponse: {error:{}, statusCode: 0, errors:[]}}
    case 'RESET_UPDATE_RESPONSE':
          return { ...state, updateResponse: {error:{}, statusCode: 0, errors:[]}}
    case 'DELETE_USER':
      return { ...state }
    default:
      return { ...state }
  }
}
export default users
