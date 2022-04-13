import axios from "../../../../axios"
import { isLoading, isNotLoading } from '../../../../redux/actions/layout'

export const getData = (params) => {
    return async dispatch => {
        dispatch(isLoading())
        await axios.post('DocumentIssue/GetDocumentIssuesFront', {
            name: "",
            pageNumber: 1,
            pageSize: 10
          })
        .then(response => {
                dispatch({
                    type: 'GET_DATA',
                    data: response.data.data.items,
                    totalPages: response.data.data.totalPages,
                    params
                })
              dispatch(isNotLoading())
        }).catch(error => {
                console.log('error')
                dispatch({
                    type: 'GET_DATA',
                    data : []
                    // errorCode : error.response.status
                })
                dispatch(isNotLoading())
            })
    }
}
