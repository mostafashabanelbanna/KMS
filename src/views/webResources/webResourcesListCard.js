import { Link } from 'react-router-dom'
import { Download } from 'react-feather'
import * as moment from "moment"
import "moment/locale/ar"
import SliderB1 from "@src/assets/images/icons/SliderB1.png"

const WebResourcesCard = (item) => {
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
        <div className="d-flex align-items-center dark-layout mb-1 px-2 col-10 font-18">
          <div
            className='mr-1'
            style={{
              backgroundImage: `url('${SliderB1}')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              height: 30,
              width: 30
            }}
            >
          </div>
          <a className="d-block" style={{width: "fit-content"}} href={item.item.url} target="_blank">
            {item.item.name}
          </a>
        </div>
        <div className="d-flex col-2">
          <div className="col-9 d-flex justify-content-end">
            كود {item.item.id}
          </div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-center flex-md-row">
        {item.item.description && 
          <div className="d-flex col-md-8 col-12 px-2">
            <p className="mx-1 mb-0" style={{wordBreak: "break-word"}}>{item.item.description}</p>
          </div>
        }
       
       {item.item.description ? <div className="d-flex flex-wrap justify-content-end col-md-4 col-12 px-2">
          {item.item.webResourceCategoryName !== null && (
            <div className="d-flex align-items-center col-12">
              <p
                className="mb-0 w-100 text-center"
                style={{
                  padding: "0.5rem",
                  backgroundColor: "#edeff6",
                  borderRadius: 8
                }}
              >
                {item.item.webResourceCategoryName}
              </p>
            </div>
          )}
          </div> : <div className="d-flex flex-wrap justify-content-end col-12 px-2">
            {item.item.webResourceCategoryName !== null && (
              <div className="d-flex align-items-center col-md-4 col-12">
                <p
                  className="mb-0 w-100 text-center"
                  style={{
                    padding: "0.5rem",
                    backgroundColor: "#edeff6",
                    borderRadius: 8
                  }}
                >
                  {item.item.webResourceCategoryName}
                </p>
              </div>
            )}
          </div> 
        }
      </div>
    </div>
  )
}

export default WebResourcesCard
