import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-regular-svg-icons"
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { ArrowsIcon, SignalIcon, StatsIcon } from "./icons"

const IndicatorCard = () => {
  const [heart, setHeart] = useState(faHeart) // change initial state from api
  return (
    <div
      className="bg-white d-flex flex-column py-2 mb-2"
      style={{
        borderRadius: 6,
        height: "max-content",
        boxShadow: "2px 1px 6px gray"
      }}
    >
      <div className="d-flex">
        <div className="dark-layout mb-2 px-2 col-11">إجمالي عدد السكان</div>
        <FontAwesomeIcon
          icon={heart}
          color="#08a291"
          className="col"
          width={20}
          style={{ cursor: "pointer" }}
          onClick={() => {
            setHeart(heart === faHeart ? solidHeart : faHeart)
          }}
        />
      </div>
      <div className="dark-layout mb-2 d-flex align-items-center px-2">
        <div>المصادر</div>
        <div
          className="ml-2"
          style={{
            backgroundColor: "#dcefeb",
            padding: "0.5rem",
            borderRadius: 4
          }}
        >
          وزارة التربية والتعليم
        </div>
      </div>
      <div className="dark-layout mb-2 d-flex align-items-center px-2">
        <div>القطاعات</div>
        <div
          className="ml-2 px-2"
          style={{
            backgroundColor: "#edeff6",
            padding: "0.5rem",
            borderRadius: 16
          }}
        >
          قطاع التعليم
        </div>
      </div>
      <hr className="w-100 bg-gray mt-0 mb-2" />
      <div className="d-flex flex-wrap justify-content-center px-2">
        <div className="d-flex align-items-center col-lg-3 col-md-4 col-12">
          <SignalIcon />
          <p className="mb-0" style={{ paddingRight: "0.5rem" }}>
            3 دوريات متوفرة
          </p>
        </div>
        <div className="d-flex align-items-center col-lg-3 col-md-3 col-12">
          <ArrowsIcon />
          <p className="mb-0" style={{ paddingRight: "0.5rem" }}>
            4 ابعاد
          </p>
        </div>
        <div className="d-flex align-items-center col-lg-6 col-md-5 col-12">
          <StatsIcon />
          <p className="mb-0" style={{ paddingRight: "0.5rem" }}>
          السلسلة المتوفرة من 2001 الي 2021
          </p>
        </div>
      </div>
    </div>
  )
}

export default IndicatorCard
