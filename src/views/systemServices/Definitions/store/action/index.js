import axios from '../../../../../axios'
import Definition from '../reducer'
import { isLoading, isNotLoading } from '../../../../../redux/actions/layout'

export const getData = params => {
  return async dispatch => {
    dispatch(isLoading())

    await axios.post('/Definition/GetDefinitionsWithPagination', params).then(response => {
      dispatch({
        type: 'GET_DEFINITION_DATA',
        data: response.data.data.items,
        totalPages: response.data.data.totalPages,
        params,
        response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
        errorCode: 200
      })
      dispatch(isNotLoading())

    }).catch(error => {
      const ErrorCode = 500
      if (error.response) {
        ErrorCode = error.response.status
      }
      dispatch({
        type: 'GET_DEFINITION_DATA',
        data : [],
        errorCode : ErrorCode
      })
      dispatch(isNotLoading())

    })
  }
}

export const addDefinition = definition => {
   const definitionFormData = new FormData()
   definitionFormData.append('name_A', definition.nameA)
   definitionFormData.append('name_E', definition.nameE)
   definitionFormData.append('description_A', definition.descriptionA)
   definitionFormData.append('description_E', definition.descriptionE)
   definitionFormData.append('attachment', definition.attachment[0])
   definitionFormData.append('url', definition.url)
   definitionFormData.append('sourceId', definition.sourceId)
   definitionFormData.append('focus', definition.focus)
   definitionFormData.append('sortIndex', parseInt(definition.sortIndex))
   definitionFormData.append('active', definition.active)

   return (dispatch, getState) => {
    axios
      .post('/Definition/CreateDefinition', definitionFormData, {headers : { "Content-Type": "multipart/form-data" }})
      .then(response => {
        dispatch({
          type: 'ADD_DEFINITION',
          definition,
          response:{statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .then(() => {
        dispatch(getData(getState().definitions.params))
      })
      .catch(error => {
        console.log(error)
        dispatch({
          type: 'ADD_DEFINITION',
          response:{statusCode: error.response.status, error: error.response, errors:[]},
          errorCode: error.response.status
        })
      })
  }
}

export const resetCreateResponse = () => {
  return (dispatch) => {
      dispatch({type: "RESET_DEFINITION_CREATE_RESPONSE"})
  }
}

export const updateDefinition = definition => {  
    const definitionFormData = new FormData()
    console.log(definition)
    definitionFormData.append('name_A', definition.nameA)
    definitionFormData.append('name_E', definition.nameE)
    definitionFormData.append('description_A', definition.descriptionA)
    definitionFormData.append('description_E', definition.descriptionE)
    definitionFormData.append('attachment', definition.attachment[0])
    definitionFormData.append('url', definition.url)
    definitionFormData.append('sourceId', definition.sourceId)
    definitionFormData.append('focus', definition.focus)
    definitionFormData.append('sortIndex', parseInt(definition.sortIndex))
    definitionFormData.append('active', definition.active)
    definitionFormData.append('id', definition.id)

  return async (dispatch, getState) => {
    await axios
     .put('/Definition/UpdateDefinition/', definitionFormData, {headers : { "Content-Type": "multipart/form-data" }})
     .then(response => {
       console.log(response)
       dispatch({
         type: 'UPDATE_DEFINITION',
         response:{statusCode: response.data.statusCode, errors: response.data.errors, error:{}},
         errorCode: 200
       })
     })
     .then(() => {
       dispatch(getData(getState().definitions.params))
     })
     .catch(error => {
         dispatch({
             type: 'UPDATE_DEFINITION',
             response:{error: error.response, errors:[], statusCode: error.response.status },
             errorCode: error.response.status
         })
     })
 }
}

export const resetUpdateResponse = () => {
  return (dispatch) => {
      dispatch({type: "RESET_DEFINITION_UPDATE_RESPONSE"})
  }
}

export const getDefinition = id => {
  console.log(id)
  return async dispatch => {
    await axios
      .get(`/Definition/GetDefinition/${id}`)
      .then(response => {
        console.log(response)
        dispatch({
          type: 'GET_DEFINITION',
          selectedDefinition: response.data.data,
          response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .catch(err => {
        dispatch({
          type: 'GET_DEFINITION',
          selectedDefinition: {},
          errorCode: err.response.status
        })
      })
  }
}


export const deleteDefinition = id => {
  return (dispatch, getState) => {
    axios
      .delete('/Definition/DeleteDefinition/', {data: {
        Id: id
      }})
      .then(response => {
        dispatch({
          type: 'DELETE_DEFINITION',
          response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .catch(error => {
        dispatch({
          type: 'DELETE_DEFINITION',
          errorCode: error.response.status 
        })
      })
  }
}

export const resetDeleteResponse = () => {
    return (dispatch) => {
        dispatch({type: "RESET_DEFINITION_DELETE_RESPONSE"})
    }
}

