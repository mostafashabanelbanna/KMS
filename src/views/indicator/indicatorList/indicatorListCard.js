import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-regular-svg-icons"
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { ArrowsIcon, SignalIcon, StatsIcon } from "./icons"

const IndicatorCard = () => {
  const [heart, setHeart] = useState(faHeart) // change initial state from api
  return (
    <div
      className="card d-flex flex-column py-2 mb-2"
      style={{
        borderRadius: 6,
        height: "max-content",
        boxShadow: "2px 1px 6px gray"
      }}
    >
      <div className="d-flex">
        <div className="dark-layout mb-2 px-2 col-8" style={{fontSize: 20}}>إجمالي عدد السكان</div>
        <div className="d-flex col-4">
          <div className="col-9 d-flex justify-content-end">كود 102515</div>
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
      </div>
      <div className="d-flex flex-column align-items-center flex-md-row">
        <div className="d-flex flex-wrap justify-content-start col-md-6 px-5">
          <div className="text-center">
            <p style={{fontSize: 24, fontWeight: "bold"}}>102.3</p>
            <p>مليون نسمة</p>
          </div>
        </div>
        <div className="d-flex flex-wrap justify-content-end col-md-6 px-2">
          <div className="d-flex align-items-center col-md-4 col-12">
            <p className="mb-0 w-100 text-center" style={{ padding: "0.5rem", backgroundColor: "#edeff6", borderRadius: 8 }}>
              دورية سنوية
            </p>
          </div>
          <div className="d-flex align-items-center col-md-4 col-12">
            <div className="d-flex align-items-center justify-content-center w-100" style={{ padding: "0.5rem", backgroundColor: "#edeff6", borderRadius: 8 }}>
              <ArrowsIcon />
              <p className="mb-0" style={{ paddingRight: "0.5rem"}}>
                4 ابعاد
              </p>
            </div>
          </div>
          <div className="d-flex align-items-center col-md-4 col-12">
            <p className="mb-0 w-100 text-center" style={{ padding: "0.5rem", backgroundColor: "#edeff6", borderRadius: 8 }}>
              من 2001 الي 2021
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndicatorCard
