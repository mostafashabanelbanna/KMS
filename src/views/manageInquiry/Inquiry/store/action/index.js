import axios from '../../../../../axios'
import { isLoading, isNotLoading } from '../../../../../redux/actions/layout'

export const getParams = params => {
  const departments = []
  const providers = []
  const status = []
  params.departments.forEach(element => {
    departments.push(element.id)
  })

  params.providers.forEach(element => {
    providers.push(element.id)
  })

  params.status.forEach(element => {
    status.push(element.id)
  })
  const data = {
    ...params,
    departments,
    providers,
    status
  }
  console.log(data)
  return data
}

// ** Get users data 
export const getData = params => {
  return async dispatch => {
    dispatch(isLoading())
    await axios.post('/Inquiry/GetInquiriesWithPagination', params).then(response => {
      dispatch({
        type: 'GET_INQUIRY_DATA',
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
        type: 'GET_INQUIRY_DATA',
        data : [],
        errorCode : ErrorCode
      })
      dispatch(isNotLoading())

    })
  }
}


export const getInquiriesFront = params => {
  return async dispatch => {
    dispatch(isLoading())
    await axios.post('/Inquiry/GetInquiriesWithPaginationFront', params).then(response => {
      dispatch({
        type: 'GET_INQUIRY_FRONT_DATA',
        data: response.data.data.items,
        totalPages: response.data.data.totalPages,
        totalCount: response.data.data.totalCount
      })
      dispatch(isNotLoading())

    }).catch(error => {
      const ErrorCode = 500
      if (error.response) {
        ErrorCode = error.response.status
      }
      dispatch({
        type: 'GET_INQUIRY_FRONT_DATA',
        data : [],
        errorCode : ErrorCode
      })
      dispatch(isNotLoading())

    })
  }
}


export const addInquiry = inquiry => {
   const inquiryFormData = new FormData()
   inquiryFormData.append('name', inquiry.name)
   inquiryFormData.append('description', inquiry.description)
   inquiryFormData.append('milestoneName', inquiry.milestoneName)
   inquiryFormData.append('purpose', inquiry.purpose)
   inquiryFormData.append('usageId', inquiry.usageId)
   inquiryFormData.append('attachment', inquiry.attachment[0])
   inquiryFormData.append('expectedPeriod', inquiry.expectedPeriod ? parseInt(inquiry.expectedPeriod) : 0)
   inquiryFormData.append('referenceNo', inquiry.referenceNo)
   inquiryFormData.append('startDate', inquiry.startDate)
   inquiryFormData.append('plannedEndDate', inquiry.plannedEndDate)
   inquiryFormData.append('actualEndDate', inquiry.actualEndDate)
   inquiryFormData.append('providerId', inquiry.providerId)
   inquiryFormData.append('departmentId', inquiry.departmentId)
   inquiryFormData.append('userId', inquiry.userId)
   inquiryFormData.append('statusId', inquiry.statusId)
   inquiryFormData.append('focus', inquiry.focus)
   inquiryFormData.append('sortIndex', parseInt(inquiry.sortIndex))
   inquiryFormData.append('active', inquiry.active)
   for (let i = 0; i < inquiry.classificationValues.length; i++) {
    inquiryFormData.append('ClassificationValues', inquiry.classificationValues[i])
   }
   return (dispatch, getState) => {
    axios
      .post('/Inquiry/CreateInquiry', inquiryFormData, {headers : { "Content-Type": "multipart/form-data" }})
      .then(response => {
        dispatch({
          type: 'ADD_INQUIRY',
          inquiry,
          response:{statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .then(() => {
        dispatch(getData(getState().inquiries.params))
        // dispatch(getAllData())
      })
      .catch(error => {
        dispatch({
          type: 'ADD_INQUIRY',
          response:{statusCode: error.response.status, error: error.response, errors:[]},
          errorCode: error.response.status
        })
      })
  }
}

export const resetCreateResponse = () => {
  return (dispatch) => {
      dispatch({type: "RESET_INQUIRY_CREATE_RESPONSE"})
  }
}

export const updateInquiry = inquiry => {  
  const inquiryFormData = new FormData()
  inquiryFormData.append('id', inquiry.id)
  inquiryFormData.append('name', inquiry.name)
  inquiryFormData.append('description', inquiry.description)
  inquiryFormData.append('attachment', inquiry.attachment[0])
  inquiryFormData.append('expectedPeriod', inquiry.expectedPeriod)
  inquiryFormData.append('referenceNo', inquiry.referenceNo)
  inquiryFormData.append('startDate', inquiry.startDate)
  inquiryFormData.append('plannedEndDate', inquiry.plannedEndDate)
  inquiryFormData.append('actualEndDate', inquiry.actualEndDate)
  inquiryFormData.append('providerId', inquiry.providerId)
  inquiryFormData.append('departmentId', inquiry.departmentId)
  inquiryFormData.append('userId', inquiry.userId)
  inquiryFormData.append('statusId', inquiry.statusId)
  inquiryFormData.append('focus', inquiry.focus)
  inquiryFormData.append('sortIndex', parseInt(inquiry.sortIndex))
  inquiryFormData.append('active', inquiry.active)
  for (let i = 0; i < inquiry.classificationValues.length; i++) {
   inquiryFormData.append('ClassificationValues', inquiry.classificationValues[i])
  }
  return async (dispatch, getState) => {
    await axios
     .put('/Inquiry/UpdateInquiry/', inquiryFormData, {headers : { "Content-Type": "multipart/form-data" }})
     .then(response => {
       dispatch({
         type: 'UPDATE_INQUIRY',
         response:{statusCode: response.data.statusCode, errors: response.data.errors, error:{}},
         errorCode: 200
       })
     })
     .then(() => {
       dispatch(getData(getState().inquiries.params))
     })
     .catch(error => {
         dispatch({
             type: 'UPDATE_INQUIRY',
             response:{error: error.response, errors:[], statusCode: error.response.status },
             errorCode: error.response.status
         })
     })
 }
}

export const resetUpdateResponse = () => {
  return (dispatch) => {
      dispatch({type: "RESET_INQUIRY_UPDATE_RESPONSE"})
  }
}

export const getInquiry = id => {
  return async dispatch => {
    await axios
      .get(`/Inquiry/GetInquiry/${id}`)
      .then(response => {
        dispatch({
          type: 'GET_INQUIRY',
          selectedInquiry: response.data.data,
          response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .catch(err => {
        dispatch({
          type: 'GET_INQUIRY',
          selectedInquiry: {},
          errorCode: err.response.status
        })
      })
  }
}


export const deleteInquiry = id => {
  return (dispatch, getState) => {
    axios
      .delete('/Inquiry/DeleteInquiry/', {data: {
        Id: id
      }})
      .then(response => {
        dispatch({
          type: 'DELETE_INQUIRY',
          response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .catch(error => {
        dispatch({
          type: 'DELETE_INQUIRY',
          errorCode: error.response.status 
        })
      })
  }
}

export const resetDeleteResponse = () => {
    return (dispatch) => {
        dispatch({type: "RESET_INQUIRY_DELETE_RESPONSE"})
    }
}

