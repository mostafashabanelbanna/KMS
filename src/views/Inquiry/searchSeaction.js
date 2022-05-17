import { faSearch, faSliders, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "reactstrap"
import MultiselectionSection from "./multiselectionSeearchSection"
import axios from '../../axios'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import DateSearchSection from "./dateSearchSection"
import { getInquiriesFront } from "../manageInquiry/Inquiry/store/action"
// import { getData } from '../store/action/index'

const SearchSection = ({showSearchSection, setShowSearchSection, handleSearch}) => {
  // redux states
  const dispatch = useDispatch()
  const store = useSelector(state => state.inquiries)
  const layoutStore = useSelector(state => state.layout)

  // States
  const [departments, setDepartments] = useState([])
  const [status, setStatus] = useState([])
  const [providers, setProviders] = useState([])

  const getDepartments = async () => {
    await axios.post(`/Lookups/GetLookupValues`, {lookupName: 'Department'})
    .then(response => {
        setDepartments(response.data.data)
       })
       .catch(error => {
    })
  }
  const getStatus = async () => {
    await axios.post(`/Lookups/GetLookupValues`, {lookupName: 'InquiryStatus'})
    .then(response => {
        setStatus(response.data.data)
       })
       .catch(error => {
    })
  }
  const getProviders = async () => {
    await axios.get(`/Provider/GetProviders`)
    .then(response => {
        setProviders(response.data.data)
       })
       .catch(error => {})
  }
  
  const handleDepartmentChange = (e) => {
    dispatch({type: "SET_FRONT_INQUIRY_PARAMS", frontParams: {...store.frontParams, departments: e} })
  }
  const handleStatusChange = (e) => {
    dispatch({type: "SET_FRONT_INQUIRY_PARAMS", frontParams: {...store.frontParams, status: e} })
  }
  const handleProviderChange = (e) => {
    dispatch({type: "SET_FRONT_INQUIRY_PARAMS", frontParams: {...store.frontParams, providers: e} })
  }
  const handleNameChange = (e) => {
    dispatch({type: "SET_FRONT_INQUIRY_PARAMS", frontParams: {...store.frontParams, name: e.target.value} })
  }
  const removeSearch = () => {
    params = {
      name: '',
      dateFrom: new Date(),
      dateTo: new Date(),
      departments: [],
      providers: [],
      status: []
    }
    dispatch({type: "SET_FRONT_INQUIRY_PARAMS", frontParams: params })
    dispatch(getInquiriesFront(params))
  }
  useEffect(() => {
    getProviders()
    getStatus()
    getDepartments()
  }, [])
    return (
      <div
        className="card d-flex flex-column mb-2"
        style={{
          borderRadius: 6,
          height: "max-content",
          boxShadow: "2px 1px 6px gray"
        }}
      >
        <div className="d-flex p-2">
          <div className="d-flex w-100 px-0">
            <FontAwesomeIcon icon={faSliders} color={"#496193"} fontSize={17} />
            <p className="mb-0 px-1" style={{ color: "#115973", fontSize: 16 }}>
              بحث متقدم
            </p>
          </div>
          {/* <div className="d-flex col-6 justify-content-end px-0">
            <p
              className="mb-0 text_green"
              style={{ cursor: "pointer", fontSize: 13 }}
              onClick={() => {}}
            >
              تحميل إعدادات سابقة
            </p>
          </div> */}
        </div>

        <div className="d-flex p-1" style={{ backgroundColor: "#f5f6fa" }}>
          <div className="d-flex align-self-center justify-content-end">
            <FontAwesomeIcon
              icon={faTimes}
              color="red"
              style={{ cursor: "pointer" }}
              onClick={removeSearch}
            />
          </div>
          <p className="mb-0 px-1">إزالة البحث</p>
        </div>

        <form action="#" className="p-1">
          <div class="input-group">
            <div class="input-group-btn">
              <div class="btn btn-default" style={{cursor: "unset"}}>
                <FontAwesomeIcon icon={faSearch} />
              </div>
            </div>
            <input
              type="text"
              class="form-control"
              placeholder="بحث بالاسم"
              value={store.name}
              name="search"
              onChange={(e) => handleNameChange(e)}
            />
          </div>
        </form>

        <DateSearchSection/>
        <hr className="w-100 bg-gray mt-0 mb-2" />
        <MultiselectionSection title={"الإدارة"} values={store.frontParams.departments} options={departments} handleValueChange={handleDepartmentChange}/>
        <hr className="w-100 bg-gray mt-0 mb-2" />
        <MultiselectionSection title={"الحالة"} values={store.frontParams.status} options={status} handleValueChange={handleStatusChange}/>
        <hr className="w-100 bg-gray mt-0 mb-2" />
        <MultiselectionSection title={"مزود البيانات"} values={store.frontParams.providers} options={providers} handleValueChange={handleProviderChange}/>
        <hr className="w-100 bg-gray mt-0 mb-2" />

        {/*  */}
        <div className="d-flex py-2 justify-content-center">
        <Button type='submit' className='mr-1' style={{width: "150px"}} color='green' onClick={handleSearch}>
          بحث
                {/* {intl.formatMessage({id: "Save"}) } */}
              </Button>
              {/* <Button type='submit' color='secondary' outline >
                حفظ إعدادات البحث
                
              </Button> */}
        </div>

      </div>
    )
}

export default SearchSection