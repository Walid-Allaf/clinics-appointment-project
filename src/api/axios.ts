import Axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export const getToken = () => {
  const TOKEN = Cookies.get("token");
  return TOKEN;
};

const axios = Axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Accept-Language": "en-US,en;q=0.9,ar-EG;q=0.8,ar;q=0.7,nl;q=0.6",
  },
});

axios.interceptors.request.use(
  function (config) {
    config.headers["key"] = `${process.env.NEXT_PUBLIC_BASE_KEY}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    console.log(response);
    return response;
  },
  function (error) {
    console.log(error);
    if (error.message === "Network Error") {
      toast.error(error.message);
    } else if (error.response.status === 404) {
    } else if (error.response.status === 401) {
    } else if (error.response.status === 403) {
    } else if (error.response.data) {
    }
    return Promise.reject(error);
  }
);

export default axios;
