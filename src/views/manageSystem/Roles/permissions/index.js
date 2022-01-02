// ** React Imports
import { Fragment, useState, useEffect, useContext, useRef } from 'react'


// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
// import { getLookupValue, deleteLookupValue, getData, getLookups } from './store/action/Index'

// ** Third Party Components
import swal from "sweetalert"

import { Link, Redirect} from 'react-router-dom'

import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import { ChevronDown, Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive  } from 'react-feather'
import DataTable from 'react-data-table-component'
import { selectThemeColors } from '@utils'
import { Card,  Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import AppCollapse from '@components/app-collapse'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import { toast } from 'react-toastify'
import Row from 'reactstrap/lib/Row'
import {useIntl, FormattedMessage } from 'react-intl'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'


// helper function
import {isAuthorized} from '../../../../utility/Utils'

 const permissions = () => {
    
    // ** Store Vars
    const dispatch = useDispatch()
    const store = useSelector(state => state.lookups)


    // useIntl
    const intl = useIntl()

    // scroll to view element
    const myRef = useRef(null)

    const executeScroll = () => myRef.current.scrollIntoView()    

    const arr = [
                {title: 'mostafa', content: <Card className="displayName" style={{cursor: "pointer", padding: '8px'}} >1111</Card>},
                {title: 'mostafa', content: <Card className="displayName" style={{cursor: "pointer", padding: '8px'}} >1111</Card>},
                {title: 'mostafa', content: <Card className="displayName" style={{cursor: "pointer", padding: '8px'}} >1111</Card>},
                {title: 'mostafa', content: <Card className="displayName" style={{cursor: "pointer", padding: '8px'}} >1111</Card>}
            ]

    return (
        <>
            {isAuthorized(store.error) ? <Redirect to='/misc/not-authorized' /> : (
            <>
                <div className='row'>
                    <div className='col-md-4'>
                        <AppCollapse  data={arr} type='margin' accordion />
                    </div>
                    <div ref={myRef} className='col-md-8 mt-1'>
                      mostafa
                    </div>
                </div>
            </>
            )}
        </>
    )
}
export default permissions