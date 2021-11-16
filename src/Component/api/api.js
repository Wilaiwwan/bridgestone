import axios from "axios";
import envInstants from "../../libs/configs/env";
import { useHistory } from "react-router-dom";

const apiExcept = "/api/users/login";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API,
});

instance.interceptors.response.use(
  (response) =>
    new Promise((resolve, reject) => {
      resolve(response);
    }),
  (error) => {
    if (!apiExcept) {
      if (error.response.status === 401) {
        console.log("test");
        const history = useHistory();

        localStorage.removeItem("token");
        history.push("/login");
        // window.location = "/login";
      } else {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
    }
  }
);

export default instance;

export function setDefaultURL(url) {
  console.log(url);

  axios.defaults.baseUrl = url;
}
