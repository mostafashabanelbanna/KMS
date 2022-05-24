import fiBrChartPieAlt from '@src/assets/images/icons/fiBrChartPieAlt.png'
import subTitles from '@src/assets/images/icons/subTitles.png'
import { useEffect, useState } from 'react'
import { CardTitle, Button } from 'reactstrap'
import axios from '../../../axios'
import Chart from 'react-apexcharts'
import { useHistory, Link } from 'react-router-dom'

const CategoryCard = () => {
    const [activeCard, setActiveCard] = useState("A1")
    const [categories, setCategories] = useState([])
    const [sectors, setSectors] = useState([])
    const [periodicites, setPeriodicites] = useState([])

    const history = useHistory()

    const getCategories = async () => {
        await axios.post(`/Home/GetClassifications`, {classificationId: 2})
        .then(response => {
                const result = response.data.data
                setCategories(result)
            })
            .catch(error => {
        })
      }

      const getSectors = async () => {
        await axios.post(`/Home/GetClassifications`, {classificationId: 1})
        .then(response => {
                const result = response.data.data
                setSectors(result)
            })
            .catch(error => {
        })
      }

      const getPeriodicites = async () => {
        await axios.get(`/Home/GetPeriodicities`)
        .then(response => {
                const result = response.data.data
                setPeriodicites(result)
            })
            .catch(error => {
        })
      }

      useEffect(() => {
        getSectors()
        getCategories()
        getPeriodicites()
        
      }, [])

      const donutColors = {
        series1: '#ffe700',
        series2: '#00d4bd',
        series3: '#826bf8',
        series4: '#2b9bf4',
        series5: '#FFA1A1'
      }
      const options = {
        legend: {
          show: true,
          position: 'bottom'
        },
        labels: periodicites.map(item => item.name_A),
    
        colors: [donutColors.series1, donutColors.series2, donutColors.series3, donutColors.series4, donutColors.series5],
        dataLabels: {
          enabled: true,
          formatter(val, opt) {
            return `${parseInt(val)}%`
          }
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                name: {
                  fontSize: '2rem'
                },
                value: {
                  fontSize: '1rem',
                  formatter(val) {
                    return `${parseInt(val)}`
                  }
                }
              }
            }
          }
        },
        responsive: [
          {
            breakpoint: 992,
            options: {
              chart: {
                height: 380
              },
              legend: {
                position: 'bottom'
              }
            }
          },
          {
            breakpoint: 576,
            options: {
              chart: {
                height: 320
              },
              plotOptions: {
                pie: {
                  donut: {
                    labels: {
                      show: true,
                      name: {
                        fontSize: '1.5rem'
                      },
                      value: {
                        fontSize: '1rem'
                      },
                      total: {
                        fontSize: '1.5rem'
                      }
                    }
                  }
                }
              }
            }
          }
        ]
      }
      const series = periodicites.map(item => item.indicatorCount)


    return (
      <div className="d-flex flex-xl-row flex-column pb-2 px-2">
        <div className="d-flex flex-column col-xl-8 col-12 card h-100 p-2 mt-2 mb-0" style={{borderRadius: 20}}>
            
            <div className='d-flex justify-content-center align-items-center mb-2' style={{height: 30}}>
                <div className={`${activeCard !== "A1" ? "" : "align-self-start"}`}><p className={`mb-0 ${activeCard !== "A1" ? "text-muted" : ""}`} style={{fontSize: 16, borderBottom: activeCard === "A1" ? "1px solid" : "unset", cursor:"pointer"}} onClick={() => {
                    setActiveCard("A1")
                }}>القطاعات</p></div>
                <div className={`${activeCard !== "A2" ? "" : "align-self-start"}`}><p className={`mb-0 mx-2 ${activeCard !== "A2" ? "text-muted" : ""}`} style={{fontSize: 16, borderBottom: activeCard === "A2" ? "1px solid" : "unset", cursor:"pointer"}} onClick={() => {
                    setActiveCard("A2")
                }}>التصنيفات</p></div>
                {/* <div className={`${activeCard !== "A3" ? "" : "align-self-start"}`}><p className={`mb-0 ${activeCard !== "A3" ? "text-muted" : ""}`} style={{fontSize: 16, borderBottom: activeCard === "A3" ? "1px solid" : "unset", cursor:"pointer"}} onClick={() => {
                    setActiveCard("A3")
                }}>الدوريات</p></div> */}
            </div>

            {activeCard === "A1" && <>
                <div className="d-flex flex-wrap">
                    {/* "#161d31" */}
                    {sectors.map((item, index) => {
                      console.log(item)
                        return (
                            <div className='col-lg-4 col-12 px-1 py-xl-0 py-2 my-1'>
                            <div className="d-flex justify-content-center align-items-center flex-column py-1" style={{backgroundColor: "#eaeaeb", borderRadius: 10}}>
                                <div className='d-flex flex-wrap col-12 pb-1'>
                                    <div className='text-center col-xl-2 col-lg-12 col-2 px-0'><img src={fiBrChartPieAlt} width="20px"/></div>
                                    <Link to={{ pathname: `/indicator/landingPage/sectors/${item.id}`}} className='text-center col-xl-8 col-lg-12 col-8 px-1' style={{fontSize: 14, fontWeight: "bold"}}>{item.name_A}</Link>
                                    <div className='text-center col-xl-2 col-lg-12 col-2 px-0' style={{color: "#3D5484", fontSize: 14}}>{item.indicatorCount}</div>
                                </div>
                                <div className='d-flex flex-column col-12 px-0'>
                                    {item.childNames.map((child,  childIndex) => {
                                      
                                        return (
                                            <div className='d-flex col-12 pb-1'>
                                                <div><img src={subTitles} width="15px"/></div>
                                                <Link to={{ pathname: `/indicator/landingPage/sectors/${child.id}`}} className='col-11' style={{fontSize: 14}}>{child.name_A}</Link>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        )
                    })}

                    {/* <div className='d-flex flex-column col-xl-3 col-lg-6 col-12 px-2 py-xl-0 py-2'>
                        <div className="d-flex justify-content-center align-items-center flex-column py-1 mb-1" style={{backgroundColor: "#eaeaeb", borderRadius: 20}}>
                            <div className='d-flex col-12'>
                                <div className='col-2'><img src={fiBrChartPieAlt} width="22px"/></div>
                                <div className='text-center col-7' style={{fontSize: 22, fontWeight: "bold"}}>البيانات الإقتصادية</div>
                                <div className='col-3' style={{color: "#3D5484", fontSize: 22}}>205</div>
                            </div>
                        </div>

                        <div className="d-flex justify-content-center align-items-center flex-column py-1 mb-1" style={{backgroundColor: "#eaeaeb", borderRadius: 20}}>
                            <div className='d-flex col-12'>
                                <div className='col-2'><img src={fiBrChartPieAlt} width="22px"/></div>
                                <div className='text-center col-7' style={{fontSize: 22, fontWeight: "bold"}}>البيانات الإقتصادية</div>
                                <div className='col-3' style={{color: "#3D5484", fontSize: 22}}>205</div>
                            </div>
                        </div>

                        <div className="d-flex justify-content-center align-items-center flex-column py-1 mb-1" style={{backgroundColor: "#eaeaeb", borderRadius: 20}}>
                            <div className='d-flex col-12'>
                                <div className='col-2'><img src={fiBrChartPieAlt} width="22px"/></div>
                                <div className='text-center col-7' style={{fontSize: 22, fontWeight: "bold"}}>البيانات الإقتصادية</div>
                                <div className='col-3' style={{color: "#3D5484", fontSize: 22}}>205</div>
                            </div>
                        </div>

                        <div className="d-flex justify-content-center align-items-center flex-column py-1 mb-1" style={{backgroundColor: "#eaeaeb", borderRadius: 20}}>
                            <div className='d-flex col-12'>
                                <div className='col-2'><img src={fiBrChartPieAlt} width="22px"/></div>
                                <div className='text-center col-7' style={{fontSize: 22, fontWeight: "bold"}}>البيانات الإقتصادية</div>
                                <div className='col-3' style={{color: "#3D5484", fontSize: 22}}>205</div>
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className='mt-2 mb-1 d-flex justify-content-end col-12 px-0'>
                    <div  className="px-2" style={{width: 300}}>
                        <Button type='button' className="w-100" color='green' style={{fontSize: 16}} onClick={() => {
                          history.push('/indicator/landingPage')
                        }}>عرض الكل</Button>
                    </div>
                </div>
            </>}

            {activeCard === "A2" && <>
            {/* <div className='d-flex justify-content-center'>
                <p style={{fontSize: 14}}>إجمالي عناصر البيانات</p>
                <p className='mx-1' style={{color: "#3D5484", fontSize: 14}}>3000</p>
            </div> */}
                <div className="d-flex flex-wrap">
                    {/* "#161d31" */}
                    {categories.map((item, index) => {
                        return (
                          <div className="col-md-4 col-sm-6 col-12 px-2 py-xl-0 py-2 mb-1">
                            <div
                              className="d-flex justify-content-center align-items-center"
                              style={{
                                backgroundColor: "#eaeaeb",
                                borderRadius: 10
                              }}
                            >
                              <div className='col-1'>
                                <img src={fiBrChartPieAlt} />
                              </div>
                              <Link to={{ pathname: `/indicator/landingPage/categories/${item.id}`}} 
                                className="p-1 col text-center"
                                style={{ fontSize: 14 }}
                              >
                                {item.name_A}
                              </Link>
                              <div className='col-2 p-0' style={{ color: "#3D5484", fontSize: 14 }}>
                                {item.indicatorCount}
                              </div>
                            </div>
                          </div>
                        )
                    })}
                </div>
                <div className='mt-2 mb-1 d-flex justify-content-end col-12 px-0'>
                    <div  className="px-2" style={{width: 300}}>
                        <Button type='button' className="w-100" color='green' style={{fontSize: 16}} onClick={() => {
                          history.push('/indicator/landingPage')
                        }}>عرض الكل</Button>
                    </div>
                </div>
            </>}
            
            {/* "#161d31" */}
            {/* {activeCard === "A3" && <>
                <div className="d-flex flex-wrap">
                    {periodicites.map((item, index) => {
                        return (
                          <div className="col-xl-2 col-md-4 col-6 px-2 py-xl-0 py-2">
                            <div
                              className="d-flex justify-content-center align-items-center flex-column py-1"
                              style={{
                                backgroundColor: "#eaeaeb",
                                borderRadius: 20
                              }}
                            >
                              <div>
                                <img src={fiBrChartPieAlt} />
                              </div>
                              <div
                                className="py-1 text-center"
                                style={{ fontSize: 16 }}
                              >
                                {item.name_A}
                              </div>
                              <div style={{ color: "#3D5484", fontSize: 16 }}>
                                {item.indicatorCount}
                              </div>
                            </div>
                          </div>
                        )
                    })}
                </div>
                <div className='mt-2 mb-1 d-flex justify-content-end col-12 px-0'>
                    <div  className="col-xl-2 col-sm-4 col-6 px-2">
                        <Button type='submit' className="w-100" color='green' style={{fontSize: 16}} onClick={() => {}}>عرض الكل</Button>
                    </div>
                </div>
            </>} */}
        
        </div>

        <div className='col-xl-4 col-12'>
          <div className="d-flex flex-column w-100 card p-2 mt-2" style={{ borderRadius: 20, height: 430 }}>
            <div className='d-sm-flex justify-content-between align-items-center mb-3'>
              <CardTitle className='mb-50 mb-sm-0'>توزيعات عناصر البيانات على الدورية</CardTitle>
              <div className='d-flex align-items-center'>
                {/* <div className='d-flex align-items-center mr-2'>
                  <span className='bullet bullet-primary mr-50 cursor-pointer'></span>
                  <span>Earning</span>
                </div>
                <div className='d-flex align-items-center'>
                  <span className='bullet bullet-warning mr-50 cursor-pointer'></span>
                  <span>Expense</span>
                </div> */}
              </div>
            </div>
            <Chart id='revenue-report-chart' width={"100%"} type='donut' height= {350} options={options} series={series} />
            {/* 
            "line" | "area" | "bar" | "histogram" | "pie" | "donut" | "rangeBar" |
            "radialBar" | "scatter" | "bubble" | "heatmap" | "candlestick" | "radar",
            */}
          </div>
        </div>
    </div>)
}

export default CategoryCard