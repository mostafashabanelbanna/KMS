import axios from '../../../../../axios'
import { isLoading, isNotLoading } from '../../../../../redux/actions/layout'
import { store } from '../../../../../redux/storeConfig/store'

const IntializeDefaultDimensions = (dispatch) => {
  const dimensionsValues =  [
    [
      {
        id:1,
        name_A:"مصر",
        dimensionId:1,
        parentId:null,
        levelNumber:1
      }
    ]
  ]
  const seriesExcelDimValues = [
    {
        dimensionId:1, 
        levelNumber:1, 
        dimensionValues: [
            { 
                id:1,
                name_A:"مصر",
                dimensionId:1,
                parentId:null,
                levelNumber:1,
                OrderLevel: 1
            }
        ]
    }
  ]
  const d = new Date()
  d.setDate(d.getDate() - 1460) // get four years ago
  dispatch({type: "SET_INDICATOR_DETAILS_SERIES_DATE_FROM", dateFrom: d })

  dispatch({type: "SET_INDICATOR_DETAILS_SERIES_DIMENSIONS", dimensions: [{id:"1::1", name:"البلد"}]})
  dispatch({type: "SET_INDICATOR_DETAILS_SERIES_DIMENSION_VALUES", dimensionValues: dimensionsValues})
  dispatch({type: "SET_INDICATOR_DETAILS_SERIES_EXCEL_DIMENSION", seriesExcelDimensions: seriesExcelDimValues})
}

export const getIndicatorDetails = (id) => {
  return async dispatch => {
    await axios.get(`/Indicator/GetIndicator/${id}`)
    .then(response => {
        dispatch({
          type: 'GET_INDICATOR_DETAILS',
          indicatorDetails: response.data.data
        })
        if (response.data.data.indicatorAvilableCopies.length > 0) {
          const firstElement = response.data.data.indicatorAvilableCopies[0]
          dispatch({type: "SET_INDICATOR_DETAILS_PERIODICITY", periodicity: firstElement.periodicityId })
          dispatch({type: "SET_INDICATOR_DETAILS_SOURCE", source: firstElement.sourceId })
          IntializeDefaultDimensions(dispatch)
        }
        
      })
      .catch(error => {
        dispatch({
          type: 'GET_INDICATOR_DETAILS',
          indicatorDetails: {}
        })
      })
  }
}

export const getSeriesData = (pageNumber, rowsPerPage) => {
  return async (dispatch, getState) => {
    dispatch(isLoading())
    const store = getState().indicatorDetails
    const dimValues = []
    store.seriesDimensionValues.forEach(element => {
      element.forEach(ele => {
        dimValues.push(ele.id)
      })
    })
    const payLoad = {
      indicatorId: store.indicatorDetails.id,
      sourceId: store.selectedSource,
      periodicityId: store.selectedPeriodicity,
      dimensionsValues: dimValues,
      pageNumber,
      rowsPerPage,
      fromDate: store.seriesDateFrom,
      toDate: store.seriesDateTo
    }
    await axios.post(`/Dataset/GetAllDatasetValuesWithPagination/`, payLoad)
    .then(response => {
        dispatch(isNotLoading())
        dispatch({
          type: 'GET_INDICATOR_DETAILS_SERIES_DATA',
          data: response.data.data.items,
          totalPages: response.data.data.totalPages,
          totalCount: response.data.data.totalCount
        })
      })
      .catch(error => {
        dispatch(isNotLoading())
        dispatch({
          type: 'GET_INDICATOR_DETAILS_SERIES_DATA',
          data: [],
          totalPages: 0,
          totalCount: 0
        })
      })

  }
 
}

export const ExportSeriesData = () => {
  return async (dispatch, getState) => {
    const store = getState().indicatorDetails
    // const dimValues = []
    // store.seriesDimensionValues.forEach(element => {
    //   element.forEach(ele => {
    //     dimValues.push(ele.id)
    //   })
    // })
   
    const payLoad = {
      IndicatorId: store.indicatorDetails.id,
      SourceId: store.selectedSource,
      PeriodicityId: store.selectedPeriodicity,
      Vertical: store.seriesExcelDimensions,
      FromDate: store.seriesDateFrom,
      ToDate: store.seriesDateTo
    }
    console.log(payLoad)
    await axios.post(`/Dataset/ExportIndicatorSeriesDataSheet`, payLoad, { responseType: 'arraybuffer' }).then(response => {
      const fileDownload = require('js-file-download')
      fileDownload(response.data, `${store.indicatorDetails.name_A}.xlsx`)
    }).catch(error => {       
    })
  }
}

export const exportFile = () => {
  return async (dispatch, getState) => {
      const Store = getState().indicatorDetails
      const postObject = {
          indicatorId: Store.indicatorDetails.id,
          sourceId: Store.selectedSource,
          periodicityId: Store.selectedPeriodicity,
          unitId: Store.selectedUnit.id,
          classificationValueId: null,
          insertionDate: Store.excelDate,
          vertical: Store.excelDimensions,
          horizontal: []
      }
      await axios.post(`/Dataset/ExportIndicatorDataSheet`, postObject, { responseType: 'arraybuffer' }).then(response => {
        const fileDownload = require('js-file-download')
        fileDownload(response.data, 'DataSheet.xlsx')
        dispatch({
          type: 'SET_INDICATOR_DETAILS_EXCEL_EXPORT_RESPONSE',
          errorCode: 200
        })
      }).catch(error => {
        if (error && error.response) {
          dispatch({
            type: 'SET_INDICATOR_DETAILS_EXCEL_EXPORT_RESPONSE',
            errorCode: error.response.status
          })
        } else {
          dispatch({
            type: 'SET_INDICATOR_DETAILS_EXCEL_EXPORT_RESPONSE',
            errorCode: 500
          })
        }        
      })
  }
}

