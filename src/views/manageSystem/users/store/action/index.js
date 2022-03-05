import axios from '../../../../../axios'
import { isLoading, isNotLoading } from '../../../../../redux/actions/layout'

// ** Get users data 
export const getData = params => {

  return async dispatch => {
    // dispatch({type: 'SET_LOADING'})
    dispatch(isLoading())
    await axios.post('/User/GetUsers', params).then(response => {
      dispatch({
        type: 'GET_DATA',
        data: response.data.data.items,
        totalPages: response.data.data.totalPages,
        params,
        response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
        errorCode: 200
      })
      // dispatch({type: 'RESET_LOADING'})
      dispatch(isNotLoading())

    }).catch(error => {
      dispatch({
        type: 'GET_DATA',
        data : [],
        errorCode : error.response.status
      })
    isNotLoading()

      dispatch({type: 'RESET_LOADING'})
    })
  }
}


// ** Add new user
export const addUser = user => {
   const userFormData = new FormData()

   userFormData.append('name', user.name)
   userFormData.append('nameE', user.nameE)
   userFormData.append('jobTitle', user.jobTitle)
   userFormData.append('photo', user.photo[0])
   userFormData.append('password', user.password)
   userFormData.append('userName', user.userName)
   userFormData.append('email', user.email)
   userFormData.append('phoneNumber', user.phoneNumber)
   userFormData.append('admin', user.admin)
   userFormData.append('sortIndex', user.sortIndex)
   userFormData.append('locked', user.locked)
   userFormData.append('focus', user.focus)
   userFormData.append('active', user.active)
   for (let i = 0; i < user.userRoles.length; i++) {
    userFormData.append('userRoles', user.userRoles[i])
   }

   return (dispatch, getState) => {
    axios
      .post('/User/CreateUser', userFormData, {headers : { "Content-Type": "multipart/form-data" }})
      .then(response => {
        dispatch({
          type: 'ADD_USER',
          user,
          response:{statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .then(() => {
        dispatch(getData(getState().users.params))
        // dispatch(getAllData())
      })
      .catch(error => {
        dispatch({
          type: 'ADD_USER',
          response:{statusCode: error.response.status, error: error.response, errors:[]},
          errorCode: error.response.status
        })
      })
  }
}

export const resetCreateResponse = () => {
  return (dispatch) => {
      dispatch({type: "RESET_USER_CREATE_RESPONSE"})
  }
}

export const getUserValue = params => {
  return async (dispatch, getState) => {
      const user = getState().users.data.find(x => x.id === params)
      console.log(user)
      dispatch({type:"GET_USER", selectedUser: user})
  }
}

export const updateUser = user => {  
  const upadateUserFormData = new FormData()
  upadateUserFormData.append('id', user.id)
  upadateUserFormData.append('name', user.name)
  upadateUserFormData.append('nameE', user.nameE)
  upadateUserFormData.append('jobTitle', user.jobTitle)
  upadateUserFormData.append('photo', user.photo[0])
  upadateUserFormData.append('password', user.password)
  upadateUserFormData.append('userName', user.userName)
  upadateUserFormData.append('email', user.email)
  upadateUserFormData.append('phoneNumber', user.phoneNumber)
  upadateUserFormData.append('admin', user.admin)
  upadateUserFormData.append('sortIndex', user.sortIndex)
  upadateUserFormData.append('locked', user.locked)
  upadateUserFormData.append('focus', user.focus)
  upadateUserFormData.append('active', user.active)
  for (let i = 0; i < user.userRoles.length; i++) {
    upadateUserFormData.append('userRoles', user.userRoles[i])
   }
  // upadateUserFormData.append('userRoles', user.userRoles)
  return async (dispatch, getState) => {
    await axios
     .put('/User/UpdateUser/', upadateUserFormData, {headers : { "Content-Type": "multipart/form-data" }})
     .then(response => {
       console.log(response)
       dispatch({
         type: 'UPDATE_USER',
         response:{statusCode: response.data.statusCode, errors: response.data.errors, error:{}},
         errorCode: 200
       })
     })
     .then(() => {
       dispatch(getData(getState().users.params))
     })
     .catch(error => {
         dispatch({
             type: 'UPDATE_USER',
             response:{error: error.response, errors:[], statusCode: error.response.status },
             errorCode: error.response.status
         })
     })
 }
}

export const resetUpdateResponse = () => {
  return (dispatch) => {
      dispatch({type: "RESET_USER_UPDATE_RESPONSE"})
  }
}

export const getUser = id => {
  return async dispatch => {
    await axios
      .get('/api/users/user', { id })
      .then(response => {
       
        dispatch({
          type: 'GET_USER',
          selectedUser: response.data.user,
          response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .catch(err => {
        dispatch({
          type: 'GET_USER',
          selectedUser: {},
          errorCode: err.response.status
        })
      })
  }
}


// ** Delete user
export const deleteUser = id => {
  return (dispatch, getState) => {
    axios
      .delete('/User/DeleteUser/', {data: {
        Id: id
      }})
      .then(response => {
        dispatch({
          type: 'DELETE_USER',
          response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .then(() => {
        //dispatch(getData(getState().users.params))
      })
      .catch(error => {
        dispatch({
          type: 'DELETE_USER',
          errorCode: error.response.status 
        })
      })
  }
}

