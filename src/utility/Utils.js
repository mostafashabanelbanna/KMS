import swal from "sweetalert"
import { toast } from 'react-toastify'
import { store } from '../redux/storeConfig/store'
// import { FormattedMessage } from 'react-intl'


import axios from './../axios'
import Toastr from './../containers/toastr/Toastr'

import { IntlProvider, addLocaleData } from 'react-intl'

import { Arabic } from 'flatpickr/dist/l10n/ar.js'
// import { English } from 'flatpickr/dist/l10n/en.js'


const locale = 'en'
const intlProvider = new IntlProvider({ locale })
const { intl } = intlProvider // this is how you get access to the formatMessage function to use i18n for your messages


// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = obj => Object.keys(obj).length === 0

// ** Returns K format from a number
export const kFormatter = num => (num > 999 ? `${(num / 1000).toFixed(1)}k` : num)

// ** Converts HTML to string
export const htmlToString = html => html.replace(/<\/?[^>]+(>|$)/g, '')

// ** Checks if the passed date is today
const isToday = date => {
  const today = new Date()
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  )
}

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) => {
  if (!value) return value
  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value)
  let formatting = { month: 'short', day: 'numeric' }

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: 'numeric', minute: 'numeric' }
  }

  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */
export const isUserLoggedIn = () => localStorage.getItem('userData')
export const getUserData = () => JSON.parse(localStorage.getItem('userData'))

/**
 ** This function is used for demo purpose route navigation
 ** In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 ** Please note role field is just for showing purpose it's not used by anything in frontend
 ** We are checking role just for ease
 * ? NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = userRole => {
  if (userRole === 'admin') return '/'
  if (userRole === 'client') return '/access-control'
  return '/login'
}

// check wether user is authorized or not 
export const isAuthorized = err => {
 return err && (err === 401 || err === 403)
}

// get Input multiple selected options 
export const getSelected = event => {
  const opts = []
  let opt
  for (let i = 0, len = event.length; i < len; i++) {
    opt = event[i]
    
    opts.push(opt.value)
    // if (opt.va) {
    // }
  }
  return opts
} 

  // Convert  array to make objects keys compatible with react select
export const convertSelectArr = (originArr) => {
    const newArr = []
    if (originArr) {
      originArr.map(option => {
        const newObject = {}
        delete Object.assign(newObject,  {['value']: option['id'] }, {['label']: option['name'] })[option]
        newArr.push(newObject)
      })
    }
    
    return newArr
}

// ** React Select Theme Colors
export const selectThemeColors = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#7367f01a', // for option hover bg-color
    primary: '#7367f0', // for selected option bg-color
    neutral10: '#7367f0', // for tags bg-color
    neutral20: '#ededed', // for input border-color
    neutral30: '#ededed' // for input hover border-color
  }
})

// Check mood
export const isNotLightSkin = () => {
  // get current skin 
  const currentSkin = JSON.parse(localStorage.getItem("skin")) 
  // wether skin is light or not
  return currentSkin !== "light" 
}

export const notify = (type, message) => {
  return toast.success(
    <Toastr type={type} message={message} />,
    { position: toast.POSITION.TOP_CENTER,
      hideProgressBar: true 
    })
  }

// Add To Favorit

// export const addToFavorit = async (objectName, objectId) => {
//   await axios.post(`/Favorite/CreateFavorite`, {objectId, objectName})
//   .then(response => {
//     if (response.data.statusCode === 200) {
//       notify('success', `تمت الأضافة الى المفضلة`)
//       return true
//     } else {
//       notify('error', 'حدث خطأ ما')
//       return false
//     }
//   })
//   .catch(error => {
//      return false
//   })
// }


export function addToFavorit(objectName, objectId) {
  return new Promise(function (resolve, reject) {
    axios.post(`/Favorite/CreateFavorite`, {objectId, objectName}).then(
          (response) => {
            if (response.data.statusCode === 200) {
              notify('success', `تمت الأضافة الى المفضلة`)
              resolve(true)
            } else {
              notify('error', 'حدث خطأ ما')
              resolve(false)
            }
          },
              (error) => {
              reject(error)
          }
      )
  })
}

// Remove From Favorit

export function removeFromFavorit(objectName, objectId) {
  return new Promise(function (resolve, reject) {
    axios.post(`/Favorite/DeleteFavorite`, {objectId, objectName}).then(
          (response) => {
            if (response.data.statusCode === 200) {
              notify('success', `تم الحذف من المفضلة`)
              resolve(true)
            } else {
              notify('error', 'حدث خطأ ما')
              resolve(false)
            }
          },
            (error) => {
              notify('error', 'حدث خطأ ما')
              reject(error)
          }
      )
  })
}

export const confirmDelete = (deleteRow, rowId) => {

  swal("هل تريد حذف العنصر؟", {
    buttons: {
      catch: {
        text:  "نعم",
        value: "ok"
      },
      cancel: "لا"
    }
  })
  .then((value) => {
    switch (value) {
      case "ok":
        return store.dispatch(deleteRow(rowId))
        break

      default:
    }
  })
 }
 export const convertToBoolean = (value) => {
   if (value.length === undefined) {
     return value
   } else {
     return value.length === 1
   }
 }

 export const isAdmin = () => {
  const admin = localStorage?.getItem('userData')?.isAdmin
  return admin
 }

 export const isPermitted = (objectName, Function) => {
  const perms = JSON.parse(localStorage?.getItem('userData'))?.userPermissions
  //console.log(perms.filter(x => x.objectname === objectName))
  const arr = perms?.filter((x) => {
    return x.objectName === objectName
  })
  
  const funcs = arr?.length ? arr[0]?.functions : []

  const func = funcs?.filter((x) => {
    return x.functionName === Function
  })
  
  const perm = func.filter((x) => {
    return x.permissionValue === 0
  })
  
  const ret = (perm.length === 0)
  
  return ret 
 }

export const setPickerLanguage = (lang, intl) => {
  const months = [
    intl.formatMessage({id: "January"}),
    intl.formatMessage({id: "February"}), 
    intl.formatMessage({id: "March"}),
    intl.formatMessage({id: "April"}),
    intl.formatMessage({id: "May"}),
    intl.formatMessage({id: "June"}),
    intl.formatMessage({id: "July"}), 
    intl.formatMessage({id: "August"}), 
    intl.formatMessage({id: "September"}),
    intl.formatMessage({id: "October"}),
    intl.formatMessage({id: "November"}),
    intl.formatMessage({id: "December"})
  ]
  const arabicOptions = {
    locale: {
      ...Arabic,
      months: {
        ...Arabic.months,
        longhand: months
      }
    },
    dateFormat: 'd-m-Y',
    monthSelectorType: 'static',
    altFormat: "j F, Y",
    altInput: true
  }
  // const englishOptions = {
  //   locale: {
  //     ...English,
  //     months: {
  //       ...English.months,
  //       longhand: months
  //     }
  //   },
  //   dateFormat: 'd-m-Y',
  //   monthSelectorType: 'static',
  //   altFormat: "j F, Y",
  //   altInput: true
  // }

  return lang.locale === 'ar' ? arabicOptions :  "default"
}