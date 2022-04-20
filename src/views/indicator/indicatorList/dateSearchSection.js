import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import { useState } from "react"
import { Label } from "reactstrap"
import MomentUtils from "@date-io/moment"
import { useIntl } from 'react-intl'
import moment from "moment"
import "moment/locale/ar"

const DateSearchSection = () => {
    const intl = useIntl()
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    // const [openDate, setOpenDate] = useState(false)
    // const [plusIcon, setPlusIcon] = useState(faPlus)

    const handleStartDate = (event) => {
        setStartDate(moment(new Date(event._d).toLocaleDateString(), "MM-DD-YYYY")
        .format("YYYY-MM-DD")
        .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d)))
      }

      const handleEndDate = (event) => {
        setEndDate(moment(new Date(event._d).toLocaleDateString(), "MM-DD-YYYY")
        .format("YYYY-MM-DD")
        .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d)))
      }

    return <div className="d-flex flex-column px-2 pb-2">
        <div className="d-flex">
            <p className="col-11 mb-0">التاريخ</p>
            {/* <FontAwesomeIcon icon={plusIcon} color={"#47cdbf"} style={{cursor:"pointer"}} className={"col d-flex flex-column align-self-center"} onClick={() => {
                setOpenDate(!openDate)
                setPlusIcon(plusIcon === faPlus ? faMinus : faPlus)
            }}/> */}
        </div>
        {/* {openDate &&  */}
        <div className="d-flex flex-xl-row flex-column w-100 mt-1">
        <div className='mx-0 d-flex align-items-center col-xl-6 col-12'>
            <Label for='hf-picker' className="mx-2">{intl.formatMessage({id: "من"})}</Label>
            <br/>
            <MuiPickersUtilsProvider
                libInstance={moment}
                utils={MomentUtils}
                locale={"sw"}
                className="bg-danger"
            >
                <KeyboardDatePicker
                okLabel="تحديد"
                cancelLabel="الغاء"
                format="L"
                value={startDate}
                inputVariant="outlined"
                variant="dialog"
                maxDateMessage=""
                mask="__-__-____"
                placeholder="يوم/شهر/سنة"
                onChange={e => handleStartDate(e) }
                views={["year", "month", "date"]}
                />
            </MuiPickersUtilsProvider>
        </div>
        <div className='mx-0 d-flex align-items-center col-xl-6 col-12 mt-2 mt-xl-0'>
            <Label for='hf-picker' className="mx-2">{intl.formatMessage({id: "إلى"})}</Label>
            <br/>
            <MuiPickersUtilsProvider
                libInstance={moment}
                utils={MomentUtils}
                locale={"sw"}
                className="bg-danger"
            >
                <KeyboardDatePicker
                okLabel="تحديد"
                cancelLabel="الغاء"
                format="L"
                value={endDate}
                inputVariant="outlined"
                variant="dialog"
                maxDateMessage=""
                mask="__-__-____"
                placeholder="يوم/شهر/سنة"
                onChange={e => handleEndDate(e) }
                views={["year", "month", "date"]}
                />
            </MuiPickersUtilsProvider>
        </div>
        </div>
        {/* } */}
    </div>
}

export default DateSearchSection