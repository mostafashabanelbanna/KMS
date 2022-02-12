import axios from '../../../../../axios'

// ** Get users data 
export const getData = params => {
  return async dispatch => {
    await axios.post('/Classification/GetClassificationsWithPagination', params).then(response => {
      dispatch({
        type: 'GET_CLASSIFICATION_DATA',
        data: response.data.data.items,
        totalPages: response.data.data.totalPages,
        params,
        response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
        errorCode: 200
      })
    }).catch(error => {
      dispatch({
        type: 'GET_CLASSIFICATION_DATA',
        data : [],
        errorCode : error.response.status
      })
    })
  }
}

// ** Add new role
export const addClassification = classification => {   

   return (dispatch, getState) => {
    axios
      .post('/Classification/CreateClassification', classification)
      .then(response => {
        dispatch({
          type: 'ADD_CLASSIFICATION',
          classification,
          response:{statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .then(() => {
        dispatch(getData(getState().classifications.params))
      })
      .catch(error => {
        dispatch({
          type: 'ADD_CLASSIFICATION',
          response:{statusCode: error.response.status, error: error.response, errors:[]},
          errorCode: error.response.status
        })
      })
  }
}


// ** Get Classification
export const getClassification = id => {
  return async dispatch => {
    await axios
      .get(`/Classification/GetClassification/${id}`)
      .then(response => {
        console.log(response)
        dispatch({
          type: 'GET_CLASSIFICATION',
          selectedClassification: response.data.data,
          response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .catch(err => {
        dispatch({
          type: 'GET_CLASSIFICATION',
          selectedClassification: {},
          errorCode: err.response.status
        })
      })
      
  }
}

export const updateClassification = classification => {  
  console.log(classification)
  return async (dispatch, getState) => {
    await axios
     .put('/Classification/UpdateClassification/', classification)
     .then(response => {
       dispatch({
         type: 'UPDATE_CLASSIFICATION',
         response:{statusCode: response.data.statusCode, errors: response.data.errors, error:{}},
         errorCode: 200
       })
     })
     .then(() => {
       dispatch(getData(getState().classifications.params))
     })
     .catch(error => {
         dispatch({
             type: 'UPDATE_CLASSIFICATION',
             response:{error: error.response, errors:[], statusCode: error.response.status },
             errorCode: error.response.status
         })
     })
 }
}

// ** Delete classification
export const deleteClassification = id => {
  return (dispatch, getState) => {
    axios
      .delete('/Classification/DeleteClassification/', {data: {
        Id: id
      }})
      .then(response => {
        dispatch({
          type: 'DELETE_CLASSIFICATION',
          response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .then(() => {
        dispatch(getData(getState().classifications.params))
      })
      .catch(error => {
        dispatch({
            type: 'DELETE_CLASSIFICATION',
            response:{error: error.response, errors:[], statusCode: error.response.status },
            errorCode: error.response.status 
        })
      })
  }
}
