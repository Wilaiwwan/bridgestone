import axios from "axios";
import envInstants from "../../libs/configs/env";

export default axios.create({
  baseURL: process.env.REACT_APP_BASE_API
});

export function setDefaultURL(url) {
  console.log(url);
  
  axios.defaults.baseUrl = url;
}

