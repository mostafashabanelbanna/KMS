import axios from '../../../../axios'

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