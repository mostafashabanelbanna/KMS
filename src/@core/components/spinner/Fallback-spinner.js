// ** Logo
import coloredLogo from '@src/assets/images/icons/coloredLogo.png'

const SpinnerComponent = () => {
  return (
    <div className='fallback-spinner vh-100'>
      <img className='fallback-logo' src={coloredLogo} alt='logo' height={90} />
      <div className='loading'>
        <div className='effect-1 effects'></div>
        <div className='effect-2 effects'></div>
        <div className='effect-3 effects'></div>
      </div>
    </div>
  )
}

export default SpinnerComponent
