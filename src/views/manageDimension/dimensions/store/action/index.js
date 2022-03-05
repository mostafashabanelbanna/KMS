import axios from '../../../../../axios'

// ** Get users data 
export const getData = params => {
  return async dispatch => {
    await axios.post('/Dimension/GetDimensionsWithPagination', params).then(response => {
      dispatch({
        type: 'GET_DIMENSIONS_DATA',
        data: response.data.data.items,
        totalPages: response.data.data.totalPages,
        params,
        response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
        errorCode: 200
      })
    }).catch(error => {
      dispatch({
        type: 'GET_DIMENSIONS_DATA',
        data : [],
        errorCode : error.response.status
      })
    })
  }
}

// ** Add new role
export const addDimension = dimension => {   
  console.log(dimension)

   return (dispatch, getState) => {
    axios
      .post('/Dimension/CreateDimension', dimension)
      .then(response => {
        console.log(response)
        dispatch({
          type: 'ADD_DIMENSION',
          dimension,
          response:{statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .then(() => {
        dispatch(getData(getState().dimensions.params))
      })
      .catch(error => {
        dispatch({
          type: 'ADD_DIMENSION',
          response:{statusCode: error.response.status, error: error.response, errors:[]},
          errorCode: error.response.status
        })
      })
  }
}

export const updateDimension = dimension => {  
  console.log(dimension)
  return async (dispatch, getState) => {
    await axios
     .put('/Dimension/UpdateDimension/', dimension)
     .then(response => {
       dispatch({
         type: 'UPDATE_DIMENSION',
         response:{statusCode: response.data.statusCode, errors: response.data.errors, error:{}},
         errorCode: 200
       })
     })
     .then(() => {
       dispatch(getData(getState().dimensions.params))
     })
     .catch(error => {
         dispatch({
             type: 'UPDATE_DIMENSION',
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
      .delete('/Dimension/DeleteDimension/', {data: {
        Id: id
      }})
      .then(response => {
        dispatch({
          type: 'DELETE_DIMENSION',
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
            type: 'DELETE_DIMENSION',
            response:{error: error.response, errors:[], statusCode: error.response.status },
            errorCode: error.response.status 
        })
      })
  }
}

// ** Get Dimension
export const getDimension = id => {
  return async dispatch => {
    await axios
      .get(`/Dimension/GetDimension/${id}`)
      .then(response => {
        console.log("GetDimension", response)
        dispatch({
          type: 'GET_DIMENSION',
          selectedDimension: response.data.data,
          response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .catch(err => {
        dispatch({
          type: 'GET_DIMENSION',
          selectedDimension: {},
          errorCode: err.response.status
        })
      })
      
  }
}
// export const  = params => {
//     return async (dispatch, getState) => {
//         const role = getState().roles.data.find(x => x.id === params)
//         dispatch({type:"GET_ROLE", selectedRole: role})
//     }
// }

export const getDimensionLevel = (id) => {
  return async dispatch => {
    await axios.post('/DimensionsLevel/GetLevelsByDimensionId', id).then(response => {
      console.log(response)
      dispatch({
        type: 'GET_DIMENSION_LEVEL',
        data: response.data.data
      })
    }).catch(error => {
      dispatch({
        type: 'GET_DIMENSION_LEVEL',
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