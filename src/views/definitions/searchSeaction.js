import { faSearch, faSliders, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "reactstrap"
import MultiselectionSection from "./multiselectionSeearchSection"
import axios from '../../axios'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { getData } from './store/action/index'

const SearchSection = ({handleSearch}) => {
  // redux states
  const dispatch = useDispatch()
  const store = useSelector(state => state.FrontDefinitions)

  // States
  const [sources, setSources] = useState([])

  const getAllDropDowns = async () => {
    await axios.get(`/Definition/GetDefinitionSourcesFront`)
    .then(response => {
        const result = response.data.data
        setSources(result)
       })
       .catch(error => {})
  }

  const handleSourceChange = (e) => {
    dispatch({type: "SET_FRONT_DEFINITIONS_SOURCE", sources: e })
  }

  const handleNameChange = (e) => {
    dispatch({type: "SET_FRONT_DEFINITIONS_NAME", name: e.target.value })
  }

  const removeSearch = () => {
    dispatch({type: "SET_FRONT_DEFINITIONS_SOURCE", sources: []})
    dispatch({type: "SET_FRONT_DEFINITIONS_NAME", name: ''})
    const submitedData = {
      pageNumber: 1,
      rowsPerPage: 10,
      name: '',
      sourceIds: []
    }
    dispatch(getData(submitedData))
  }
  useEffect(() => {
    getAllDropDowns()
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

        <hr className="w-100 bg-gray mt-0 mb-2" />
        <MultiselectionSection title={"المصادر"} values={store.sources} options={sources} handleValueChange={handleSourceChange}/>
        <hr className="w-100 bg-gray mt-0 mb-2" />
       
        <div className="d-flex py-2 justify-content-center">
          <Button type='submit' className='mr-1' style={{width: "150px"}} color='green' onClick={handleSearch}>
            بحث
          </Button>
        </div>

      </div>
    )
}

export default SearchSection