import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import notAuthImg from '@src/assets/images/pages/not-authorized.svg'
import { useIntl, FormattedMessage } from 'react-intl'

import '@styles/base/pages/page-misc.scss'

import logo from '../../../assets/images/logo/logo.svg'


const NotAuthorized = () => {
  const intl = useIntl()
  return (
    <div className='misc-wrapper'>
      <a className='brand-logo  d-flex align-items-center' href='/'>
      <img src={logo}  height='46' />
        <h2 className='brand-text text-primary  mb-0'><FormattedMessage id="appFullName" /></h2>
      </a>
      <div className='misc-inner p-2 p-sm-3'>
        <div className='w-100 text-center'>
          <h2 className='mb-1'> {intl.formatMessage({id: "You are not authorized"})} 🔐</h2>
          <p className='mb-2'>
            {/* The Webtrends Marketing Lab website in IIS uses the default IUSR account credentials to access the web pages
            it serves. */}
          </p>
          <Button tag={Link} to='/login' color='primary' className='btn-sm-block mb-1'>
            {intl.formatMessage({id: "Back to login"})} 
          </Button>
          <img className='img-fluid' src={notAuthImg} alt='Not authorized page' />
        </div>
      </div>
    </div>
  )
}
export default NotAuthorized
