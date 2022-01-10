import axios from '../../../../../axios'

// ** Get users data 
export const getData = params => {
  return async dispatch => {
    await axios.post('/Role/GetRolesWithPagination', params).then(response => {
      dispatch({
        type: 'GET_ROLES_DATA',
        data: response.data.data.items,
        totalPages: response.data.data.totalPages,
        params,
        response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
        errorCode: 200
      })
    }).catch(error => {
      dispatch({
        type: 'GET_ROLES_DATA',
        data : [],
        errorCode : error.response.status
      })
    })
  }
}

// ** Add new role
export const addRole = role => {   
   return (dispatch, getState) => {
    axios
      .post('/Role/CreateRole', role)
      .then(response => {
        dispatch({
          type: 'ADD_ROLE',
          role,
          response:{statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .then(() => {
        dispatch(getData(getState().roles.params))
      })
      .catch(error => {
        dispatch({
          type: 'ADD_ROLE',
          response:{statusCode: error.response.status, error: error.response, errors:[]},
          errorCode: error.response.status
        })
      })
  }
}

export const updateRole = role => {  
  console.log(role)
  return async (dispatch, getState) => {
    await axios
     .put('/Role/UpdateRole/', role)
     .then(response => {
       dispatch({
         type: 'UPDATE_ROLE',
         response:{statusCode: response.data.statusCode, errors: response.data.errors, error:{}},
         errorCode: 200
       })
     })
     .then(() => {
       dispatch(getData(getState().users.params))
     })
     .catch(error => {
         dispatch({
             type: 'UPDATE_ROLE',
             response:{error: error.response, errors:[], statusCode: error.response.status },
             errorCode: error.response.status
         })
     })
 }
}

// ** Delete user
export const deleteRole = id => {
  return (dispatch, getState) => {
    axios
      .delete('/Role/DeleteRole/', {data: {
        Id: id
      }})
      .then(response => {
        dispatch({
          type: 'DELETE_ROLE',
          response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .then(() => {
        dispatch(getData(getState().users.params))
      })
      .catch(error => {
        console.log(error)
        dispatch({
            type: 'DELETE_ROLE',
            response:{error: error.response, errors:[], statusCode: error.response.status },
            errorCode: error.response.status 
        })
      })
  }
}

export const getRole = params => {
    return async (dispatch, getState) => {
        const role = getState().roles.data.find(x => x.id === params)
        dispatch({type:"GET_ROLE", selectedRole: role})
    }
}

// ********** //
// Role Permission
// ********** //

export const getRolePermission = (id, objectName) => {
  return async dispatch => {
    await axios.post('/Role/GetRolePermission', {roleId: id, objectName}).then(response => {
      // console.log(response)
      dispatch({
        type: 'GET_ROLE_PERMISSION',
        data: response.data.data
      })
    }).catch(error => {
      dispatch({
        type: 'GET_ROLE_PERMISSION',
        errorCode: error.response.status 
      })
    })
  }
}

// ** setRolePermission
export const  setRolePermission  = (permissions) => {   
  console.log(permissions)
  return (dispatch, getState) => {
   axios
     .post('/Role/AssignRolePermission', permissions)
     .then(response => {
       console.log(response)
       dispatch({
         type: 'SET_ROLE_PERMISSION',
         response:{statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
         errorCode: 200
       })
     })
     .catch(error => {
       console.log(error)
      dispatch({
        type: 'SET_ROLE_PERMISSION',
        response: {statusCode: error.response.status, error: error.response, errors:[]},
        errorCode: error.response.status
      })
    })
    //  .then(() => {
    //    dispatch(getData(getState().roles.params))
    //  })
    
 }
}