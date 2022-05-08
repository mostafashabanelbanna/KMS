import { useState } from "react"
import PublishInformation from "./publishInfoSection"
import SearchSection from "./searchSection"
import TableSection from "./tableSection"

const DocumentLibraryList = () => {
    const [showSection, setShowSection] = useState(false)
    return (
        <div className="d-flex">
            <div className="d-flex flex-column col-xl-10 col-lg-9 col-12 px-1">
                <SearchSection/>
                <TableSection/>
            </div>      
            <PublishInformation showSection={showSection} setShowSection={setShowSection}/>
        </div>
    )
}

export default DocumentLibraryList