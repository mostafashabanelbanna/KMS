import React from 'react'

// ** Third Party Components
import Avatar from '@components/avatar'
import { Check, X } from 'react-feather'

const Toastr = ({type, message}) => {
    return (<>
        <div className='toastify-header'>
          <div className='title-wrapper'>
            <Avatar size='sm' color={type === 'success' ? 'success' : 'danger'} icon={type === 'success' ? <Check size={12} /> : <X size={12}/>} />
            <h6 className='toast-title'>{message}</h6>
          </div>
         
        </div>
        {/* <div className='toastify-body'>
          <span role='img' aria-label='toast-text'>
            👋 Jelly-o macaroon brownie tart ice cream croissant jelly-o apple pie.
          </span>
        </div> */}
      </>)
}

export default Toastr