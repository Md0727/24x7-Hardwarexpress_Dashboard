/** Icons are imported separatly to reduce build time */
import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon'
import BoltIcon from '@heroicons/react/24/outline/BoltIcon'
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon'
import InboxArrowDownIcon from '@heroicons/react/24/outline/InboxArrowDownIcon'
import { VscVerifiedFilled } from "react-icons/vsc";
import { FaHireAHelper, FaServicestack, FaUserFriends } from "react-icons/fa";
import { MdMiscellaneousServices, MdOutlineDisabledVisible, MdPending, MdSyncDisabled, MdVerifiedUser } from "react-icons/md";
import { FaAccusoft } from "react-icons/fa";
import { FaTableColumns } from "react-icons/fa6";
import { FaHotjar } from "react-icons/fa";
import { jwtDecode } from 'jwt-decode'

const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`

var token = JSON.parse(sessionStorage.getItem("data"))
const decodedToken = jwtDecode(token);
// console.log('decodedToken', decodedToken)
const { moverAndPackerService, furnitureService, appliancesService } = decodedToken;

// let moverAndPackerService = false;
// let furnitureService = false;
// let appliancesService = false;

const routes = [];

if ((moverAndPackerService && furnitureService && appliancesService) || (moverAndPackerService && furnitureService) || (moverAndPackerService && appliancesService)) {
  routes.push(
    {
      path: '/app/dashboard',
      icon: <Squares2X2Icon className={iconClasses} />,
      name: 'Dashboard',
    },
    {
      path: '/app/order', // url
      icon: <InboxArrowDownIcon className={iconClasses} />, // icon component
      name: 'Order', // name that appear in Sidebar
    },
    {
      path: '/app/service-area', // url
      icon: <FaServicestack className={iconClasses} />, // icon component
      name: 'Service Area', // name that appear in Sidebar
    },
    {
      path: '/app/service-request', // url
      icon: <MdMiscellaneousServices className={iconClasses} />, // icon component
      name: 'Service Request', // name that appear in Sidebar
    },
    {
      path: '/app/total-quotes', // url
      icon: <FaAccusoft className={iconClasses} />, // icon component
      name: 'Total Quotes', // name that appear in Sidebar
    },
    {
      path: '/app/aproved-quotes', // url
      icon: <FaTableColumns className={iconClasses} />, // icon component
      name: 'Aproved Quotes', // name that appear in Sidebar
    },
    {
      path: '/app/transactions', // url
      icon: <CurrencyDollarIcon className={iconClasses} />, // icon component
      name: 'Transactions', // name that appear in Sidebar
    },
    {
      path: '/app/product', // url
      icon: <BoltIcon className={iconClasses} />, // icon component
      name: 'Product', // name that appear in Sidebar
    },
    {
      path: '/app/hot-deals', // url
      icon: <FaHotjar className={iconClasses} />, // icon component
      name: 'Hot Deals', // name that appear in Sidebar
    },
    {
      path: '/app/need-help', // url
      icon: <Cog6ToothIcon className={iconClasses} />, // icon component
      name: 'Need Help', // name that appear in Sidebar
    },
  )
} else if ((furnitureService && appliancesService) || (furnitureService) || (appliancesService)) {
  routes.push(
    {
      path: '/app/dashboard',
      icon: <Squares2X2Icon className={iconClasses} />,
      name: 'Dashboard',
    },
    {
      path: '/app/order', // url
      icon: <InboxArrowDownIcon className={iconClasses} />, // icon component
      name: 'Order', // name that appear in Sidebar
    },
    {
      path: '/app/product', // url
      icon: <BoltIcon className={iconClasses} />, // icon component
      name: 'Product', // name that appear in Sidebar
    },
    {
      path: '/app/transactions', // url
      icon: <CurrencyDollarIcon className={iconClasses} />, // icon component
      name: 'Transactions', // name that appear in Sidebar
    },
    {
      path: '/app/hot-deals', // url
      icon: <FaHotjar className={iconClasses} />, // icon component
      name: 'Hot Deals', // name that appear in Sidebar
    },
    {
      path: '/app/need-help', // url
      icon: <Cog6ToothIcon className={iconClasses} />, // icon component
      name: 'Need Help', // name that appear in Sidebar
    }
  )
} else if(moverAndPackerService) {
  routes.push(
    {
      path: '/app/dashboard',
      icon: <Squares2X2Icon className={iconClasses} />,
      name: 'Dashboard',
    },
    {
      path: '/app/service-area', // url
      icon: <FaServicestack className={iconClasses} />, // icon component
      name: 'Service Area', // name that appear in Sidebar
    },
    {
      path: '/app/service-request', // url
      icon: <MdMiscellaneousServices className={iconClasses} />, // icon component
      name: 'Service Request', // name that appear in Sidebar
    },
    {
      path: '/app/total-quotes', // url
      icon: <FaAccusoft className={iconClasses} />, // icon component
      name: 'Total Quotes', // name that appear in Sidebar
    },
    {
      path: '/app/aproved-quotes', // url
      icon: <FaTableColumns className={iconClasses} />, // icon component
      name: 'Aproved Quotes', // name that appear in Sidebar
    },
    {
      path: '/app/transactions', // url
      icon: <CurrencyDollarIcon className={iconClasses} />, // icon component
      name: 'Transactions', // name that appear in Sidebar
    },
    {
      path: '/app/need-help', // url
      icon: <Cog6ToothIcon className={iconClasses} />, // icon component
      name: 'Need Help', // name that appear in Sidebar
    }
  )
}else if(decodedToken?.role === "Admin"){
  routes.push(
    {
      path: '/app/dashboard',
      icon: <Squares2X2Icon className={iconClasses} />,
      name: 'Dashboard',
    },
    {
      path: '/app/aproved-quotes', // url
      icon: <VscVerifiedFilled className={iconClasses} />, // icon component
      name: 'Aproved Quotes', // name that appear in Sidebar
    },
    // {
    //   path: '/app/vendor', // url
    //   icon: <FaAccusoft className={iconClasses} />, // icon component
    //   name: 'All Vendors', // name that appear in Sidebar
    // },
    {
      path: '/app/vendor', // url
      icon: <MdPending className={iconClasses} />, // icon component
      name: 'Pending Vendors', // name that appear in Sidebar
    },
    {
      path: '/app/approve-vendor', // url
      icon: <MdVerifiedUser color='#000' className={iconClasses} />, // icon component
      name: 'Approved Vendors', // name that appear in Sidebar
    },
    {
      path: '/app/disable-vendor', // url
      icon: <MdSyncDisabled className={iconClasses} />, // icon component
      name: 'Disable Vendors', // name that appear in Sidebar
    },
    {
      path: '/app/rejected-vendor', // url
      icon: <MdOutlineDisabledVisible className={iconClasses} />, // icon component
      name: 'Rejected Vendors', // name that appear in Sidebar
    },
    {
      path: '/app/users', // url
      icon: <FaUserFriends className={iconClasses} />, // icon component
      name: 'All Users', // name that appear in Sidebar
    },
    {
      path: '/app/trending-deals', // url
      icon: <FaUserFriends className={iconClasses} />, // icon component
      name: 'Add Slider Image', // name that appear in Sidebar
    },
    {
      path: '/app/transactions', // url
      icon: <CurrencyDollarIcon className={iconClasses} />, // icon component
      name: 'Transactions', // name that appear in Sidebar
    },
    {
      path: '/app/help-query', // url
      icon: <FaHireAHelper className={iconClasses} />, // icon component
      name: 'Help Query', // name that appear in Sidebar
    },
  )
}

export default routes


