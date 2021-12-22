import axios from '../../../../../axios'

// ** Get users data 
export const getData = params => {
  return async dispatch => {
    await axios.post('/Role/GetRolesWithPagination', params).then(response => {
      dispatch({
        type: 'GET_DATA',
        data: response.data.data.items,
        totalPages: response.data.data.totalPages,
        params
      })
    }).catch(error => {
      dispatch({
        type: 'GET_DATA',
        data : []
      })
    })
  }
}

// ** Add new user
export const addRole = role => {   
   return (dispatch, getState) => {
    axios
      .post('/Role/CreateRole', role)
      .then(response => {
        dispatch({
          type: 'ADD_ROLE',
          role,
          response:{statusCode: response.data.statusCode, error: {}, errors: response.data.errors}
        })
      })
      .then(() => {
        dispatch(getData(getState().roles.params))
      })
      .catch(error => {
        dispatch({
          type: 'ADD_ROLE',
          response:{statusCode: error.response.status, error: error.response, errors:[]}
        })
      })
  }
}

export const updateRole = role => {  
  return async (dispatch, getState) => {
    await axios
     .put('/Role/UpdateRole/', role)
     .then(response => {
       dispatch({
         type: 'UPDATE_ROLE',
         response:{statusCode: response.data.statusCode, errors: response.data.errors, error:{}}
       })
     })
     .then(() => {
       dispatch(getData(getState().users.params))
     })
     .catch(error => {
         dispatch({
             type: 'UPDATE_ROLE',
             response:{error: error.response, errors:[], statusCode: error.response.status }
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
          type: 'DELETE_ROLE'
        })
      })
      .then(() => {
        dispatch(getData(getState().users.params))
      })
      .catch(error => {
        dispatch({
            type: 'DELETE_ROLE',
            response:{error: error.response, errors:[], statusCode: error.response.status }
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