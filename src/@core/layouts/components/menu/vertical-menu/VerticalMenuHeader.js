// ** React Imports
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

// ** Third Party Components
import { Disc, X, Circle } from 'react-feather'

// ** Config
import themeConfig from '@configs/themeConfig'

import Logo from "@src/assets/images/icons/Logo.png"

const VerticalMenuHeader = props => {
  // ** Props
  const { menuCollapsed, setMenuCollapsed, setMenuVisibility, setGroupOpen, menuHover } = props

  // ** Reset open group
  useEffect(() => {
    if (!menuHover && menuCollapsed) setGroupOpen([])
  }, [menuHover, menuCollapsed])

  // ** Menu toggler component
  const Toggler = () => {
    if (!menuCollapsed) {
      return (
        <Disc
          size={20}
          data-tour='toggle-icon'
          className='text-primary toggle-icon d-none d-xl-block'
          onClick={() => setMenuCollapsed(true)}
        />
      )
    } else {
      return (
        <Circle
          size={20}
          data-tour='toggle-icon'
          className='text-primary toggle-icon d-none d-xl-block'
          onClick={() => setMenuCollapsed(false)}
        />
      )
    }
  }

  return (
    <div className='navbar-header px-1'>
      <ul className='nav navbar-nav flex-row'>
        <li className='nav-item mx-0 w-100 d-flex justify-content-center align-items-center'>
          <NavLink to='/' className='navbar-brand flex-column mx-0'>
            <div className='brand-logo w-100 text-center'>
              <img src={Logo} alt='logo' />
            </div>
            <h2 className='brand-text mb-0 mt-1'>{themeConfig.app.appName}</h2>
          </NavLink>
        </li>
        <li className='nav-item nav-toggle d-lg-none'>
          <div className='nav-link modern-nav-toggle cursor-pointer'>
            <Toggler />
            <X onClick={() => setMenuVisibility(false)} className='toggle-icon icon-x d-block d-xl-none' size={20} />
          </div>
        </li>
      </ul>
    </div>
  )
}

export default VerticalMenuHeader
