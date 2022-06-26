import axios from '../../../../../axios'
import { isLoading, isNotLoading } from '../../../../../redux/actions/layout'

// ** Get  data 
export const getData = params => {
  return async dispatch => {
    dispatch(isLoading())
    await axios.post('/Provider/GetProvidersWithPagination', params).then(response => {
      dispatch({
        type: 'GET_DATA',
        data: response.data.data.items,
        totalPages: response.data.data.totalPages,
        params,
        response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
        errorCode: 200
      })
      dispatch(isNotLoading())

    }).catch(error => {
      dispatch({
        type: 'GET_DATA',
        data : [],
        errorCode : error.response.status
      })
    isNotLoading()
    })
  }
}


// ** Add
export const add = provider => {
   return (dispatch, getState) => {
    axios
      .post('/Provider/CreateProvider', provider)
      .then(response => {
        dispatch({
          type: 'ADD_PROVIDER',
          provider,
          response:{statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .catch(error => {
        console.log('inside err', error)
        dispatch({
          type: 'ADD_PROVIDER',
          response:{statusCode: error.response.status, error: error.response, errors:[]},
          errorCode: error.response.status
        })
      })
      .then(() => {
        dispatch(getData(getState().providers.params))
      })
  }
}

export const resetCreateResponse = () => {
  return (dispatch) => {
      dispatch({type: "RESET_PROVIDER_CREATE_RESPONSE"})
  }
}

export const getItem = id => {
  return async dispatch => {
    await axios
      .get(`/Provider/GetProvider/${id}`)
      .then(response => {
        dispatch({
          type: 'GET_PROVIDER',
          selectedProvider: response.data.data,
          response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .catch(err => {
        dispatch({
          type: 'GET_PROVIDER',
          selectedProvider: {},
          errorCode: err.response.status
        })
      })
      
  }
}


export const updateItem = provider => {  
  
  return async (dispatch, getState) => {
    await axios
     .put('/Provider/UpdateProvider/', provider)
     .then(response => {
       dispatch({
         type: 'UPDATE_PROVIDER',
         response:{statusCode: response.data.statusCode, errors: response.data.errors, error:{}},
         errorCode: 200
       })
     })
     .then(() => {
       dispatch(getData(getState().providers.params))
     })
     .catch(error => {
         dispatch({
             type: 'UPDATE_PROVIDER',
             response:{error: error.response, errors:[], statusCode: error.response.status },
             errorCode: error.response.status
         })
     })
 }
}

export const resetUpdateResponse = () => {
  return (dispatch) => {
      dispatch({type: "RESET_PROVIDER_UPDATE_RESPONSE"})
  }
}

// ** Delete 
export const deleteItem = id => {
  return (dispatch, getState) => {
    axios
      .delete('/Provider/DeleteProvider/', {data: {
        id
      }})
      .then(response => {
        dispatch({
          type: 'DELETE_PROVIDER',
          response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .then(() => {
        dispatch(getData(getState().providers.params))
      })
      .catch(error => {
        dispatch({
          type: 'DELETE_PROVIDER',
          errorCode: error.response.status 
        })
      })
  }
}

