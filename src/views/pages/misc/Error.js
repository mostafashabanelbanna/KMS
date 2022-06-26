import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import errorImg from '@src/assets/images/pages/error.svg'
import { useIntl, FormattedMessage } from 'react-intl'

import '@styles/base/pages/page-misc.scss'

import coloredLogo from '../../../assets/images/icons/coloredLogo.png'

const Error = () => {
  const intl = useIntl()

  return (
    <div className='misc-wrapper'>
      <a className='brand-logo d-flex align-items-center' href='/'>
        <img src={coloredLogo}  height='60' />
        <h2 className='brand-text text-primary  mb-0'><FormattedMessage id="appFullName" /></h2>
      </a>
      <div className='misc-inner p-2 p-sm-3'>
        <div className='w-100 text-center'>
          <h2 className='mb-1'> {intl.formatMessage({id: "Page Not Found"})}  🕵🏻‍♀️</h2>
          {/* <p className='mb-2'>Oops! 😖 The requested URL was not found on this server.</p> */}
          <Button tag={Link} to='/' color='primary' className='btn-sm-block mb-2'>
            {intl.formatMessage({id: "Back to home"})}
          </Button>
          <img className='img-fluid' src={errorImg} alt='Not authorized page' />
        </div>
      </div>
    </div>
  )
}
export default Error
