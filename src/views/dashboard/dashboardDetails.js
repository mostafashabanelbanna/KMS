import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { getDashboardDetailsFront } from "./store/action"
import { useDispatch, useSelector } from "react-redux"
import { useIntl } from "react-intl"
import Breadcrumbs from "@components/breadcrumbs"

const DashboardDetails = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const Id = params.id
  const store = useSelector((state) => state.FrontDashboards)
  useEffect(() => {
    dispatch(getDashboardDetailsFront(Id))
  }, [Id])
  const intl = useIntl()

  console.log(store.details)

  if (store.details) {
    const imgUrl = `${process.env.REACT_APP_MAINPATH}/WebResource/Logo/${store.details.id}/${store.details.logo}`
    return (
        <>
            <Breadcrumbs
                breadCrumbTitle={intl.formatMessage({ id: "Dashboards" })}
                breadCrumbActive={intl.formatMessage({ id: "التفاصيل" })}
                breadCrumbParent={intl.formatMessage({ id: "Dashboards" })}
            />
            {store.details.name && <p style={{fontSize: 24}}>{store.details.name}</p>}
            <div className="d-flex flex-lg-row flex-column">
                <div className={`d-flex flex-lg-row flex-column ${store?.details?.indicators?.length ? "col-lg-9 col-12" : "col-12"}`}>
                    <div className="col-12 text-justify p-0">
                    <p className="text-justify">
                        <img
                        className="img-fluid col-12 col-lg-7 float-lg-right p-0 ml-lg-2 mb-1" //logo
                        src={imgUrl}
                        alt="President Photo"
                        style={{height: 350, overflow: "hidden", position: "relative", borderRadius: 8}}
                        />
                    </p>
                    <div
                        className=" text-justify"
                        style={{ lineHeight: 2, fontSize: "1rem", textAlign: "justify", wordBreak: "break-word" }}
                    >
                        {store.details.description ?? ""}
                        <p
                            className="d-flex flex-column mt-2"
                            style={{ color: "rgb(23, 77, 125)", fontWeight: "lighter", fontSize: 16 }}
                        >
                            <span>بيانات الدخول</span>
                            <a href={store.details.url} target="_blank" style={{textDecoration: "underline"}}>رابط اللوحة المعلوماتية</a>
                            {store.details.login && <span>إسم المستخدم&nbsp;&nbsp;{store.details.login}</span>}
                            {store.details.password && <span>كلمة المرور&nbsp;&nbsp;{store.details.password}</span>}
                        </p>
                    </div>
                    </div>
                </div>

                {store?.details?.indicators?.length ? <div className="col-lg-3 col-12">
                    <div className="card d-flex flex-column px-2 pb-2">
                        <div className="d-flex mt-2 align-items-center">
                            <p className="mb-0 col-12 p-0" style={{ fontSize: 16, color: "#3d5484" }}>عناصر بيانات ذات صلة</p>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                            <p className="mb-0 p-0 text-muted" style={{ fontSize: 14 }}>إجمالي عناصر البيانات المستخدمة</p>
                            <p className="mb-0 px-1 p-0" style={{ fontSize: 14, fontWeight: "bolder", color: "#3d5484" }}>{store?.details?.indicators?.length}</p>
                        </div>
                        {store.details?.indicators?.length && store.details?.indicators?.map((item, index) => {
                            return (
                                <div key={item.id}>
                                    <div>
                                        <Link  className="d-block" style={{width: "fit-content"}} to={{ pathname: `/indicator/indicatorDetails/${item.id}`, state: { id : item.id}}}>{item.name}</Link>
                                    </div>
                                    {store.details?.indicators?.length - index - 1 > 0  && <hr className="w-100"/>}
                                </div>
                            )
                        })}
                    </div>
                </div> : ""}
            </div>
        </>
    )
  } else {
      return <div></div>
  }
}

export default DashboardDetails
