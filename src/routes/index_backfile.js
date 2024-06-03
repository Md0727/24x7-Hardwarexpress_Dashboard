// All components mapping with path for internal routes

import { jwtDecode } from 'jwt-decode'
import { lazy } from 'react'
const Dashboard = lazy(() => import('../pages/protected/Dashboard'))
const Welcome = lazy(() => import('../pages/protected/Welcome'))
const Page404 = lazy(() => import('../pages/protected/404'))
const Blank = lazy(() => import('../pages/protected/Blank'))
const Customer = lazy(() => import('../pages/protected/Customer'))
const Order = lazy(() => import('../pages/protected/Order'))
const AddServiceArea = lazy(() => import('../pages/protected/AddServiceArea'))
const HotDeals = lazy(() => import('../pages/protected/HotDeals'))
const Product = lazy(() => import('../pages/protected/Product'))
const ServiceArea = lazy(() => import('../pages/protected/ServiceArea'))
const ServiceRequest = lazy(() => import('../pages/protected/ServiceRequest'))
const TotalQuotes = lazy(() => import('../pages/protected/TotalQuotes'))
const AprovedQuotes = lazy(() => import('../pages/protected/AprovedQuotes'))
const NeedHelp = lazy(() => import('../pages/protected/NeedHelp'))
const AddProduct = lazy(() => import('../pages/protected/AddProduct'))
const Calendar = lazy(() => import('../pages/protected/Calendar'))
const Team = lazy(() => import('../pages/protected/Team'))
const Transactions = lazy(() => import('../pages/protected/Transactions'))
const All_Vendors = lazy(() => import('../pages/protected/Super_Admin/All_Vendors/All_Vendors'))
const Approved_Vendor = lazy(() => import('../pages/protected/Super_Admin/Approved_Vendor/Approved_Vendor'))
const Disable_Vendor = lazy(() => import('../pages/protected/Super_Admin/Disable_Vendor/Disable_Vendor'))
const Rejected_Vendors = lazy(() => import('../pages/protected/Super_Admin/Rejected_Vendors/Rejected_Vendors'))
const All_User = lazy(() => import('../pages/protected/Super_Admin/All_User/All_User'))
const Trending_Deals = lazy(() => import('../pages/protected/Super_Admin/Trending_Deals/Trending_Deals'))
const Help_Query = lazy(() => import('../pages/protected/Super_Admin/Help_Query/Help_Query'))
const Bills = lazy(() => import('../pages/protected/Bills'))
const ProfileSettings = lazy(() => import('../pages/protected/ProfileSettings'))
const GettingStarted = lazy(() => import('../pages/GettingStarted'))
const DocFeatures = lazy(() => import('../pages/DocFeatures'))
const DocComponents = lazy(() => import('../pages/DocComponents'))


var token = JSON.parse(sessionStorage.getItem("data"))
const decodedToken = jwtDecode(token);
// console.log('decodedToken', decodedToken)
const { moverAndPackerService, furnitureService, appliancesService } = decodedToken;

const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/transactions',
    component: Transactions,
  },
  {
    path: '/product',
    component: Product,
  },
  {
    path: '/add-product',
    component: AddProduct,
  },
  {
    path: '/need-help',
    component: NeedHelp,
  },
  {
    path: '/settings-profile',
    component: ProfileSettings,
  },
  {
    path: '/users',
    component: All_User,
  },
  {
    path: '/trending-deals',
    component: Trending_Deals,
  },
  {
    path: '/404',
    component: Page404,
  },
];

if ((moverAndPackerService && furnitureService && appliancesService) || (moverAndPackerService && furnitureService) || (moverAndPackerService && appliancesService)) {
  routes.push(
    {
      path: '/order',
      component: Order,
    },
    {
      path: '/service-area',
      component: ServiceArea,
    },
    {
      path: '/service-request',
      component: ServiceRequest,
    },
    {
      path: '/add-service',
      component: AddServiceArea,
    },
    {
      path: '/total-quotes',
      component: TotalQuotes,
    },
    {
      path: '/aproved-quotes',
      component: AprovedQuotes,
    },
    {
      path: '/product',
      component: Product,
    },
    {
      path: '/hot-deals',
      component: HotDeals,
    },
    {
      path: '/add-product',
      component: AddProduct,
    },
    {
      path: '/need-help',
      component: NeedHelp,
    },
    {
      path: '/settings-profile',
      component: ProfileSettings,
    },
  )
} else if ((furnitureService && appliancesService) || (furnitureService) || (appliancesService)) {
  routes.push(
    {
      path: '/order',
      component: Order,
    },
    {
      path: '/product',
      component: Product,
    },
    {
      path: '/add-product',
      component: AddProduct,
    },
    {
      path: '/hot-deals',
      component: HotDeals,
    },
    {
      path: '/need-help',
      component: NeedHelp,
    },
    {
      path: '/settings-profile',
      component: ProfileSettings,
    },
  )
} else if (moverAndPackerService) {
  routes.push(
    {
      path: '/service-area',
      component: ServiceArea,
    },
    {
      path: '/add-service',
      component: AddServiceArea,
    },
    {
      path: '/service-request',
      component: ServiceRequest,
    },
    {
      path: '/total-quotes',
      component: TotalQuotes,
    },
    {
      path: '/aproved-quotes',
      component: AprovedQuotes,
    },
    {
      path: '/need-help',
      component: NeedHelp,
    },
    {
      path: '/settings-profile',
      component: ProfileSettings,
    },
  )
} else if (decodedToken?.role === "Admin") {
  routes.push(
    {
      path: '/aproved-quotes',
      component: AprovedQuotes,
    },
    // {
    //   path: '/app/vendor', // url
    //   icon: <FaAccusoft className={iconClasses} />, // icon component
    //   name: 'All Vendors', // name that appear in Sidebar
    // },
    {
      path: '/vendor',
      component: All_Vendors,
    },
    {
      path: '/approve-vendor',
      component: Approved_Vendor,
    },
    {
      path: '/disable-vendor',
      component: Disable_Vendor,
    },
    {
      path: '/rejected-vendor',
      component: Rejected_Vendors,
    },
    {
      path: '/users',
      component: All_User,
    },
    {
      path: '/trending-deals',
      component: Trending_Deals,
    },
    {
      path: '/settings-profile',
      component: ProfileSettings,
    },
    {
      path: '/help-query',
      component: Help_Query,
    },
  )
}

export default routes
