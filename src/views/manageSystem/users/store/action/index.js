import axios from '../../../../../axios'

// ** Get users data 
export const getData = params => {
  return async dispatch => {
    await axios.post('/User/GetUsers', params).then(response => {
      dispatch({
        type: 'GET_DATA',
        data: response.data.data.items,
        totalPages: response.data.data.totalPages,
        params
      })
    }).catch(error => {
      dispatch({
        type: 'GET_DATA',
        data : [],
        error : error.response
      })
    })
  }
}


export const getUserValue = params => {
  return async (dispatch, getState) => {
      const user = getState().users.data.find(x => x.id === params)
      dispatch({type:"GET_USER", selectedUser: user})
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
   userFormData.append('userRoles', user.userRoles)

   
   return (dispatch, getState) => {
    axios
      .post('/User/CreateUser', userFormData, {headers : { "Content-Type": "multipart/form-data" }})
      .then(response => {
        
        console.log(response)

        dispatch({
          type: 'ADD_USER',
          user,
          response:{statusCode: response.data.statusCode, error: {}, errors: response.data.errors}
        })
      })
      .then(() => {
        dispatch(getData(getState().users.params))
        // dispatch(getAllData())
      })
      .catch(error => {
        console.log(error)
        dispatch({
          type: 'ADD_USER',
          response:{statusCode: error.response.status, error: error.response, errors:[]}
        })
      })
  }
}

export const resetCreateResponse = () => {
  return (dispatch) => {
      dispatch({type: "RESET_CREATE_RESPONSE"})
  }
}


export const updateUser = user => {  
  return async (dispatch, getState) => {
    await axios
     .put('/User/UpdateUser/', user)
     .then(response => {
       console.log(response)
       dispatch({
         type: 'UPDATE_USER',
         response:{statusCode: response.data.statusCode, errors: response.data.errors, error:{}}
       })
     })
     .then(() => {
       dispatch(getData(getState().users.params))
     })
     .catch(error => {
         dispatch({
             type: 'UPDATE_USER',
             response:{error: error.response, errors:[], statusCode: error.response.status }
         })
     })
 }
}

export const resetUpdateResponse = () => {
  return (dispatch) => {
      dispatch({type: "RESET_UPDATE_RESPONSE"})
  }
}

// ** Get all Data 
// export const getAllData = () => {
//   return async dispatch => {
//     await axios.get('/api/users/list/all-data').then(response => {
//       dispatch({
//         type: 'GET_ALL_DATA',
//         data: response.data
//       })
//     })
//   }
// }

// ** Get User
export const getUser = id => {
  return async dispatch => {
    await axios
      .get('/api/users/user', { id })
      .then(response => {
        dispatch({
          type: 'GET_USER',
          selectedUser: response.data.user
        })
      })
      .catch(err => console.log(err))
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
          type: 'DELETE_USER'
        })
      })
      .then(() => {
        dispatch(getData(getState().users.params))
        // dispatch(getAllData())
      })
      .catch(err => console.log(err))
  }
}

