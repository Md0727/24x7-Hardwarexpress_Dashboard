import axios from "axios";
import ClearSession from "./ClearSession";

export const BASEURL = 'https://api.24x7hardwarexpress.in';
// export const BASEURL = 'http://65.0.185.50:3000';
const APIAdmin = `${BASEURL}/api/admin/`;
const APIRoute = `${BASEURL}/api/`;

export const ApiUrl = {
  // 24*7 API route ==========================
  signup: `${APIAdmin}signup`,
  accountVerification: `${APIAdmin}account/verification`,
  login: `${APIAdmin}login`,
  forgotPassword: `${APIRoute}user/forgot/password`,
  resetPassword: `${APIAdmin}reset/password`,
  profile_updated: `${APIRoute}user/update/profile`,

   // Image upload api route ===========
   uploadiImage: `${APIRoute}product/image/upload`,

  //  order api end point
   getAllOrder: `${APIRoute}order/get/all`,

  // update profile ==========
  updateProfile: `${APIAdmin}user/update/profile`,
  getUserDetails: `${APIAdmin}user/get/details`,
  vendorUploadImage: `${APIRoute}upload/image`,

  // feedback api route =========
  feedbackAdd: `${APIAdmin}feedback/add`,

  // update status api route =============
  changeStatus: `${APIAdmin}quotation/change/status`,
  
  // category api route ==============
  addCategoryRoute: `${APIRoute}category/add`,
  getCategoryAllRoute: `${APIRoute}category/get/all`,
  deleteCategoryAllRoute: `${APIRoute}category/delete/`,
  
  // product relative api end point route =========
  addProduct: `${APIRoute}product/add`,
  getAllProduct: `${APIAdmin}product/get/all`,
  deleteProduct: `${APIAdmin}product/delete/`,
  
  // product relative api end point route =========
  helpQueryAdd: `${APIAdmin}help/query/add`,
  trendingAdd: `${APIRoute}trending/add`,
  trendinGetAll: `${APIRoute}trending/get/all`,
  trendinDelete: `${APIRoute}trending/delete/`,

  
  // order transaction table ==============
  viewDetails: `${APIRoute}order/view/details`,
  changeStatus: `${APIRoute}order/change/status`,
  admin_changeStatus: `${APIAdmin}admin/change/status`,
  
  // upload csv file api end point ============
  uploadCSV: `${APIAdmin}product/upload/csv`,
  uploadBrochure: `${APIAdmin}upload/new/brochure`,
  
  // profile api route end points ============
  getProfileVendor: `${APIAdmin}user/get/details`,
  
  // Get Transaction api route end point ==================
  transaction_get: `${APIAdmin}transaction/get/all`,
  get_Count: `${APIAdmin}get/all/count`,
  get_admin_approved_quotation: `${APIAdmin}quotation/approved/get/for/admin`,
  get_all_vendor: `${APIAdmin}admin/vendor/get/all`,
  get_all_users: `${APIAdmin}user/get/all`,
  delete_vendor: `${APIAdmin}delete/user`,
  
  // ADD Banner api route end point ==================
  add_Hero_banners: `${APIRoute}banner/add`,
  get_Hero_banners: `${APIRoute}banner/get/all`,
  Get_Help_Query: `${APIAdmin}help/query/get/all`,
  bannerDelete: `${APIRoute}banner/delete/`,
  
  // add tag and category api route end point ==================
  getProductsType: `${APIAdmin}product/user/get/product/type`,
  getProductsTags: `${APIAdmin}product/user/get/product/tags`,

};

