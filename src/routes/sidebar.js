/** Icons are imported separatly to reduce build time */
import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import BoltIcon from '@heroicons/react/24/outline/BoltIcon'
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon'
import InboxArrowDownIcon from '@heroicons/react/24/outline/InboxArrowDownIcon'
import { FaHireAHelper, FaUserFriends } from "react-icons/fa";
import { TbCategoryFilled } from "react-icons/tb";
import { FaHotjar } from "react-icons/fa";

const iconClasses = `h-6 w-6`
// const submenuIconClasses = `h-5 w-5`


const routes = [
  {
    path: '/app/dashboard',
    icon: <Squares2X2Icon className={iconClasses} />,
    name: 'Dashboard',
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
    path: '/app/order', // url
    icon: <InboxArrowDownIcon className={iconClasses} />, // icon component
    name: 'Order', // name that appear in Sidebar
  },
  {
    path: '/app/hot-deals', // url
    icon: <FaHotjar className={iconClasses} />, // icon component
    name: 'Hot Deals', // name that appear in Sidebar
  },
  {
    path: '/app/users', // url
    icon: <FaUserFriends className={iconClasses} />, // icon component
    name: 'All Users', // name that appear in Sidebar
  },
  {
    path: '/app/add-hero-slider', // url
    icon: <FaUserFriends className={iconClasses} />, // icon component
    name: 'Add Slider Image', // name that appear in Sidebar
  },
  {
    path: '/app/help-query', // url
    icon: <FaHireAHelper className={iconClasses} />, // icon component
    name: 'Help Query', // name that appear in Sidebar
  },
  {
    path: '/app/add-category', // url
    icon: <TbCategoryFilled className={iconClasses} />, // icon component
    name: 'Add Category', // name that appear in Sidebar
  },
];


export default routes


