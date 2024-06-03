import { lazy } from 'react'
const Dashboard = lazy(() => import('../pages/protected/Dashboard'))
const Page404 = lazy(() => import('../pages/protected/404'))
const Order = lazy(() => import('../pages/protected/Order'))
const HotDeals = lazy(() => import('../pages/protected/HotDeals'))
const Product = lazy(() => import('../pages/protected/Product'))
const NeedHelp = lazy(() => import('../pages/protected/NeedHelp'))
const AddProduct = lazy(() => import('../pages/protected/AddProduct'))
const Transactions = lazy(() => import('../pages/protected/Transactions'))
const All_User = lazy(() => import('../pages/protected/Super_Admin/All_User/All_User'))
const AddHeroSlider = lazy(() => import('../pages/protected/Super_Admin/AddHeroSlider/AddHeroSlider'))
const Help_Query = lazy(() => import('../pages/protected/Super_Admin/Help_Query/Help_Query'))
const ProfileSettings = lazy(() => import('../pages/protected/ProfileSettings'))
const AddCategory = lazy(() => import('../pages/protected/AddCategory'))


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
    path: '/add-hero-slider',
    component: AddHeroSlider,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/need-help',
    component: NeedHelp,
  },
  {
    path: '/add-category',
    component: AddCategory,
  },
  {
    path: '/hot-deals',
    component: HotDeals,
  },
  {
    path: '/help-query',
    component: Help_Query,
  }
];

export default routes
