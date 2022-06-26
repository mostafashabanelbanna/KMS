import { useState, useEffect } from 'react'
import axios from '../../axios'
import IndicatorList from '../indicator/IindicatorList'
import { useIntl } from 'react-intl'
import Breadcrumbs from '@components/breadcrumbs'


const favoriteIndicators = ({ props }) => {
    const [pageNumber, setPageNumber] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [searchData, setSerachData] = useState({pageNumber: 1, rowsPerPage: 10})
    const [indicators, setIndicators] = useState([])

    const handlePagination = page => {
        setPageNumber(page.selected + 1)
    }
    
    const getIndicators = async () => {
        await axios.post(`/Indicator/GetFavoriteIndicators`, searchData)
        .then(response => {
            setIndicators(response.data.data)
           })
           .catch(error => {
            setIndicators([])
        })
    }
    useEffect(() => {
        getIndicators()
    }, [])
    useEffect(() => {
        setSerachData({...searchData, pageNumber})
        getIndicators()
    }, [pageNumber])
  const intl = useIntl()

  return (
      <>
        <Breadcrumbs breadCrumbTitle={intl.formatMessage({id: "Favorites"})} breadCrumbParent={intl.formatMessage({id: "Researchers Services"})} breadCrumbActive={intl.formatMessage({id: "Favorites"})} breadCrumbRoot={intl.formatMessage({id: "Homepage"})} />
        <IndicatorList indicators={indicators.items} count={indicators.totalPages} pageNumber={pageNumber} handlePagination={handlePagination}/>
      </>
  )
}
export default favoriteIndicators