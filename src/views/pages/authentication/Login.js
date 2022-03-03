import { useState, useContext, Fragment, useEffect } from 'react'
import classnames from 'classnames'
import Avatar from '@components/avatar'
import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { toast, Slide } from 'react-toastify'
import { handleLogin } from '@store/actions/auth'
import { AbilityContext } from '@src/utility/context/Can'
import { Link, useHistory } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import { getHomeRouteForLoggedInUser, isObjEmpty } from '@utils'
import { Facebook, Twitter, Mail, GitHub, HelpCircle, Coffee } from 'react-feather'
import {
  Alert,
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Input,
  FormGroup,
  Label,
  CustomInput,
  Button,
  UncontrolledTooltip
} from 'reactstrap'

import { isLoading, isNotLoading } from '../../manageSystem/users/store/action'

import logo from '../../../assets/images/logo/logo.svg'

import '@styles/base/pages/page-auth.scss'
import { FormattedMessage, useIntl } from 'react-intl'
import ComponentSpinner from '../../../@core/components/spinner/Fallback-spinner'

const ToastContent = ({ name, role }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
        <h6 className='toast-title font-weight-bold'>Welcome, {name}</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span>You have successfully logged in as an {role} user to Vuexy. Now you can start to explore. Enjoy!</span>
    </div>
  </Fragment>
)

const Login = props => {
  const [skin, setSkin] = useSkin()
  const intl = useIntl()
  const ability = useContext(AbilityContext)
  const dispatch = useDispatch()
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(true)
 
  const { register, errors, handleSubmit } = useForm()
  const store = useSelector(state => state.users)

  // useEffect(() => {
  //   dispatch(isNotLoading())
  // }, [])
  
  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default
    const onSubmit = data => {
      if (isObjEmpty(errors)) {
        dispatch(isLoading())
        // debugger
        useJwt
        .login({ username, password })
        .then(res => {
          console.log(res)
          dispatch(isNotLoading())

          // debugger
          const data = { ...res.data.data.userData, accessToken: res.data.data.accessToken, refreshToken: res.data.data.refreshToken, expiration: res.data.data.expiration }
          dispatch(handleLogin(data))
          ability.update(res.data.data.userData.ability)
          history.push(getHomeRouteForLoggedInUser(data.role))
          toast.success(
            <ToastContent name={data.fullName || data.username || 'John Doe'} role={data.role || 'admin'} />,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
          )
        })
        .catch(err => {
          console.log('errrr', err)
          dispatch(isNotLoading())
        })
    }
  }

  return (
    <div className='auth-wrapper auth-v2'> 
      <Row className='auth-inner m-0'>
        <Link className='brand-logo align-items-center' to='/' onClick={e => e.preventDefault()}>
          <img src={logo}  height='46' />
          <h2 className='brand-text text-primary ml-1 mb-0'><FormattedMessage id="appFullName" /></h2>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login V2' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          {store.loading ?   <ComponentSpinner/> : (<Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='font-weight-bold mb-1'>
            <FormattedMessage id="Welcome Message" /> <FormattedMessage id="appFullName" /> 👋
            </CardTitle>
            <CardText className='mb-2'><FormattedMessage id="Login Message" /> </CardText>
            
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                  <FormattedMessage id="Username" />
                </Label>
                <Input
                  autoFocus
                  type='text'
                  value={username}
                  id='login-email'
                  name='login-email'
                  placeholder={intl.formatMessage({id: "Username"})}
                  onChange={e => setUsername(e.target.value)}
                  className={classnames({ 'is-invalid': errors['login-email'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
              </FormGroup>
              <FormGroup>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                   <FormattedMessage id="Password" />
                  </Label>
                  {/* <Link to='/forgot-password'>
                    <small>Forgot Password?</small>
                  </Link> */}
                </div>
                <InputPasswordToggle
                  value={password}
                  id='login-password'
                  name='login-password'
                  className='input-group-merge'
                  onChange={e => setPassword(e.target.value)}
                  className={classnames({ 'is-invalid': errors['login-password'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
              </FormGroup>
              {/* <FormGroup>
                <CustomInput type='checkbox' className='custom-control-Primary' id='remember-me' label='Remember Me' />
              </FormGroup> */}
              <Button.Ripple type='submit' color='primary' block>
                <FormattedMessage id="Login" />
              </Button.Ripple>
            </Form>
            {/* <p className='text-center mt-2'>
              <span className='mr-25'>New on our platform?</span>
              <Link to='/register'>
                <span>Create an account</span>
              </Link>
            </p> */}
            {/* <div className='divider my-2'>
              <div className='divider-text'>or</div>
            </div> */}
            {/* <div className='auth-footer-btn d-flex justify-content-center'>
              <Button.Ripple color='facebook'>
                <Facebook size={14} />
              </Button.Ripple>
              <Button.Ripple color='twitter'>
                <Twitter size={14} />
              </Button.Ripple>
              <Button.Ripple color='google'>
                <Mail size={14} />
              </Button.Ripple>
              <Button.Ripple className='mr-0' color='github'>
                <GitHub size={14} />
              </Button.Ripple>
            </div> */}
          </Col>) 
          }
      
         
        </Col>
      </Row>
    </div>
  )
}

export default Login
