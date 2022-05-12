import { useState, useEffect } from "react"
import {  getDocumentIssueFront } from '../store/action'
import { useDispatch, useSelector } from 'react-redux'
import PublishInformation from "./publishInfoSection"
import SearchSection from "./searchSection"
import TableSection from "./tableSection"
import { useParams } from "react-router-dom"
import Breadcrumbs from '@components/breadcrumbs'
import { useIntl } from 'react-intl'

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

  const intl = useIntl()

    return (
        <>
            <Breadcrumbs
            breadCrumbTitle={intl.formatMessage({ id: "Document Library" })}
            breadCrumbRoot={intl.formatMessage({ id: "Homepage" })}
            breadCrumbParent={intl.formatMessage({ id: "Document Library" })}
            breadCrumbActive={intl.formatMessage({ id: "تفاصيل الإصدارة" })}
            />
            <div>
                <p className="fa-2x mb-3 mt-1">{store?.details?.name}</p>
            </div>
            <div className="d-flex">
                <div className="d-flex flex-column col-xl-10 col-lg-9 col-12 px-1">
                    <SearchSection Id={Id} searchData={searchData} setSearchData={setSearchData} />
                    <TableSection Id={Id} searchData={searchData} setSearchData={setSearchData} />
                </div>
                <PublishInformation details={store?.details} />
            </div>
        </>
    )
}

export default DocumentLibraryList