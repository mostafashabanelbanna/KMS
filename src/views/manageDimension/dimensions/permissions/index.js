// ** React Imports
import { Fragment, useState, useEffect, useContext, useRef } from 'react'


// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
// getRolePermission
import {  getRolePermission } from '../store/action'

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
// ** permissions Component
import Breadcrumbs from '@components/breadcrumbs'
import PermissionsForm from './Form'

// json Object 
import obj from './obj.json'

 const permissions = (props) => {
    console.log(props)
    const [currentObject, setCurrentObject] = useState({})

    // ** Store Vars
    const dispatch = useDispatch()
    const store = useSelector(state => state.roles.permissions.rolesData)

    // useIntl
    const intl = useIntl()

    // scroll to view element
    const myRef = useRef(null)

    const executeScroll = () => myRef.current.scrollIntoView()   
   
    // useEffect(() => {
    //     effect
    //     return () => {
    //         cleanup
    //     }
    // }, [input])
    const RenderAccordions = () => {
        const permissionsAccordions = []
            for (let i = 0; i < obj.Accordions.length; i++) {
                const content = (obj.Accordions[i].Objects.map((obj, idx) => {
                    return (
                                <Card 
                                    className="displayName" 
                                    key={idx} 
                                    style={{cursor: "pointer", padding: '8px'}} 
                                    onClick={(e) => {
                                        dispatch(getRolePermission(props.location.state.id, obj.ObjectName))
                                        setCurrentObject(obj)
                                        executeScroll()
                                    }}
                                >
                                    {/* {obj.ObjectName} */}
                                  <FormattedMessage id={obj.ObjectName} />
                                </Card>
                            )
                    }
                ))
                // console.log(obj.Accordions[i].Name)
                // permissionsAccordions.push({title: obj.Accordions[i].Name, content})
                permissionsAccordions.push({title: intl.formatMessage({id: obj.Accordions[i].Name}), content})
            }
        return  permissionsAccordions

    }       


    return (
        <>
            {isAuthorized(store) ? <Redirect to='/misc/not-authorized' /> : (
            <>
                <Breadcrumbs 
                    breadCrumbTitle={`${intl.formatMessage({id: "SpecifyPermissionsTitle"})}  ${intl.formatMessage({id: props.location.state.name.charAt(0).toUpperCase() + props.location.state.name.slice(1)})}`}
                    breadCrumbParent={intl.formatMessage({id: "Manage System"})} 
                    breadCrumbActive={intl.formatMessage({id: "SpecifyPermissions"})} 
                    breadCrumbRoot={intl.formatMessage({id: "Homepage"})} 
                    breadCrumbPa
                />
                <div className='row'>
                    <div className='col-md-4'>
                        <AppCollapse  data={RenderAccordions()} type='margin' accordion />
                    </div>
                    <div ref={myRef} className='col-md-8 mt-1'>
                       {store && store.length !== 0 ? <PermissionsForm roleId={props.location.state.id} storePerm={store} currentObjectFunctions={currentObject.Functions} currentObject={currentObject} /> : null} 
                    </div>
                </div>
            </>
            )}
        </>
    )
}
export default permissions