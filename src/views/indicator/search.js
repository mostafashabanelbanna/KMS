import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { AlignJustify, Rss, Info, Image, Users, Edit } from 'react-feather'
import { Card, CardImg, Collapse, Navbar, Nav, NavItem, NavLink, Button } from 'reactstrap'
import {getAllClassifications} from './store/action/index'
import IndicatorHeader from './header'

import {tabEnum} from './tabEnum'

const search = ({ props }) => {
  return (
      <>
      {<IndicatorHeader tabEnumValue={tabEnum.search} /> }
      <h2>Search</h2>
      
      </>
  )
}

export default search