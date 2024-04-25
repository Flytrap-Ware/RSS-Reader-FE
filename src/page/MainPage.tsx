import { ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SubscriptionPostListContent from "../domain/post/component/SubscriptionPostListContent";
import { Pages } from "../constants/Pages";
import FolderSettingContent from "../domain/folder/component/FolderSettingContent";
import { API_PATH } from "../constants/ApiPath";
import { PATH } from "../constants/Path";
import { StoredMemberInfo } from "../domain/auth/type/AuthType";
import Header from "../domain/layout/component/header/Header";
import authAxios from "../utill/ApiUtills";
import { useFoldersStore } from "../store/store";
import AllPostListContent from "../domain/post/component/AllPostListContent";
import BookmarkListContent from "../domain/post/component/BookmarkListContent";
import FolderPostListContent from "../domain/post/component/FolderPostListContent";
import Layout from "../domain/layout/component/Layout";

type Props = {
  page: Pages;
};

export default function MainPage({ page }: Props) {
  const location = useLocation();
  let headerTitle = page;
  let content: ReactNode;
  let key: number = 0;

  const { setPrivateFolders, setSharedFolders, isEmpty } = useFoldersStore();
  const [memberInfo, setMemberInfo] = useState<StoredMemberInfo | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedMemberInfo = localStorage.getItem('MEMBER_INFO');
    if (storedMemberInfo) {
      setMemberInfo(JSON.parse(storedMemberInfo));
    } else {
      navigate(PATH.AUTH.LOGIN);
      alert('로그인이 필요한 페이지 입니다.');
      return;
    }

    if (isEmpty()) {
      authAxios
        .get(API_PATH.FOLDER.GET_ALL)
        .then(function (response) {
          if (response.status == 200) {
            const folders = response.data.data.folders;
            setPrivateFolders(folders.PRIVATE);
            setSharedFolders(folders.SHARED);
          } else {
            throw new Error("Request failed: " + response.status);
          }
        });
    }

  }, [navigate, setPrivateFolders, setSharedFolders]);

  switch (page) {
    case Pages.ALL_POST: {
      content = <AllPostListContent />;
      break;
    }
    case Pages.BOOKMARK: {
      content = <BookmarkListContent />;
      break;
    }
    case Pages.FOLDER: {
      const data = location.state;
      headerTitle = data.folderTitle;
      key = data.folderId;
      content = (
        <FolderPostListContent key={key} folderId={data.folderId} />
      );
      break;
    }
    case Pages.SUBSCRIPTION: {
      const data = location.state;
      headerTitle = data.subscriptionTitle;
      key = data.subscriptionId;
      content = (
        <SubscriptionPostListContent key={key} subscriptionId={data.subscriptionId} />
      );
      break;
    }
    case Pages.SET_FOLDERS: {
      content = (
        <FolderSettingContent />
      );
      break;
    }
  }

  return (
    <>
      <Layout>
        <Header title={headerTitle} memberInfo={memberInfo} setMemberInfo={setMemberInfo} />
        {content}
      </Layout>
    </>
  );
}