export const APIRequest = async (config = {}, onSuccess, onError, noAuth = null) => {

  const token = JSON.parse(sessionStorage?.getItem('data'));

  try {
    let data = {};
    if (token && noAuth == null) {
      data = {
        method: config.method,
        url: config.url,
        data: config.body,
        // timeout: 180000, // Wait for 5 seconds
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
    } else {
      data = {
        method: config.method,
        url: config.url,
        data: config.body,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
    }
    // console.log(data);
    axios(data)
      .then(res => {
        // console.log(res, 'api--------');
        if (!res?.data?.error) {
          onSuccess(res?.data);
        } else {
          if (res?.data?.message === 'Token expired please login again.') {
            ClearSession()
            window.location.reload();
          }
          onError(res?.data ? res.data : res);
        }
      })
      .catch(err => {
        console.log(err, 'catch--');
        if (err?.response?.data?.message === 'message.') {
          ClearSession()
          window.location.reload();
        }
        onError(err?.response?.data ? err?.response.data : err?.response);
      });
  } catch (error) {
    console.log("error", error);
  }
};

export const APIRequestWithFile = async (config = {}, onSuccess, onError) => {
  const token = JSON.parse(sessionStorage?.getItem("data"));

  try {
    let data;
    if (token) {
      data = {
        method: config.method,
        url: config.url,
        data: config.body,
        headers: {
          Accept: 'multipart/form-data',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };
    } else {
      data = {
        method: config.method,
        url: config.url,
        data: config.body,
        headers: {
          Accept: 'multipart/form-data',
          'Content-Type': 'multipart/form-data',
        },
      };
    }

    console.log('config', data);
    axios(data)
      .then(res => {
        if (res.status == 200 || res.status == 201) {
          console.log(res.data);
          onSuccess(res.data);
        }
      })
      .catch(err => {
        onError(err?.response);
      });
  } catch (error) {
    console.log(error);
  }
};


export const Statelist = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Orissa',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Tripura',
  'Uttarakhand',
  'Uttar Pradesh',
  'West Bengal',
  'Tamil Nadu',
  'Tripura',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli',
  'Daman and Diu',
  'Delhi',
  'Lakshadweep',
  'Pondicherry',
]

export const StatelistCode = [
  { State: 'Andhra Pradesh', Abbreviation: 'AP' },
  { State: 'Arunachal Pradesh', Abbreviation: 'AR' },
  { State: 'Assam', Abbreviation: 'AS' },
  { State: 'Bihar', Abbreviation: 'BR' },
  { State: 'Chhattisgarh', Abbreviation: 'CG' },
  { State: 'Goa', Abbreviation: 'GA' },
  { State: 'Gujarat', Abbreviation: 'GJ' },
  { State: 'Haryana', Abbreviation: 'HR' },
  { State: 'Himachal Pradesh', Abbreviation: 'HP' },
  { State: 'Jammu and Kashmir', Abbreviation: 'JK' },
  { State: 'Jharkhand', Abbreviation: 'JH' },
  { State: 'Karnataka', Abbreviation: 'KA' },
  { State: 'Kerala', Abbreviation: 'KL' },
  { State: 'Madhya Pradesh', Abbreviation: 'MP' },
  { State: 'Maharashtra', Abbreviation: 'MH' },
  { State: 'Manipur', Abbreviation: 'MN' },
  { State: 'Meghalaya', Abbreviation: 'ML' },
  { State: 'Mizoram', Abbreviation: 'MZ' },
  { State: 'Nagaland', Abbreviation: 'NL' },
  { State: 'Orissa', Abbreviation: 'OR' },
  { State: 'Punjab', Abbreviation: 'PB' },
  { State: 'Rajasthan', Abbreviation: 'RJ' },
  { State: 'Sikkim', Abbreviation: 'SK' },
  { State: 'Tamil Nadu', Abbreviation: 'TN' },
  { State: 'Tripura', Abbreviation: 'TR' },
  { State: 'Uttarakhand', Abbreviation: 'UK' },
  { State: 'Uttar Pradesh', Abbreviation: 'UP' },
  { State: 'West Bengal', Abbreviation: 'WB' },
  { State: 'Tamil Nadu', Abbreviation: 'TN' },
  { State: 'Tripura', Abbreviation: 'TR' },
  { State: 'Andaman and Nicobar Islands', Abbreviation: 'AN' },
  { State: 'Chandigarh', Abbreviation: 'CH' },
  { State: 'Dadra and Nagar Haveli', Abbreviation: 'DH' },
  { State: 'Daman and Diu', Abbreviation: 'DD' },
  { State: 'Delhi', Abbreviation: 'DL' },
  { State: 'Lakshadweep', Abbreviation: 'LD' },
  { State: 'Pondicherry', Abbreviation: 'PY' }
];
