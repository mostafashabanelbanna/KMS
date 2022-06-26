import axios from '../../../../axios'
import { isLoading, isNotLoading } from '../../../../redux/actions/layout'

export const getAllClassifications = () => {
  return async dispatch => {
    await axios.post('/Classification/GetClassifications', {focus: true})
      .then(response => {
        dispatch({
          type: 'GET_CLASSIFICATIONS',
          classifications: response.data.data
        })
      })
      .catch(error => {
        dispatch({
          type: 'GET_CLASSIFICATIONS',
          classifications : []
        })
      })
  }
}

export const getData = params => {
  return async dispatch => {
    dispatch(isLoading())
    await axios.post('/DocumentIssue/GetDocumentIssuesFront', params).then(response => {
      dispatch({
        type: 'GET_FRONT_DOCUMENTISSUE_DATA',
        data: response.data.data.items,
        totalPages: response.data.data.totalPages,
        totalCount: response.data.data.totalCount
      })
      console.log(response.data.data.items)
      dispatch(isNotLoading())

    }).catch(error => {
      dispatch({
        type: 'GET_FRONT_DOCUMENTISSUE_DATA',
        data : []
      })
      dispatch(isNotLoading())
    })
  }
}

export const getDocumentLibrariesFront = params => {
  return async dispatch => {
    dispatch(isLoading())
    await axios.post('/DocumentLibrary/GetDocumentLibrariesFront', params).then(response => {
      dispatch({
        type: 'GET_FRONT_DOCUMENTLIBRARIES_DETAILS',
        data: response.data.data.items,
        totalPages: response.data.data.totalPages,
        totalCount: response.data.data.totalCount
      })
      console.log(response.data.data.items)
      dispatch(isNotLoading())

    }).catch(error => {
      dispatch({
        type: 'GET_FRONT_DOCUMENTLIBRARIES_DETAILS',
        data : []
      })
      dispatch(isNotLoading())
    })
  }
}

export const getDocumentIssueFront = (id) => {
  return async dispatch => {
    dispatch(isLoading())
    await axios.get(`/DocumentIssue/GetDocumentIssueFront/${id}`).then(response => {
      dispatch({
        type: 'GET_FRONT_DOCUMENTISSUE_DETAILS',
        data: response.data.data
      })
      console.log(response)
      dispatch(isNotLoading())

    }).catch(error => {
      dispatch({
        type: 'GET_FRONT_DOCUMENTISSUE_DETAILS',
        data : []
      })
      dispatch(isNotLoading())
    })
  }
}