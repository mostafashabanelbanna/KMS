import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-regular-svg-icons"
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons"


const IndicatorDetailsCard = ({item}) => {
    console.log(item)
    return (
        <div
          className="card d-flex flex-column py-1 mb-2"
          style={{
            borderRadius: 6,
            height: "max-content"
          }}
        >
          <div className="d-flex">
            <div className="dark-layout px-2 col-11 mb-1 font-18">
              <h1 className="d-block" style={{width: "fit-content;", color: '#636363'}}>
                {item.name_A}
              </h1>
            </div>
            <div className="d-flex">
            <FontAwesomeIcon
                icon={faHeart}
                color="#08a291"
                className="col"
                width={20}
                style={{ cursor: "pointer" }}
              />
              {/* {item.isFavorit && <FontAwesomeIcon
                icon={solidHeart}
                color="#08a291"
                className="col"
                width={20}
                style={{ cursor: "pointer" }}
                onClick={() => RemoveIndicatorFromFavorite(item.item.id)}
              />
              }
              {!item.isFavorit && <FontAwesomeIcon
                icon={faHeart}
                color="#08a291"
                className="col"
                width={20}
                style={{ cursor: "pointer" }}
                onClick={() => AddIndicatorToFavorite(item.item.id)}
              />
              } */}
            </div>
          </div>
          <div className="d-flex flex-column align-items-center flex-md-row mx-3">
           
            {item && item.indicatorPeriodicities && item.indicatorPeriodicities.length > 0 &&  
              item.indicatorPeriodicities.map((item, idx) => (
                      <div   key={idx} className="">
                        <p className="px-3 mb-0 w-100 text-center" style={{ padding: "0.5rem", backgroundColor: "#edeff6", borderRadius: 8 }}>
                            {item.name}
                         </p>
                       </div> 
            ))}
           
           
{/* 
              {item.item.periodicities && 
                <div className="d-flex align-items-center col-md-4 col-12">
                  <p className="mb-0 w-100 text-center" style={{ padding: "0.5rem", backgroundColor: "#edeff6", borderRadius: 8 }}>
                    {item.item.periodicities}
                  </p>
                </div>
              }
              <div className="d-flex align-items-center col-md-4 col-12">
                <div className="d-flex align-items-center justify-content-center w-100" style={{ padding: "0.5rem", backgroundColor: "#edeff6", borderRadius: 8 }}>
                  <ArrowsIcon />
                  <p className="mb-0" style={{ paddingRight: "0.5rem"}}>
                    ({item.item.dimensionsNumber})  ابعاد
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-center col-md-4 col-12">
                {item.item.fromYear && <p className="mb-0 w-100 text-center" style={{ padding: "0.5rem", backgroundColor: "#edeff6", borderRadius: 8 }}>
                  من {item.item.fromYear} الي {item.item.toYear}
                </p>
                }
              </div> */}


            </div>
            {item && item.indicatorSources && item.indicatorSources.length > 0 && 
             <div className='mx-3 my-1'>
                      <h5 style={{color: '#5853B2'}}> المصادر</h5>
                      <div className='row'>
                      
                         {item && item.indicatorSources && item.indicatorSources.length > 0 &&  
                          item.indicatorSources.map((item, idx) => (
                             <div   key={idx} className="mx-1">
                        <p className="px-3 mb-0 w-100 text-center" style={{ padding: "0.5rem", backgroundColor: "#edeff6", borderRadius: 8 }}>
                            {item.name}
                         </p>
                       </div> 
            ))}


                      </div>
                    </div>}
                    {item && item.indicatorClassificationValues && item.indicatorClassificationValues.length > 0 && 
             <div className='mx-3 my-1'>
                      <h5 style={{color: '#5853B2'}}> التصنيفات</h5>
                      <div className='row'>
                      
                         {item && item.indicatorClassificationValues && item.indicatorClassificationValues.length > 0 &&  
                          item.indicatorClassificationValues.map((item, idx) => (
                             <div   key={idx} className="mx-1">
                        <p className="px-3 mb-0 w-100 text-center" style={{ padding: "0.5rem", backgroundColor: "#edeff6", borderRadius: 8 }}>
                            {item.name}
                         </p>
                       </div> 
            ))}


                      </div>
                    </div>}
                    
          </div>
    )
}

export default IndicatorDetailsCard