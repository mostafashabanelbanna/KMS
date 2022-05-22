import { Link } from "react-router-dom"
import { Fragment, useState } from "react"
import { Button, Tooltip } from "reactstrap"
import "moment/locale/ar"
import SliderB1 from "@src/assets/images/icons/SliderB1.png"

const DashboardCard = (item) => {
  const [tooltipOpen, setTooltipOpen] = useState(false)

  return (
    <div
      className="card d-flex flex-column py-1 mb-2"
      style={{
        borderRadius: 6,
        height: "max-content"
      }}
    >
      <div className="d-flex">
        <div className="d-flex align-items-center dark-layout mb-1 px-2 col-10 font-18">
          <div
            className="mr-1"
            style={{
              backgroundImage: `url('${SliderB1}')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              height: 30,
              width: 30
            }}
          ></div>
          <Link to={{ pathname: `/Dashboards/DashboardDetails/${item.item.id}`, state: { Id : item.item.id}}} className="mb-0" style={{ fontSize: 16, width: "fit-content" }}>
            {item.item.name}
          </Link>
        </div>
        <div className="d-flex col-2">
          <div className="col-9 d-flex justify-content-end">
            كود {item.item.id}
          </div>
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
                      borderRadius: 8
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
                    Hello World !
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
                      borderRadius: 8
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
        )}
      </div>
    </div>
  )
}

export default DashboardCard
