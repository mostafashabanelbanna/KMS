import axios from '../../../../../axios'
import DocumentLibrary from '../reducer'
import { isLoading, isNotLoading } from '../../../../../redux/actions/layout'

export const getData = params => {
  return async dispatch => {
    dispatch(isLoading())

    await axios.post('/DocumentLibrary/GetDocumentLibrariesWithPagination', params).then(response => {
      dispatch({
        type: 'GET_DOCUMENTLIBRARY_DATA',
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
        type: 'GET_DOCUMENTLIBRARY_DATA',
        data : [],
        errorCode : ErrorCode
      })
      dispatch(isNotLoading())

    })
  }
}

export const addDocumentLibrary = documentLibrary => {
   const documentLibraryFormData = new FormData()
   documentLibraryFormData.append('title_A', documentLibrary.titleA)
   documentLibraryFormData.append('title_E', documentLibrary.titleE)
   documentLibraryFormData.append('content_A', documentLibrary.contentA)
   documentLibraryFormData.append('content_E', documentLibrary.contentE)
   documentLibraryFormData.append('photo_A', documentLibrary.photoA[0])
   documentLibraryFormData.append('photo_E', documentLibrary.photoE[0])
   documentLibraryFormData.append('coverPhoto_A', documentLibrary.coverPhotoA[0])
   documentLibraryFormData.append('coverPhoto_E', documentLibrary.coverPhotoE[0])
   documentLibraryFormData.append('attachment_A', documentLibrary.attachmentA[0])
   documentLibraryFormData.append('attachment_E', documentLibrary.attachmentE[0])
   documentLibraryFormData.append('documentIssueId', documentLibrary.documentIssueId)
   documentLibraryFormData.append('publishDate', documentLibrary.publishDate)
   documentLibraryFormData.append('focus', documentLibrary.focus)
   documentLibraryFormData.append('sortIndex', parseInt(documentLibrary.sortIndex))
   documentLibraryFormData.append('active', documentLibrary.active)

   return (dispatch, getState) => {
    axios
      .post('/DocumentLibrary/CreateDocumentLibrary', documentLibraryFormData, {headers : { "Content-Type": "multipart/form-data" }})
      .then(response => {
        dispatch({
          type: 'ADD_DOCUMENTLIBRARY',
          documentLibrary,
          response:{statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .then(() => {
        dispatch(getData(getState().documentLibraries.params))
      })
      .catch(error => {
        console.log(error)
        dispatch({
          type: 'ADD_DOCUMENTLIBRARY',
          response:{statusCode: error.response.status, error: error.response, errors:[]},
          errorCode: error.response.status
        })
      })
  }
}

export const resetCreateResponse = () => {
  return (dispatch) => {
      dispatch({type: "RESET_DOCUMENTLIBRARY_CREATE_RESPONSE"})
  }
}

export const updateDocumentLibrary = documentLibrary => {  
    const documentLibraryFormData = new FormData()
    console.log(documentLibrary)
    documentLibraryFormData.append('title_A', documentLibrary.titleA)
    documentLibraryFormData.append('title_E', documentLibrary.titleE)
    documentLibraryFormData.append('content_A', documentLibrary.contentA)
    documentLibraryFormData.append('content_E', documentLibrary.contentE)
    documentLibraryFormData.append('photo_A', documentLibrary.photoA[0])
    documentLibraryFormData.append('photo_E', documentLibrary.photoE[0])
    documentLibraryFormData.append('coverPhoto_A', documentLibrary.coverPhotoA[0])
    documentLibraryFormData.append('coverPhoto_E', documentLibrary.coverPhotoE[0])
    documentLibraryFormData.append('attachment_A', documentLibrary.attachmentA[0])
    documentLibraryFormData.append('attachment_E', documentLibrary.attachmentE[0])
    documentLibraryFormData.append('documentIssueId', documentLibrary.documentIssueId)
    documentLibraryFormData.append('publishDate', documentLibrary.publishDate)
    documentLibraryFormData.append('focus', documentLibrary.focus)
    documentLibraryFormData.append('sortIndex', parseInt(documentLibrary.sortIndex))
    documentLibraryFormData.append('active', documentLibrary.active)
    documentLibraryFormData.append('id', documentLibrary.id)

  return async (dispatch, getState) => {
    await axios
     .put('/DocumentLibrary/UpdateDocumentLibrary/', documentLibraryFormData, {headers : { "Content-Type": "multipart/form-data" }})
     .then(response => {
       console.log(response)
       dispatch({
         type: 'UPDATE_DOCUMENTLIBRARY',
         response:{statusCode: response.data.statusCode, errors: response.data.errors, error:{}},
         errorCode: 200
       })
     })
     .then(() => {
       dispatch(getData(getState().documentLibraries.params))
     })
     .catch(error => {
         dispatch({
             type: 'UPDATE_DOCUMENTLIBRARY',
             response:{error: error.response, errors:[], statusCode: error.response.status },
             errorCode: error.response.status
         })
     })
 }
}

export const resetUpdateResponse = () => {
  return (dispatch) => {
      dispatch({type: "RESET_DOCUMENTLIBRARY_UPDATE_RESPONSE"})
  }
}

export const getDocumentLibrary = id => {
  console.log(id)
  return async dispatch => {
    await axios
      .get(`/DocumentLibrary/GetDocumentLibrary/${id}`)
      .then(response => {
        console.log(response)
        dispatch({
          type: 'GET_DOCUMENTLIBRARY',
          selectedDocumentLibrary: response.data.data,
          response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .catch(err => {
        dispatch({
          type: 'GET_DOCUMENTLIBRARY',
          selectedDocumentLibrary: {},
          errorCode: err.response.status
        })
      })
  }
}


export const deleteDocumentLibrary = id => {
  return (dispatch, getState) => {
    axios
      .delete('/DocumentLibrary/DeleteDocumentLibrary/', {data: {
        Id: id
      }})
      .then(response => {
        dispatch({
          type: 'DELETE_DOCUMENTLIBRARY',
          response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .catch(error => {
        dispatch({
          type: 'DELETE_DOCUMENTLIBRARY',
          errorCode: error.response.status 
        })
      })
  }
}

export const resetDeleteResponse = () => {
    return (dispatch) => {
        dispatch({type: "RESET_DOCUMENTLIBRARY_DELETE_RESPONSE"})
    }
}

