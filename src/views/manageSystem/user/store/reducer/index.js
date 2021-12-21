// ** Initial State
const initialState = {
  allData: [],
  data: [],
  totalPages: 1,
  params: {},
  selectedUser: null,
  error : {},
  CreateUserStatus: false
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
      return { ...state, CreateUserStatus: action.CreateUserStatus }
    case 'DELETE_USER':
      return { ...state }
    default:
      return { ...state }
  }
}
export default users
