import axios from '../../../../../axios'
import { isLoading, isNotLoading } from '../../../../../redux/actions/layout'

// ** Get  data 
export const getData = params => {
  return async dispatch => {
    dispatch(isLoading())
    await axios.post('/WebResource/GetWebResourcesWithPagination', params).then(response => {
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
export const add = webResource => {
  const webResourceFormData = new FormData()
  
  webResourceFormData.append('name_A', webResource.name_A)
  webResourceFormData.append('name_E', webResource.name_E)
  webResourceFormData.append('description_A', webResource.description_A)
  webResourceFormData.append('description_E', webResource.description_E)
  webResourceFormData.append('url', webResource.url)
  webResourceFormData.append('logo', webResource.logo[0])
  webResourceFormData.append('login', webResource.login)
  webResourceFormData.append('password', webResource.password)
  webResourceFormData.append('webResourceCategoryId', webResource.webResourceCategoryId)
  webResourceFormData.append('sortIndex', webResource.sortIndex)
  webResourceFormData.append('focus', webResource.focus)
  webResourceFormData.append('active', webResource.active)
   for (let i = 0; i < webResource.indicators.length; i++) {
     console.log(webResource.indicators)
      webResourceFormData.append('indicators', webResource.indicators[i])
     }
    
   return (dispatch, getState) => {
    axios
      .post('/WebResource/CreateWebResource',  webResourceFormData, {headers : { "Content-Type": "multipart/form-data" }})
      .then(response => {
        dispatch({
          type: 'ADD_WEB_SOURCE',
          webResource,
          response:{statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .catch(error => {
        dispatch({
          type: 'ADD_WEB_SOURCE',
          response:{statusCode: error.response.status, error: error.response, errors:[]},
          errorCode: error.response.status
        })
      })
      .then(() => {
        dispatch(getData(getState().webResources.params))
      })
  }
}

export const resetCreateResponse = () => {
  return (dispatch) => {
      dispatch({type: "RESET_WEB_SOURCE_CREATE_RESPONSE"})
  }
}

export const getItem = id => {
  return async dispatch => {
    await axios
      .get(`/WebResource/GetWebResource/${id}`)
      .then(response => {
        console.log('here')
        dispatch({
          type: 'GET_WEB_SOURCE',
          selectedWebResource: response.data.data,
          response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .catch(err => {
        dispatch({
          type: 'GET_WEB_SOURCE',
          selectedWebResource: {},
          errorCode: err.response.status
        })
      })
      
  }
}


export const updateItem = webResource => {  
  const webResourceFormData = new FormData()
  
  webResourceFormData.append('name_A', webResource.name_A)
  webResourceFormData.append('name_E', webResource.name_E)
  webResourceFormData.append('description_A', webResource.description_A)
  webResourceFormData.append('description_E', webResource.description_E)
  webResourceFormData.append('url', webResource.url)
  webResourceFormData.append('logo', webResource.logo[0])
  webResourceFormData.append('login', webResource.login)
  webResourceFormData.append('password', webResource.password)
  webResourceFormData.append('webResourceCategoryId', webResource.webResourceCategoryId)
  webResourceFormData.append('sortIndex', webResource.sortIndex)
  webResourceFormData.append('focus', webResource.focus)
  webResourceFormData.append('active', webResource.active)
  webResourceFormData.append('id', webResource.id)

   for (let i = 0; i < webResource.indicators.length; i++) {
     console.log(webResource.indicators)
      webResourceFormData.append('indicators', webResource.indicators[i])
     }
  return async (dispatch, getState) => {
    await axios
     .put('/WebResource/UpdateWebResource/', webResourceFormData, {headers : { "Content-Type": "multipart/form-data" }})
     .then(response => {
       dispatch({
         type: 'UPDATE_WEB_SOURCE',
         response:{statusCode: response.data.statusCode, errors: response.data.errors, error:{}},
         errorCode: 200
       })
     })
     .then(() => {
       dispatch(getData(getState().webResources.params))
     })
     .catch(error => {
         dispatch({
             type: 'UPDATE_WEB_SOURCE',
             response:{error: error.response, errors:[], statusCode: error.response.status },
             errorCode: error.response.status
         })
     })
 }
}

export const resetUpdateResponse = () => {
  return (dispatch) => {
      dispatch({type: "RESET_WEB_SOURCE_UPDATE_RESPONSE"})
  }
}

// ** Delete 
export const deleteItem = id => {
  return (dispatch, getState) => {
    axios
      .delete('/WebResource/DeleteWebResource/', {data: {
        id
      }})
      .then(response => {
        dispatch({
          type: 'DELETE_WEB_SOURCE',
          response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .then(() => {
        dispatch(getData(getState().webResources.params))
      })
      .catch(error => {
        dispatch({
          type: 'DELETE_WEB_SOURCE',
          errorCode: error.response.status 
        })
      })
  }
}

