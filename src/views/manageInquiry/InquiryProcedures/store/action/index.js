import axios from '../../../../../axios'

export const getData = params => {
  return async dispatch => {
    await axios.post('/InquiryProcedure/GetInquiryProceduresWithPagination', params).then(response => {
      dispatch({
        type: 'GET_INQUIRYPROCEDURE_DATA',
        data: response.data.data.items,
        totalPages: response.data.data.totalPages,
        params,
        response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
        errorCode: 200
      })
    }).catch(error => {
      const ErrorCode = 500
      if (error.response) {
        ErrorCode = error.response.status
      }
      dispatch({
        type: 'GET_INQUIRYPROCEDURE_DATA',
        data : [],
        errorCode : ErrorCode
      })
    })
  }
}

export const addInquiryProcedure = inquiryProcedure  => {
    console.log(inquiryProcedure)
   const inquiryProcedureFormData = new FormData()
   inquiryProcedureFormData.append('name', inquiryProcedure.name)
   inquiryProcedureFormData.append('description', inquiryProcedure.description)
   inquiryProcedureFormData.append('attachment', inquiryProcedure.attachment[0])
   inquiryProcedureFormData.append('inquiryId', inquiryProcedure.inquiryId)
   inquiryProcedureFormData.append('departmentId', inquiryProcedure.departmentId)
   inquiryProcedureFormData.append('providerId', inquiryProcedure.providerId)
   inquiryProcedureFormData.append('active', inquiryProcedure.active)

   return (dispatch, getState) => {
    axios
      .post('/InquiryProcedure/CreateInquiryProcedure', inquiryProcedureFormData, {headers : { "Content-Type": "multipart/form-data" }})
      .then(response => {
        console.log(response)
        dispatch({
          type: 'ADD_INQUIRYPROCEDURE',
          inquiryProcedure,
          response:{statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .then(() => {
        dispatch(getData(getState().inquiryProcedures.params))
      })
      .catch(error => {
        console.log(error)
        dispatch({
          type: 'ADD_INQUIRYPROCEDURE',
          response:{statusCode: error.response.status, error: error.response, errors:[]},
          errorCode: error.response.status
        })
      })
  }
}

export const resetCreateResponse = () => {
  return (dispatch) => {
      dispatch({type: "RESET_INQUIRYPROCEDURE_CREATE_RESPONSE"})
  }
}

export const updateInquiryProcedure = inquiryProcedure => {  
    const inquiryProcedureFormData = new FormData()
    inquiryProcedureFormData.append('name', inquiryProcedure.name)
    inquiryProcedureFormData.append('description', inquiryProcedure.description)
    inquiryProcedureFormData.append('attachment', inquiryProcedure.attachment[0])
    inquiryProcedureFormData.append('inquiryId', inquiryProcedure.inquiryId)
    inquiryProcedureFormData.append('departmentId', inquiryProcedure.departmentId)
    inquiryProcedureFormData.append('providerId', inquiryProcedure.providerId)
    inquiryProcedureFormData.append('active', inquiryProcedure.active)
    inquiryProcedureFormData.append('id', inquiryProcedure.id)

  return async (dispatch, getState) => {
    await axios
     .put('/InquiryProcedure/UpdateInquiryProcedure/', inquiryProcedureFormData, {headers : { "Content-Type": "multipart/form-data" }})
     .then(response => {
       dispatch({
         type: 'UPDATE_INQUIRYPROCEDURE',
         response:{statusCode: response.data.statusCode, errors: response.data.errors, error:{}},
         errorCode: 200
       })
     })
     .then(() => {
       dispatch(getData(getState().inquiryProcedures.params))
     })
     .catch(error => {
         dispatch({
             type: 'UPDATE_INQUIRYPROCEDURE',
             response:{error: error.response, errors:[], statusCode: error.response.status },
             errorCode: error.response.status
         })
     })
 }
}

export const resetUpdateResponse = () => {
  return (dispatch) => {
      dispatch({type: "RESET_INQUIRYPROCEDURE_UPDATE_RESPONSE"})
  }
}

export const getInquiryProcedure = id => {
  console.log(id)
  return async dispatch => {
    await axios
      .get(`/InquiryProcedure/GetInquiryProcedure/${id}`)
      .then(response => {
        dispatch({
          type: 'GET_INQUIRYPROCEDURE',
          selectedInquiryProcedure: response.data.data,
          response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .catch(err => {
        dispatch({
          type: 'GET_INQUIRYPROCEDURE',
          selectedInquiryProcedure: {},
          errorCode: err.response.status
        })
      })
  }
}


export const deleteInquiryProcedure = id => {
  return (dispatch, getState) => {
    axios
      .delete('/InquiryProcedure/DeleteInquiryProcedure/', {data: {
        Id: id
      }})
      .then(response => {
        dispatch({
          type: 'DELETE_INQUIRYPROCEDURE',
          response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .catch(error => {
        dispatch({
          type: 'DELETE_INQUIRYPROCEDURE',
          errorCode: error.response.status 
        })
      })
  }
}

export const resetDeleteResponse = () => {
    return (dispatch) => {
        dispatch({type: "RESET_INQUIRYPROCEDURE_DELETE_RESPONSE"})
    }
}

