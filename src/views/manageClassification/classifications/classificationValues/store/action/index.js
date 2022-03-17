import axios from '../../../../../../axios'
import { isLoading, isNotLoading } from '../../../../../../redux/actions/layout'

// ** Get users data 
export const getData = params => {
  return async dispatch => {
    dispatch(isLoading())
    await axios.post('/ClassificationValue/GetClassificationValuesWithPagination', params).then(response => {
      dispatch({
        type: 'GET_CLASSIFICATION_VALUE_DATA',
        data: response.data.data.items,
        totalPages: response.data.data.totalPages,
        params,
        response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
        errorCode: 200
      })
      dispatch(isNotLoading())
    }).catch(error => {
      dispatch({
        type: 'GET_CLASSIFICATION_VALUE_DATA',
        data : [],
        errorCode : error.response.status
      })
      dispatch(isNotLoading())
    })
  }
}

// ** Add new classification value
export const addClassificationValue = classificationValue => {   

   return (dispatch, getState) => {
    axios
      .post('/ClassificationValue/CreateClassificationValue', classificationValue)
      .then(response => {
        dispatch({
          type: 'ADD_CLASSIFICATION_VALUE',
          classificationValue,
          response:{statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .then(() => {
        dispatch(getData(getState().classificationValues.params))
      })
      .catch(error => {
        dispatch({
          type: 'ADD_CLASSIFICATION_VALUE',
          response:{statusCode: error.response.status, error: error.response, errors:[]},
          errorCode: error.response.status
        })
      })
  }
}


// ** Get Classification
export const getClassificationValue = id => {
  return async dispatch => {
    await axios
      .get(`/ClassificationValue/GetClassificationValue/${id}`)
      .then(response => {
        dispatch({
          type: 'GET_CLASSIFICATION_VALUE',
          selectedClassificationValue: response.data.data,
          response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .catch(err => {
        dispatch({
          type: 'GET_CLASSIFICATION_VALUE',
          selectedClassificationValue: {},
          errorCode: err.response.status
        })
      })
      
  }
}

export const updateClassificationValue = classificationValue => {  
  return async (dispatch, getState) => {
    await axios
     .put('/ClassificationValue/UpdateClassificationValue/', classificationValue)
     .then(response => {
       dispatch({
         type: 'UPDATE_CLASSIFICATION_VALUE',
         response:{statusCode: response.data.statusCode, errors: response.data.errors, error:{}},
         errorCode: 200
       })
     })
     .then(() => {
       dispatch(getData(getState().classificationValues.params))
     })
     .catch(error => {
         dispatch({
             type: 'UPDATE_CLASSIFICATION_VALUE',
             response:{error: error.response, errors:[], statusCode: error.response.status },
             errorCode: error.response.status
         })
     })
 }
}

// ** Delete classification
export const deleteClassificationValue = id => {
  return (dispatch, getState) => {
    axios
      .delete('/ClassificationValue/DeleteClassificationValue/', {data: {
        Id: id
      }})
      .then(response => {
        dispatch({
          type: 'DELETE_CLASSIFICATION_VALUE',
          response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .then(() => {
        dispatch(getData(getState().classificationValues.params))
      })
      .catch(error => {
        dispatch({
            type: 'DELETE_CLASSIFICATION_VALUE',
            response:{error: error.response, errors:[], statusCode: error.response.status },
            errorCode: error.response.status 
        })
      })
  }
}
