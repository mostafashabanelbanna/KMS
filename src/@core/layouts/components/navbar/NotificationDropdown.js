// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'
import { HubConnectionBuilder } from "@microsoft/signalr"
import * as signalR from "@microsoft/signalr"
import { useDispatch, useSelector } from 'react-redux'
import { getData, getIsNotSeenCount} from '../../../../views/notification/store/action/index'
// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Bell, X, Check, AlertTriangle } from 'react-feather'
import {
  Button,
  Badge,
  Media,
  CustomInput,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap'
import * as moment from "moment"
import "moment/locale/ar"
import axios from '../../../../axios'

const NotificationDropdown = () => {
  const dispatch = useDispatch()

  const store = useSelector(state => state.userNotifications)

  const [connection, setConnection] = useState(null)


  const setSignalRConfig = () => {
    const connect = new HubConnectionBuilder()
      .withUrl(`${window.location.hostname}/NotificationUserHub?userId=${JSON.parse(localStorage.getItem('userData')).id}`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .withAutomaticReconnect()
      .build()
    setConnection(connect)
    return () => {
      connect.stop()
    }
  }
  useEffect(() => {
    dispatch(getData({rowsPerPage: 6, pageNumber: 1}))
    dispatch(getIsNotSeenCount())
    setSignalRConfig()
  }, [dispatch])

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.invoke('GetConnectionId')
          connection.on("reciveNotification", (notification) => {
            dispatch(getData({rowsPerPage: 6, pageNumber: 1}))
            dispatch(getIsNotSeenCount())
          })
        })
        .catch((error) => console.log(error))
    }
    
  }, [connection])
  const setAllSeen = async (e) => {
    e.preventDefault()
    await axios.get(`/Account/SetAllNotificationSeen`)
    .then(response => {
        // Dispatch SeenCount to 0
        dispatch({type: "SET_ISNOT_SEEN_NOTIFICATION", isNotSeenCount: 0})
    })
    .catch(error => {})

  }
  // ** Function to render Notifications
  /*eslint-disable */
  const renderNotificationItems = () => {
    return (
      <PerfectScrollbar
        component='li'
        className='media-list scrollable-container'
        options={{
          wheelPropagation: false
        }}
      >
        {store.data && store.data.length > 0 && store.data.map((item, index) => {
          return (
            <a key={index} className='d-flex' href='/notifications' onClick={() => {console.log(item)}}>
              <Media
                className={classnames('d-flex', {
                  'align-items-start': !item.switch,
                  'align-items-center': item.switch
                })}
              >
                <Fragment>
                  <Media left>
                    <Avatar
                      {...({
                            content: JSON.parse(localStorage.getItem('userData')).fullName[0].toUpperCase(),
                            color: 'info'
                          }
                       )}
                    />
                  </Media>
                  <Media body>
                  <Media tag='p' heading>
                    <span className='font-weight-bolder'>{item.title}</span>
                  </Media>
                    <small className='notification-text'>{moment(item.creationDate)
                                                .locale("ar")
                                                .format("LL")}</small>
                  </Media>
                </Fragment>
                
              </Media>
            </a>
          )
        })}
      </PerfectScrollbar>
    )
  }
  /*eslint-enable */

  return (
    <UncontrolledDropdown tag='li' className='dropdown-notification nav-item mr-25'>
      <DropdownToggle tag='a' className='nav-link' href='/' onClick={e => setAllSeen(e)}>
        <Bell size={21} />
        { store.isNotSeenCount > 0 && <Badge pill color='danger' className='badge-up'>
          {store.isNotSeenCount}
        </Badge>}
      </DropdownToggle>
      <DropdownMenu tag='ul' right className='dropdown-menu-media mt-0'>
        <li className='dropdown-menu-header'>
          <DropdownItem className='d-flex' tag='div' header>
            <h4 className='notification-title mb-0 mr-auto'>التنويهات</h4>
            <Badge tag='div' color='light-primary' pill>
              {store.data.length}
            </Badge>
          </DropdownItem>
        </li>
        {renderNotificationItems()}
        <li className='dropdown-menu-footer'>
          <Button.Ripple color='primary' block href="/notifications">
            قراءة المزيد من التنويهات
          </Button.Ripple>
        </li>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default NotificationDropdown
