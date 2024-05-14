import axios from "axios";
import { PATH } from "@common/constant/Path";

const authAxios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

authAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      alert("세션이 만료되었습니다 다시 로그인해 주세요.");
      window.location.href = PATH.AUTH.LOGIN;
    }

    return Promise.reject(error);
  }
);

export default authAxios;
