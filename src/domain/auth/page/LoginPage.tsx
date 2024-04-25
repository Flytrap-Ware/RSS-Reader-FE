import styled from "styled-components";
import { Icon } from "../../common/component/Icon";

export default function LoginPage() {

  function goToGithub() {
    const url = import.meta.env.VITE_OAUTH_LOGIN_URL;
    window.location.href = url;
  }

  return (
    <LoginLayout>
      <LoginCard className="card w-96 bg-base-200">
        <button className="btn btn-neutral btn-wide" onClick={goToGithub}>
          <Icon name={'github_mark'} size={'L'}  />
          Github Login
        </button>
      </LoginCard>
    </LoginLayout>
  );
}

const LoginLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginCard = styled.div`
  justify-content: center;
  align-items: center;
`;