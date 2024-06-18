import { API_PATH } from "@common/constant/ApiPath";
import { useFoldersStore } from "@common/store/FoldersStore";
import authAxios from "@common/utill/ApiUtills";
import { Folder } from "@domain/layout/type/SideBarType";
import FolderBox from "./FolderBox";

type Props = {
  title: string,
  folders: Folder[],
  setFolderForModal: React.Dispatch<React.SetStateAction<Folder | undefined>>, 
};

export default function FolderList({ 
  title, 
  folders, 
  setFolderForModal, 
}: Props) {
  const { deleteFolder } = useFoldersStore();

  const deleteFolderHandler = (folderId: number) => {
    if (!confirm("해당 폴더를 삭제하시겠습니까?")) return;

    authAxios
      .delete(API_PATH.FOLDER.DELETE(folderId))
      .then(function (response) {
        if (response.status != 204) {
          return;
        }
        
        deleteFolder(folderId);
      });
  }

  return (
    <>
      <h1 className="text-left text-lg font-bold mt-4 px-2">{title}</h1>
      <div className="border-2 border-success bg-green-50 rounded-box gap-2">
        {folders &&
          folders.map((folder: Folder, index: number) => (
            <FolderBox
              key={index}
              folder={folder}
              setFolderForModal={setFolderForModal}
              deleteHandler={deleteFolderHandler}
            />
          ))}
      </div>
    </>
  );
}
