import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

const MultiselectionSection = ({title}) => {
    const [openSection, setOpenSection] = useState(false)
    const [plusIcon, setPlusIcon] = useState(faPlus)

    return <div className="d-flex flex-column px-2 pb-2">
        <div className="d-flex">
            <p className="col-6 mb-0">{title}</p>
            <div className="col-5">
                hhh
            </div>
            <FontAwesomeIcon icon={plusIcon} color={"#47cdbf"} style={{cursor:"pointer"}} className={"col d-flex flex-column align-self-center"} onClick={() => {
                setOpenSection(!openSection)
                setPlusIcon(plusIcon === faPlus ? faMinus : faPlus)
            }}/>
        </div>
        {openSection && <div className="d-flex flex-column mt-1">
        <div className='mx-0 d-flex align-items-center'>
            
        </div>
        <div className='mx-0 d-flex align-items-center mt-1'>
            
        </div>
        </div>}
    </div>
}

export default MultiselectionSection