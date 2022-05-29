import { faSearch, faSliders, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "reactstrap"
import DateSearchSection from "./dateSearchSection"
import MultiselectionSection from "./multiselectionSeearchSection"
import axios from '../../../axios'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { getData } from '../store/action/index'

const SearchSection = ({handleSearch, searchId}) => {
  // redux states
  const dispatch = useDispatch()
  const store = useSelector(state => state.frontIndicators)
  const layoutStore = useSelector(state => state.layout)

  // States
  const [sources, setSources] = useState([])
  const [periodicities, setPeriodicities] = useState([])
  const [sectors, setSectors] = useState([])
  const [categories, setCategories] = useState([])

  const getAllDropDowns = async () => {
    await axios.get(`/Indicator/GetSearchDropdownListsForIndicator`)
    .then(response => {
        const result = response.data.data
        setSources(result.sources)
        setPeriodicities(result.periodicities)
        setSectors(result.sectors)
        setCategories(result.categories)
       })
       .catch(error => {
    })
  }

  const removeSearch = () => {
    dispatch({type: "SET_FRONT_INDICATOR_PERIODICITY", periodicities: []})
    dispatch({type: "SET_FRONT_INDICATOR_SOURCE", sources: []})
    dispatch({type: "SET_FRONT_INDICATOR_SECTOR", sectors: []})
    dispatch({type: "SET_FRONT_INDICATOR_CATEGORY", categories: []})
    dispatch({type: "SET_FRONT_INDICATOR_NAME", name: ''})
    const submitedData = {
      pageNumber: 1,
      rowsPerPage: 10,
      name: '',
      periodicities: [],
      sources: [],
      classificationValues: [],
      startDate: store.dateFrom,
      endDate: store.dateTo
    }
    dispatch(getData(submitedData))
  }

  useEffect(() => {
    if (searchId && sectors && window.location.href.includes('sectors')) dispatch({type: "SET_FRONT_INDICATOR_SECTOR", sectors: [sectors.find(x => x.id === parseInt(searchId))] })
  }, [searchId, sectors])

  useEffect(() => {
    if (searchId && categories && window.location.href.includes('categories')) dispatch({type: "SET_FRONT_INDICATOR_CATEGORY", categories: [categories.find(x => x.id === parseInt(searchId))] })
  }, [searchId, categories])

  useEffect(() => {
    if (searchId && periodicities && window.location.href.includes('periodicities')) dispatch({type: "SET_FRONT_INDICATOR_PERIODICITY", periodicities: [periodicities.find(x => x.id === parseInt(searchId))] })
  }, [searchId, periodicities])

  console.log("store", store)

  const handlePeriodicityChange = (e) => {
    dispatch({type: "SET_FRONT_INDICATOR_PERIODICITY", periodicities: e })
  }
  const handleSourceChange = (e) => {
    dispatch({type: "SET_FRONT_INDICATOR_SOURCE", sources: e })
  }
  const handleCategoryChange = (e) => {
    dispatch({type: "SET_FRONT_INDICATOR_CATEGORY", categories: e })
  }
  const handleSectorChange = (e) => {
    dispatch({type: "SET_FRONT_INDICATOR_SECTOR", sectors: e })
  }
  const handleNameChange = (e) => {
    dispatch({type: "SET_FRONT_INDICATOR_NAME", name: e.target.value })
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
            <p className="mb-0 px-1" style={{ color: "#115973", fontSize: 14 }}>
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
              placeholder="بحث بإسم العنصر"
              value={store.name}
              name="search"
              onChange={(e) => handleNameChange(e)}
            />
          </div>
        </form>

        {/* <DateSearchSection/> */}
        <hr className="w-100 bg-gray mt-0 mb-2" />
        {searchId && <MultiselectionSection title={"الدوريات"} values={[...store.periodicities]} options={periodicities} handleValueChange={handlePeriodicityChange}/>}
        {!searchId && <MultiselectionSection title={"الدوريات"} values={store.periodicities} options={periodicities} handleValueChange={handlePeriodicityChange}/>}
        <hr className="w-100 bg-gray mt-0 mb-2" />
        <MultiselectionSection title={"المصادر"} values={store.sources} options={sources} handleValueChange={handleSourceChange}/>
        <hr className="w-100 bg-gray mt-0 mb-2" />
        {searchId && <MultiselectionSection title={"التصنيفات"} values={[...store.categories]} options={categories} handleValueChange={handleCategoryChange}/>}
        {!searchId && <MultiselectionSection title={"التصنيفات"} values={store.categories} options={categories} handleValueChange={handleCategoryChange}/>}
        <hr className="w-100 bg-gray mt-0 mb-2" />
        {searchId && <MultiselectionSection title={"القطاعات"} values={[...store.sectors]} options={sectors} handleValueChange={handleSectorChange}/>}
        {!searchId && <MultiselectionSection title={"القطاعات"} values={store.sectors} options={sectors} handleValueChange={handleSectorChange}/>}
        
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