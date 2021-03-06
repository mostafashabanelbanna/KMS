import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { AlignJustify, Rss, Info, Image, Users, Edit } from 'react-feather'
import { Link } from 'react-router-dom'
import { Card, CardImg, Collapse, Navbar, Nav, NavItem, NavLink, Button } from 'reactstrap'
import {getAllClassifications} from './store/action/index'

import {tabEnum} from './tabEnum'

const indicatorHeader = ({ classificationId, tabEnumValue  }) => {
  const [isOpen, setIsOpen] = useState(false)
  //const [ClassificationId, setClassificationId] = useState(classificationId)

    // ** Store Vars
    const dispatch = useDispatch()
    const store = useSelector(state => state.researcherIndicators)
 
    useEffect(() => {
        if (store.classifications.length <= 0) {
            dispatch(getAllClassifications())
        }
    }, [])

  const toggle = () => setIsOpen(!isOpen)
  return (
    // <Card className='profile-header mb-2'>
    //   <div className='profile-header-nav'>
        <Navbar className='justify-content-end justify-content-md-between w-100' expand='md' >
          <Button color='' className='btn-icon navbar-toggler' onClick={toggle}>
            <AlignJustify size={21} />
          </Button>
          <Collapse isOpen={isOpen} navbar>
            <div className='profile-tabs d-flex justify-content-between flex-wrap mt-1 mt-md-0'>
              <Nav tabs>
                  {store.classifications.length > 0 &&  store.classifications.map((item, idx) => (
                     <NavItem key={idx}>
                       <NavLink tag={Link} to={{pathname: `/indicator/classification/${item.id}`}} className='font-weight-bold' active={((classificationId && parseInt(item.id) === parseInt(classificationId)) || (!classificationId && item.id === store.classifications[0].id)) && tabEnumValue === tabEnum.classification}>
                         <h4 className='d-none d-md-block mb-0'>{item.name}</h4>
                         <h4 className='d-block d-md-none mb-0'>{item.name}</h4>
                       </NavLink>
                     </NavItem>
                   ))}
                {/* <NavItem>
                  <NavLink tag={Link} to='/indicator/periodicity' className='font-weight-bold' active={tabEnum.periodicity === tabEnumValue}>
                    <span className='d-none d-md-block'>??????????????</span>
                    <span className='d-block d-md-none'>??????????????</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink  tag={Link}  to='/indicator/search' className='font-weight-bold' active={ tabEnum.search === tabEnumValue}>
                    <span className='d-none d-md-block'>??????</span>
                    <span className='d-block d-md-none'>??????</span>
                  </NavLink>
                </NavItem>                */}
              </Nav>
            </div>
          </Collapse>
        </Navbar>
    //   </div>
    // </Card>
  )
}

export default indicatorHeader
