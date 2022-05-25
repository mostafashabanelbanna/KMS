import Chart from 'react-apexcharts'
import { ArrowDown } from 'react-feather'
import { Card, CardHeader, CardTitle, CardBody, CardSubtitle, Badge, Col } from 'reactstrap'
import fiBrChartPieAlt from '@src/assets/images/icons/fiBrChartPieAlt.png'
import subTitles from '@src/assets/images/icons/subTitles.png'
import { useEffect, useState } from 'react'
import axios from '../../../../axios'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const LineChart = ({ direction = 'rtl', warning = 'red'}) => {
    const [chartData, setChartData] = useState([])
    const store = useSelector(state => state.indicatorDetails)

    const getChartData = async () => {
        const dimValues = []
        store.seriesDimensionValues.forEach(element => {
          element.forEach(ele => {
            dimValues.push(ele.id)
          })
        })
        const postData = {
          IndicatorId: store.indicatorDetails.id,
          SourceId: store.selectedSource.id,
          PeriodicityId: store.selectedPeriodicity.id,
          FromDate: store.seriesDateFrom,
          ToDate: store.seriesDateTo,
          DimensionsValues: dimValues
        }
        await axios.post(`/Dataset/GetAllDatasetValuesForChart`, postData) //change here
        .then(response => {
                const result = response.data.data
                setChartData(result)
                console.log("Search")
                console.log(result)
            })
            .catch(error => {
        })
    }

    useEffect(() => {
        getChartData()
    }, [])

  const options = {
    chart: {
      zoom: {
        enabled: false
      },
      parentHeightOffset: 0,
      toolbar: {
        show: false
      }
    },

    markers: {
      strokeWidth: 7,
      strokeOpacity: 1,
      strokeColors: ['#fff'],
      colors: ['#00F']
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    colors: ['#3F447C', '#08A291', "#9AC3D9", "#E0BD1C", "#A8441C"],
    grid: {
      xaxis: {
        lines: {
          show: true
        }
      }
    },
    tooltip: {
      custom(data) {
        return `<div class='px-1 py-50'>
              <span>${data.series[data.seriesIndex][data.dataPointIndex]} %</span>
            </div>`
      }
    },
    xaxis: { //add map array of dates here
      categories: chartData.seriesDates
    },
    yaxis: {
      opposite: direction === 'rtl'
    }
  }

  //[ //add name prop and map array of values
  //   {
  //     name: 'a', data: [280, 200, 220, 180, 270, 250, 180, null, 200, 150, 160, 100, 150, 150]
  //   },
  //   {
  //       name: 'b', data: [250, 210, 220, 190, 200, 270, 70, 0, 1000, 100, 160, 100, 150, 100, 50]
  //   }
  // ]

  return (
    <Col sm='9'>
        <Card>
            {/* <CardHeader className='d-flex flex-sm-row flex-column justify-content-md-between align-items-start justify-content-start'>
                <div>
                <CardTitle className='mb-75' tag='h4'>
                    Balance
                </CardTitle>
                <CardSubtitle className='text-muted'>Commercial networks & enterprises</CardSubtitle>
                </div>
                <div className='d-flex align-items-center flex-wrap mt-sm-0 mt-1'>
                <h5 className='font-weight-bolder mb-0 mr-1'>$ 100,000</h5>
                <Badge color='light-secondary'>
                    <ArrowDown size={13} className='text-danger' />
                    <span className='align-middle ml-25'>20%</span>
                </Badge>
                </div>
            </CardHeader> */}
            <CardBody>
                {chartData.chartSeries && <Chart options={options} series={chartData.chartSeries} type='line' height={500} />}
            </CardBody>
        </Card>
    </Col>
  )
}

export default LineChart
