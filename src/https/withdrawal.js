/* eslint-disable no-undef */
/* src/axios.js */
// import Cookies from "js-cookie";
import axios from "axios";
import config from "./config";
// import router from "./router";

const $axios = axios.create({
  baseURL: config.withdrawalUrl, // Set api base url from .env
  // timeout: 30000, // default is `0` milliseconds (no timeout)
  headers: {
    // Accept: "application/json",
    //"Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "*, http://localhost:8080",
    // "Authorization": config.apiKey  ,
    // Set api key from .env
  },
});
// Add access token to header if any
// const accessToken = Cookies.get(config.accessTokenStorageKey);
const accessToken = localStorage.getItem('tura_token');
if (accessToken) {
  $axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
} else {
  $axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
//   delete $axios.defaults.headers.common["authorization"];
}

// Add a request interceptor
$axios.interceptors.request.use(
  function (axiosConfig) {
    NProgress.start();
    // Add access token to header before request is sent if any
    // const accessToken = Cookies.get(config.accessTokenStorageKey);
    const accessToken = localStorage.getItem('tura_token');
    if (accessToken) {
      axiosConfig.headers.Authorization = "Bearer " + accessToken;
    } else {
        $axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
    //   delete axiosConfig.headers.Authorization;
    }
    return axiosConfig;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
$axios.interceptors.response.use(
  function (response) {
    NProgress.done();
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  function (error) {
    NProgress.done();
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (error.response.data) {
      //place your re-entry code
      // router.push("/login");
    }
    //return Promise.reject(error);
    return Promise.reject(error.response);
  }
);

export default $axios;
