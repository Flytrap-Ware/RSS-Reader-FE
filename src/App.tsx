import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.css";
import "./PostContent.css";
import LoginPage from './page/auth/LoginPage';
import GitHubCallbackPage from './page/auth/GitHubCallbackPage';
import { PATH } from './constants/Path';
import AdminLoginCallbackPage from './page/auth/AdminLoginCallbackPage';
import MainPage from './page/MainPage';
import { Pages } from './constants/Pages';

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
