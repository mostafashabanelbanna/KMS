import { CardTitle } from "reactstrap"
import { useEffect, useState } from 'react'
import { faEye } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import download from '@src/assets/images/icons/download.png'
import axios from '../../../axios'
import {formatDate} from '../../../utility/Utils'

const HomeCard = ({title, addedLatelyComp, favorite}) => {
    const [indicators, setIndicators] = useState([])
    const [docuements, setDocuments] = useState([])
    const [favorites, setFavorites] = useState({})

    const getIndicators = async () => {
        await axios.get(`/Home/GetLatestIndicators`)
        .then(response => {
                const result = response.data.data
                setIndicators(result)
            })
            .catch(error => {
        })
      }

      const getDocuments = async () => {
        await axios.get(`/Home/GetLatestDocumentIssues`)
        .then(response => {
                const result = response.data.data
                setDocuments(result)
            })
            .catch(error => {
        })
      }

      const getFavorites = async () => {
        await axios.get(`/Home/GetHomeFavorites`)
        .then(response => {
                const result = response.data.data
                setFavorites(result)
                console.log(favorites)
            })
            .catch(error => {
        })
      }

            useEffect(() => {
            if (!favorite) {
                getIndicators()
                getDocuments()
            } else {
                getFavorites()
            }
        }, [])
      
    return ( 
        <div className="d-flex flex-column pb-2 px-2">
        <div className='d-flex w-100 align-items-center'>
            <CardTitle tag='h4' className="mb-0">{title}</CardTitle>
            <hr className="col bg-gray my-0 ml-2" />
        </div>
        <div className="d-flex flex-column card p-2 mt-2" style={{borderRadius: 20}}>
            <div className="d-flex">
                <div className="d-flex justify-content-center align-items-center" style={{width: 35, height: 35, borderRadius: "50%", backgroundColor: "#f4f4f5"}}>
                    <div style={{width: 22, height: 22, borderRadius: "50%", backgroundColor: "#dca627"}}></div>
                </div>
                <div className="col-11 px-2">
                    <div className="d-flex flex-column">
                        <h2 className="mb-1">عناصر البيانات</h2>
                        {!favorite && indicators.map((item, index) => {
                            return (
                                <><div className="d-flex flex-wrap align-items-start col-12">
                                    <div className="col-xl-5 col-12 p-0 mb-xl-0 mb-1">
                                        <p className="mb-0" style={{ fontSize: 18, fontWeight: "bold" }}>{item.name_A}</p>
                                    </div>
                                    <div className="col-xl-5 col-md-8 col-12 p-0 mb-xl-0 mb-1">
                                        <p className="mb-0 text-muted" style={{ fontSize: 17 }}>{item.description_A}</p>
                                    </div>
                                    {addedLatelyComp && <div className="col-xl-2 col-md-4 col-12 d-flex align-items-center justify-content-end">
                                        <p className="px-1 mb-0">{formatDate(item.createDate)}</p>
                                        <FontAwesomeIcon icon={faEye} color={"#08a291"} size={"lg"} />
                                    </div>}
                                    {index < indicators.length - 1 && <hr className="col-12 bg-gray" />}
                                </div>
                                </>
                            )
                        })}

                        {favorite && favorites?.indicators?.map((item, index) => {
                            return (
                                <><div className="d-flex flex-wrap align-items-start col-12">
                                    <div className="col-xl-5 col-12 p-0 mb-xl-0 mb-1">
                                        <p className="mb-0" style={{ fontSize: 18, fontWeight: "bold" }}>{item.name_A}</p>
                                    </div>
                                    <div className="col-xl-5 col-md-8 col-12 p-0 mb-xl-0 mb-1">
                                        <p className="mb-0 text-muted" style={{ fontSize: 17 }}>{item.description_A}</p>
                                    </div>
                                    {addedLatelyComp && <div className="col-xl-2 col-md-4 col-12 d-flex align-items-center justify-content-end">
                                        <p className="px-1 mb-0">{formatDate(item.createDate)}</p>
                                        <FontAwesomeIcon icon={faEye} color={"#08a291"} size={"lg"} />
                                    </div>}
                                    {index < favorites?.indicators?.length - 1 && <hr className="col-12 bg-gray" />}
                                </div>
                                </>
                            )
                        })}
                    </div>
                </div>    
            </div>
            <hr className="col-11 bg-gray ml-3"/>
            <div className="d-flex mt-2">
                <div className="d-flex justify-content-center align-items-center" style={{width: 35, height: 35, borderRadius: "50%", backgroundColor: "#f4f4f5"}}>
                    <div style={{width: 21, height: 21, borderRadius: "50%", backgroundColor: "#dca627"}}></div>
                </div>
                <div className="col-11 px-2">
                    <div className="d-flex flex-column">
                        <h3 className="mb-1">إصدارات</h3>
                        {!favorite && docuements.map((item, index) => {
                            return (
                              <>
                                <div className="d-flex flex-wrap align-items-start col-12">
                                  <div className="col-xl-5 col-12 p-0 mb-xl-0 mb-1">
                                    <p
                                      className="mb-0"
                                      style={{
                                        fontSize: 18,
                                        fontWeight: "bold"
                                      }}
                                    >
                                        {item.name_A}
                                    </p>
                                  </div>
                                  <div className="col-xl-5 col-md-8 col-12 p-0 mb-xl-0 mb-1">
                                    <p
                                      className="mb-0 text-muted"
                                      style={{ fontSize: 17 }}
                                    >
                                        {item.description_A}
                                    </p>
                                  </div>
                                  {addedLatelyComp && (
                                    <div className="col-xl-2 col-md-4 col-12 d-flex align-items-center justify-content-end">
                                      <p className="px-1 mb-0">{formatDate(item.lastDate)}</p>
                                      <a download={"#"}>
                                        <img src={download} />
                                      </a>
                                    </div>
                                  )}
                                </div>
                                {index < docuements.length - 1 && <hr className="col-12 bg-gray" />}
                              </>
                            )
                        })}

                        {favorite && favorites?.documents?.map((item, index) => {
                            return (
                              <>
                                <div className="d-flex flex-wrap align-items-start col-12">
                                  <div className="col-xl-5 col-12 p-0 mb-xl-0 mb-1">
                                    <p
                                      className="mb-0"
                                      style={{
                                        fontSize: 18,
                                        fontWeight: "bold"
                                      }}
                                    >
                                        {item.name_A}
                                    </p>
                                  </div>
                                  <div className="col-xl-5 col-md-8 col-12 p-0 mb-xl-0 mb-1">
                                    <p
                                      className="mb-0 text-muted"
                                      style={{ fontSize: 17 }}
                                    >
                                        {item.description_A}
                                    </p>
                                  </div>
                                  {addedLatelyComp && (
                                    <div className="col-xl-2 col-md-4 col-12 d-flex align-items-center justify-content-end">
                                      <p className="px-1 mb-0">{formatDate(item.lastDate)}</p>
                                      <a download={"#"}>
                                        <img src={download} />
                                      </a>
                                    </div>
                                  )}
                                </div>
                                {index < favorites?.docuements?.length - 1 && <hr className="col-12 bg-gray" />}
                              </>
                            )
                        })}
                    </div>
                </div>    
            </div>
        </div>
    </div>)
}

export default HomeCard