import { useState, useEffect } from "react"
import {  getDocumentIssueFront } from '../store/action'
import { useDispatch, useSelector } from 'react-redux'
import PublishInformation from "./publishInfoSection"
import SearchSection from "./searchSection"
import TableSection from "./tableSection"
import { useParams } from "react-router-dom"

const DocumentLibraryList = () => {
    const params = useParams()
    const Id = params.id
    const dispatch = useDispatch()
    const store = useSelector(state => state.FrontDocumentIssues)
    useEffect(() => {
        dispatch(getDocumentIssueFront(Id))
      }, [Id])

    const [searchData, setSearchData] = useState({
        title: "",
        fromDate: null,
        toDate: null
    })

    return (
        <div className="d-flex">
            <div className="d-flex flex-column col-xl-10 col-lg-9 col-12 px-1">
                <SearchSection Id={Id} searchData={searchData} setSearchData={setSearchData}/>
                <TableSection Id={Id} searchData={searchData} setSearchData={setSearchData}/>
            </div>      
            <PublishInformation details={store?.details}/>
        </div>
    )
}

export default DocumentLibraryList