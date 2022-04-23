import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import { useState } from "react"
import { Label } from "reactstrap"
import MomentUtils from "@date-io/moment"
import { useIntl } from 'react-intl'
import moment from "moment"
import "moment/locale/ar"
import { useDispatch, useSelector } from 'react-redux'

const DateSearchSection = () => {
    const intl = useIntl()
    const dispatch = useDispatch()
    const store = useSelector(state => state.frontIndicators)

    const handleStartDate = (event) => {
        const date = moment(new Date(event._d).toLocaleDateString(), "MM-DD-YYYY")
        .format("YYYY-MM-DD")
        .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))
        dispatch({type: "SET_FRONT_INDICATOR_DATE_FROM", dateFrom: date })
      }

      const handleEndDate = (event) => {
        const date = moment(new Date(event._d).toLocaleDateString(), "MM-DD-YYYY")
        .format("YYYY-MM-DD")
        .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))

        dispatch({type: "SET_FRONT_INDICATOR_DATE_TO", dateTo: date })
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
        <div className="flex-xl-row flex-column w-100 mt-1">
        <div className='mx-0 d-flex align-items-center col-xl-12 col-12 mb-1'>
            <Label for='hf-picker' className="mx-2">{intl.formatMessage({id: "من"})}</Label>
            <br/>
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
                value={store.dateFrom}
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
        <div className='mx-0 d-flex align-items-center col-xl-12 col-12 mt-2 mt-xl-0'>
            <Label for='hf-picker' className="mx-2">{intl.formatMessage({id: "إلى"})}</Label>
            <br/>
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
                value={store.dateTo}
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