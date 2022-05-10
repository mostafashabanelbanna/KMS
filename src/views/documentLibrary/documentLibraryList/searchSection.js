import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import { useState } from "react"
import { Label } from "reactstrap"
import MomentUtils from "@date-io/moment"
import { useIntl } from 'react-intl'
import moment from "moment"
import "moment/locale/ar"
import { useDispatch, useSelector } from 'react-redux'

const SearchSection = ({searchData, setSearchData}) => {
    const intl = useIntl()
    const dispatch = useDispatch()
    const store = useSelector(state => state.frontIndicators)

    const [dateFrom, setDateFrom] = useState(null)
    const [dateTo, setDateTo] = useState(null)
    const [title, setTitle] = useState("")

    const handleStartDate = (event) => {
        const date = moment(new Date(event._d).toLocaleDateString(), "MM-DD-YYYY")
            .format("YYYY-MM-DD")
            .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))
        // dispatch({ type: "SET_FRONT_INDICATOR_DATE_FROM", dateFrom: date })
        setDateFrom(date)
        // setSearchData({...searchData, fromDate: date})
    }

    const handleEndDate = (event) => {
        const date = moment(new Date(event._d).toLocaleDateString(), "MM-DD-YYYY")
            .format("YYYY-MM-DD")
            .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))
        setDateTo(date)
        // setSearchData({...searchData, toDate: date})
        // dispatch({ type: "SET_FRONT_INDICATOR_DATE_TO", dateTo: date })
    }

    const handleNameChange = (event) => {
        setTitle(event.target.value)
        // setSearchData({...searchData, title: event.target.value})
    }
    return (
        <div className="d-flex align-items-center">
            <form action="#" className="p-1 col-5">
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
                        value={title}
                        name="search"
                        onChange={(e) => handleNameChange(e)}
                    />
                </div>
            </form>

            <div className="d-flex col-6 align-items-center w-100">
                <div className='mx-0 d-flex align-items-center col-6'>
                    <Label for='hf-picker' className="mx-2">{intl.formatMessage({ id: "من" })}</Label>
                    <br />
                    <MuiPickersUtilsProvider
                        libInstance={moment}
                        utils={MomentUtils}
                        locale={"sw"}
                        className="bg-danger w-100"
                    >
                        <KeyboardDatePicker
                            className="w-100"
                            okLabel="تحديد"
                            cancelLabel="الغاء"
                            format="L"
                            value={dateFrom}
                            inputVariant="outlined"
                            variant="dialog"
                            maxDateMessage=""
                            mask="__-__-____"
                            placeholder="يوم/شهر/سنة"
                            onChange={e => handleStartDate(e)}
                            views={["year", "month", "date"]}
                        />
                    </MuiPickersUtilsProvider>
                </div>
                <div className='mx-0 d-flex align-items-center col-6'>
                    <Label for='hf-picker' className="mx-2">{intl.formatMessage({ id: "إلى" })}</Label>
                    <br />
                    <MuiPickersUtilsProvider
                        libInstance={moment}
                        utils={MomentUtils}
                        locale={"sw"}
                        className="bg-danger"
                    >
                        <KeyboardDatePicker
                            className="w-100"
                            okLabel="تحديد"
                            cancelLabel="الغاء"
                            format="L"
                            value={dateTo}
                            inputVariant="outlined"
                            variant="dialog"
                            maxDateMessage=""
                            mask="__-__-____"
                            placeholder="يوم/شهر/سنة"
                            onChange={e => handleEndDate(e)}
                            views={["year", "month", "date"]}
                        />
                    </MuiPickersUtilsProvider>
                </div>
            </div>

            <button class="btn btn-default btn-green d-flex justify-content-center" type="submit" style={{width: 40, height: 40}} onClick={() => {
                setSearchData({title, toDate: dateTo, fromDate: dateFrom})
            }}>
                <FontAwesomeIcon icon={faSearch} size={"lg"} />
            </button>
            
        </div>
    )
}

export default SearchSection