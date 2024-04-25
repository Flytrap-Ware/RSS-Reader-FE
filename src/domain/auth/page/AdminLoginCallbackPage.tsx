import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../common/constant/Path";
import { API_PATH } from "../../../common/constant/ApiPath";
import { StoredMemberInfo } from "../type/AuthType";

export default function AdminLoginCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post(import.meta.env.VITE_BASE_URL + API_PATH.AUTH.ADMIN_LOGIN, {
        code: import.meta.env.VITE_ADMIN_LOGIN_CODE
      }, {
        withCredentials: true
      })
      .then(function (response) {
        if (response.status == 201) {
            const responseData: StoredMemberInfo = response.data.data;
            localStorage.setItem('MEMBER_INFO', JSON.stringify(responseData));
            
            navigate(PATH.MAIN);
        } else {
            throw new Error('Authentication failed');
        }
      })
      .catch(function (error) {
        console.log('error: {}', error)
        navigate(PATH.AUTH.LOGIN);
      });

  }, [navigate]);

  return <div></div>;
}
