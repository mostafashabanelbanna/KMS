import { Link } from "react-router-dom"
import { Fragment, useState } from "react"
import { Button, Tooltip } from "reactstrap"
import "moment/locale/ar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-regular-svg-icons"
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons"
import { addToFavorit, notify, removeFromFavorit } from '../../utility/Utils'
import { useDispatch, useSelector } from 'react-redux'

const DashboardCard = (item) => {
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const store = useSelector(state => state.FrontDashboards)
  const dispatch = useDispatch()

  const AddIndicatorToFavorite = async (id) => {  
    const result = await addToFavorit("webResource", id)
    if (result) {
      if (store.dashboards && store.dashboards.length > 0) {
        const ele = store.dashboards.find(x => x.id === id)
        ele.isFavorit = true
        dispatch({type: "GET_FRONT_DASHBOARDS_DATA", data: [...store.dashboards], totalPages: store.totalPages, totalCount: store.totalCount })
      }
    }
  }

  const RemoveIndicatorFromFavorite = async (id) => {  
    const result = await removeFromFavorit("webResource", id)
    if (result) {
      if (store.dashboards && store.dashboards.length > 0) {
        const ele = store.dashboards.find(x => x.id === id)
        ele.isFavorit = false
        dispatch({type: "GET_FRONT_DASHBOARDS_DATA", data: [...store.dashboards], totalPages: store.totalPages, totalCount: store.totalCount })
      }
    }
  }
  
  return (
    <div
      className="card d-flex flex-column py-1 mb-2"
      style={{
        borderRadius: 6,
        height: "max-content"
      }}
      key={item.item.id}
    >
      <div className="d-flex">
        <div className="d-flex align-items-center dark-layout mb-1 px-2 col-11 font-18">
          <Link to={{ pathname: `/Dashboards/Details/${item.item.id}`, state: { Id : item.item.id}}} className="mb-0" style={{ fontSize: 16, width: "fit-content" }}>
            {item.item.name}
          </Link>
        </div>
        <div className="d-flex">
            {item.item.isFavorit && <FontAwesomeIcon
              icon={solidHeart}
              color="#08a291"
              className="col"
              width={20}
              style={{ cursor: "pointer" }}
              onClick={() => RemoveIndicatorFromFavorite(item.item.id)}
            />
            }
            {!item.item.isFavorit && <FontAwesomeIcon
              icon={faHeart}
              color="#08a291"
              className="col"
              width={20}
              style={{ cursor: "pointer" }}
              onClick={() => AddIndicatorToFavorite(item.item.id)}
            />
            }
          </div>
      </div>
      <div className="d-flex flex-column align-items-center flex-md-row">
        {item.item.description && (
          <div className="d-flex col-md-8 col-12 px-2">
            <p className="mx-1 mb-0" style={{ wordBreak: "break-word" }}>
              {item.item.description}
            </p>
          </div>
        )}

        {item.item.description ? (
          <div className="d-flex flex-wrap justify-content-end col-md-4 col-12 px-2">
            {item.item.indicators && (
              <Fragment>
                <div
                  className="d-flex align-items-center col-12"
                  id={`dashboardTooltip${item.item.id}`}
                >
                  <p
                    className="mb-0 w-100 text-center"
                    style={{
                      padding: "0.5rem",
                      backgroundColor: "#edeff6",
                      borderRadius: 8,
                      fontSize:12
                    }}
                  >
                    إجمالي عناصر البيانات المستخدمة&nbsp;&nbsp;
                    <span style={{ color: "#7367f0", fontWeight: "bold" }}>
                      {item.item.indicators.length > 0 ? item.item.indicators.length : 0}
                    </span>
                  </p>
                </div>
                {item.item.indicators.length > 0 && (
                  <Tooltip
                    placement="top"
                    isOpen={tooltipOpen}
                    target={`dashboardTooltip${item.item.id}`}
                    toggle={() => setTooltipOpen(!tooltipOpen)}
                  >
                    <div className="d-flex flex-column">
                      {item.item.indicators.map((item, index) => {
                        return <div>{item.name}</div>
                      })}
                    </div>
                  </Tooltip>
                )}
              </Fragment>
            )}
          </div>
        ) : (
          <div className="d-flex flex-wrap justify-content-end col-12 px-2">
            {item.item.indicators && (
              <Fragment>
                <div
                  className="d-flex align-items-center col-md-4 col-12"
                  id={`dashboardTooltip${item.item.id}`}
                >
                  <p
                    className="mb-0 w-100 text-center"
                    style={{
                      padding: "0.5rem",
                      backgroundColor: "#edeff6",
                      borderRadius: 8,
                      fontSize:12
                    }}
                  >
                    إجمالي عناصر البيانات المستخدمة&nbsp;&nbsp;
                    <span style={{ color: "#7367f0", fontWeight: "bold" }}>
                      {item.item.indicators.length > 0 ? item.item.indicators.length : 0}
                    </span>
                  </p>
                </div>
                {item.item.indicators.length > 0 && (
                  <Tooltip
                    placement="top"
                    isOpen={tooltipOpen}
                    target={`dashboardTooltip${item.item.id}`}
                    toggle={() => setTooltipOpen(!tooltipOpen)}
                  >
                    <div className="d-flex flex-column">
                      {item.item.indicators.map((item, index) => {
                        return <div key={item.id}>{item.name}</div>
                      })}
                    </div>
                  </Tooltip>
                )}
              </Fragment>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardCard
