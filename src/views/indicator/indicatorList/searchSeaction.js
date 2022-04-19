import { faSearch, faSliders, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "reactstrap"
import DateSearchSection from "./dateSearchSection"
import MultiselectionSection from "./multiselectionSeearchSection"
const SearchSection = ({showSearchSection, setShowSearchSection}) => {
    return (
      <div
        className="bg-white d-flex flex-column mb-2"
        style={{
          borderRadius: 6,
          height: "max-content",
          boxShadow: "2px 1px 6px gray"
        }}
      >
        <div className="d-flex p-2">
          <div className="d-flex col-6 px-0">
            <FontAwesomeIcon icon={faSliders} color={"#496193"} fontSize={17} />
            <p className="mb-0 px-1" style={{ color: "#115973", fontSize: 16 }}>
              بحث متقدم
            </p>
          </div>
          <div className="d-flex col-6 justify-content-end px-0">
            <p
              className="mb-0 text_green"
              style={{ cursor: "pointer", fontSize: 13 }}
              onClick={() => {}}
            >
              تحميل إعدادات سابقة
            </p>
          </div>
        </div>

        <div className="d-flex p-1" style={{ backgroundColor: "#f5f6fa" }}>
          <div className="d-flex align-self-center justify-content-end">
            <FontAwesomeIcon
              icon={faTimes}
              color="red"
              style={{ cursor: "pointer" }}
              onClick={() => {}}
            />
          </div>
          <p className="mb-0 px-1">إزالة البحث</p>
        </div>

        <form action="#" className="p-1">
          <div class="input-group">
            <div class="input-group-btn">
              <button class="btn btn-default" type="submit">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
            <input
              type="text"
              class="form-control"
              placeholder="بحث بإسم العنصر"
              name="search"
            />
          </div>
        </form>

        <DateSearchSection/>
        <hr className="w-100 bg-gray mt-0 mb-2" />
        <MultiselectionSection title={"الدوريات"}/>
        <hr className="w-100 bg-gray mt-0 mb-2" />
        <MultiselectionSection title={"المصادر"}/>
        <hr className="w-100 bg-gray mt-0 mb-2" />
        <MultiselectionSection title={"التصنيفات"}/>
        <hr className="w-100 bg-gray mt-0 mb-2" />
        <MultiselectionSection title={"القطاعات"}/>
        <hr className="w-100 bg-gray mt-0 mb-2" />

        {/*  */}
        <div className="d-flex py-2 justify-content-center">
        <Button type='submit' className='mr-1' color='green' onClick={() => {
          setShowSearchSection(!showSearchSection)
        }}>
          بحث
                {/* {intl.formatMessage({id: "Save"}) } */}
              </Button>
              <Button type='submit' color='secondary' outline >
                حفظ إعدادات البحث
                {/* {intl.formatMessage({id: "Cancel"}) } */}
              </Button>
        </div>

      </div>
    )
}

export default SearchSection