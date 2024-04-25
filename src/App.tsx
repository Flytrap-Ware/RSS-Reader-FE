import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.css";
import "./PostContent.css";
import { PATH } from './common/constant/Path';
import AdminLoginCallbackPage from './domain/auth/page/AdminLoginCallbackPage';
import MainPage from './common/page/MainPage';
import { Pages } from './common/constant/Pages';
import LoginPage from './domain/auth/page/LoginPage';
import GitHubCallbackPage from './domain/auth/page/GitHubCallbackPage';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={PATH.MAIN} element={<MainPage page={Pages.ALL_POST} />} />
          <Route path={PATH.BOOKMARK} element={<MainPage page={Pages.BOOKMARK} />} />
          <Route path={PATH.FOLDER} element={<MainPage page={Pages.FOLDER} />} />
          <Route path={PATH.SUBSCRIPTION} element={<MainPage page={Pages.SUBSCRIPTION} />} />
          <Route path={PATH.SETTING.FOLDERS} element={<MainPage page={Pages.SET_FOLDERS} />} />
          <Route path={PATH.AUTH.LOGIN} element={<LoginPage />} />
          <Route path={PATH.AUTH.CALLBACK} element={<GitHubCallbackPage />} />
          <Route path={PATH.AUTH.ADMIN_CALLBACK} element={<AdminLoginCallbackPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
