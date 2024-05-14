import FolderList from "./FolderList";
import { API_PATH } from "@common/constant/ApiPath";
import { useState } from "react";
import FolderModal from "./folder-modal/FolderModal";
import authAxios from "@common/utill/ApiUtills";
import { useFoldersStore } from "@common/store/FoldersStore";
import WebHookModal from "./webhook-modal/WebHookModal";
import { Folder } from "@domain/layout/type/SideBarType";

export default function FolderSettingCard() {
  const { privateFolders, sharedFolders, addFolderToPrivateFolders } = useFoldersStore();
  const [newFolderName, setNewFolderName] = useState<string>("");
  const [isFolderModalOpen, setIsFolderModalOpen] = useState<boolean>(false);
  const [folderForModal, setFolderForModal] = useState<Folder | undefined>();

  const isFolderNameEmpty = (): boolean => {
    return newFolderName !== undefined && newFolderName !== "";
  };

  const validFolderNameLength = (): boolean => {
    return newFolderName.length <= 10;
  };

  const alertInvalidFolderName = (): boolean => {
    if (!isFolderNameEmpty()) {
      alert("폴더명을 입력하세요.");
      return false;
    }
    if (!validFolderNameLength()) {
      alert("폴더명은 10글자 이내로 입력하세요.");
      return false;
    }
    return true;
  };

  const addPrivateFolder = () => {
    if (!alertInvalidFolderName()) {
      return;
    }

    authAxios
      .post(API_PATH.FOLDER.ADD, {
        name: newFolderName,
      })
      .then(function (response) {
        if (response.status == 201) {
          const data = response.data.data;

          const newFolder: Folder = {
            id: data.folderId,
            name: data.folderName,
            unreadCount: 0,
            blogs: [],
            invitedMembers: [],
            isOpen: false,
          };

          addFolderToPrivateFolders(newFolder);
        } else {
          throw new Error("Request failed: " + response.status);
        }
      });
  };

  return (
    <div className="card w-full md:w-9/12 xl:w-6/12 bg-base-100 border shadow-xl p-4">
      <div className="card-body">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="추가할 폴더 이름을 입력해주세요."
            className="input input-bordered input-primary w-full"
            onChange={(e) => setNewFolderName(e.target.value)}
          />
          <button
            className="btn btn-square btn-secondary"
            onClick={addPrivateFolder}
          >
            +
          </button>
        </div>
        <div className="flex flex-col">
          <FolderList
            title={"개인 폴더"}
            folders={privateFolders}
            setFolderForModal={setFolderForModal}
            setIsFolderModalOpen={setIsFolderModalOpen}
          />
          <FolderList
            title={"공유 폴더"}
            folders={sharedFolders}
            setFolderForModal={setFolderForModal}
            setIsFolderModalOpen={setIsFolderModalOpen}
          />
        </div>
        <FolderModal
          isFolderModalOpen={isFolderModalOpen}
          setIsFolderModalOpen={setIsFolderModalOpen}
          folder={folderForModal}
          setFolder={setFolderForModal}
        />
        <WebHookModal />
      </div>
    </div>
  );
}
