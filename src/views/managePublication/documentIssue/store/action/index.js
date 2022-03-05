import axios from '../../../../../axios'

// ** Get users data 
export const getData = params => {
  return async dispatch => {
    await axios.post('/DocumentIssue/GetDocumentIssuesWithPagination', params).then(response => {
      console.log(response)
      dispatch({
        type: 'GET_DOCUMENTISSUE_DATA',
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
        type: 'GET_DOCUMENTISSUE_DATA',
        data : [],
        errorCode : ErrorCode
      })
    })
  }
}


export const addDocumentIssue = documentIssue      => {
   const documentIssueFormData = new FormData()

   documentIssueFormData.append('Name_A', documentIssue.nameA)
   documentIssueFormData.append('Name_E', documentIssue.nameE)
   documentIssueFormData.append('Description_A', documentIssue.descriptionA)
   documentIssueFormData.append('Description_E', documentIssue.descriptionE)
   documentIssueFormData.append('Photo_A', documentIssue.photoA[0])
   documentIssueFormData.append('Photo_E', documentIssue.photoE[0])
   documentIssueFormData.append('PeriodicityId', documentIssue.periodicityId)
   documentIssueFormData.append('SourceId', documentIssue.sourceId)
   documentIssueFormData.append('focus', documentIssue.focus)
   documentIssueFormData.append('sortIndex', documentIssue.sortIndex)
   documentIssueFormData.append('focus', documentIssue.focus)
   documentIssueFormData.append('active', documentIssue.active)
   for (let i = 0; i < documentIssue.classificationValues.length; i++) {
    documentIssueFormData.append('ClassificationValues', ocumentIssue.classificationValues[i])
   }

   return (dispatch, getState) => {
    axios
      .post('/DocumentIssue/CreateDocumentIssue', documentIssueFormData, {headers : { "Content-Type": "multipart/form-data" }})
      .then(response => {
        dispatch({
          type: 'ADD_DOCUMENTISSUE',
          documentIssue,
          response:{statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .then(() => {
        dispatch(getData(getState().documentIssues.params))
        // dispatch(getAllData())
      })
      .catch(error => {
        dispatch({
          type: 'ADD_DOCUMENTISSUE',
          response:{statusCode: error.response.status, error: error.response, errors:[]},
          errorCode: error.response.status
        })
      })
  }
}

export const resetCreateResponse = () => {
  return (dispatch) => {
      dispatch({type: "RESET_DOCUMENTISSUE_CREATE_RESPONSE"})
  }
}

export const updateDocumentIssue = documentIssue => {  
  const documentIssueFormData = new FormData()
  documentIssueFormData.append('id', documentIssue.id)
  documentIssueFormData.append('Name_A', documentIssue.nameA)
  documentIssueFormData.append('Name_E', documentIssue.nameE)
  documentIssueFormData.append('Description_A', documentIssue.descriptionA)
  documentIssueFormData.append('Description_E', documentIssue.descriptionE)
  documentIssueFormData.append('Photo_A', documentIssue.photoA[0])
  documentIssueFormData.append('Photo_E', documentIssue.photoE[0])
  documentIssueFormData.append('PeriodicityId', documentIssue.periodicityId)
  documentIssueFormData.append('SourceId', documentIssue.sourceId)
  documentIssueFormData.append('focus', documentIssue.focus)
  documentIssueFormData.append('sortIndex', documentIssue.sortIndex)
  documentIssueFormData.append('focus', documentIssue.focus)
  documentIssueFormData.append('active', documentIssue.active)
  for (let i = 0; i < documentIssue.classificationValues.length; i++) {
   documentIssueFormData.append('ClassificationValues', ocumentIssue.classificationValues[i])
  }
  // documentIssueFormData.append('userRoles', user.userRoles)
  return async (dispatch, getState) => {
    await axios
     .put('/DocumentIssue/UpdateDocumentIssue/', documentIssueFormData, {headers : { "Content-Type": "multipart/form-data" }})
     .then(response => {
       console.log(response)
       dispatch({
         type: 'UPDATE_DOCUMENTISSUE',
         response:{statusCode: response.data.statusCode, errors: response.data.errors, error:{}},
         errorCode: 200
       })
     })
     .then(() => {
       dispatch(getData(getState().documentIssues.params))
     })
     .catch(error => {
         dispatch({
             type: 'UPDATE_DOCUMENTISSUE',
             response:{error: error.response, errors:[], statusCode: error.response.status },
             errorCode: error.response.status
         })
     })
 }
}

export const resetUpdateResponse = () => {
  return (dispatch) => {
      dispatch({type: "RESET_DOCUMENTISSUE_UPDATE_RESPONSE"})
  }
}

export const getDocumentIssue = id => {
  return async dispatch => {
    await axios
      .get('/DocumentIssue/GetDocumentIssue', { id })
      .then(response => {
       
        dispatch({
          type: 'GET_DOCUMENTISSUE',
          selectedDocumentIssue: response.data.user,
          response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .catch(err => {
        dispatch({
          type: 'GET_DOCUMENTISSUE',
          selectedDocumentIssue: {},
          errorCode: err.response.status
        })
      })
  }
}


export const deleteDocumentIssue = id => {
  return (dispatch, getState) => {
    axios
      .delete('/DocumentIssue/DeleteDocumentIssue/', {data: {
        Id: id
      }})
      .then(response => {
        dispatch({
          type: 'DELETE_DOCUMENTISSUE',
          response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .catch(error => {
        dispatch({
          type: 'DELETE_DOCUMENTISSUE',
          errorCode: error.response.status 
        })
      })
  }
}
export const resetDeleteResponse = () => {
    return (dispatch) => {
        dispatch({type: "RESET_DOCUMENTISSUE_DELETE_RESPONSE"})
    }
  }

