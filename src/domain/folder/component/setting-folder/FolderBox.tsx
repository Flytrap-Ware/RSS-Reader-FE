import { useWebHookModalStore } from "@common/store/WebHookModalStore";
import { Icon } from "@common/component/Icon";
import { Folder } from "@domain/layout/type/SideBarType";

type Props = {
  folder: Folder;
  setFolderForModal: React.Dispatch<React.SetStateAction<Folder | undefined>>;
  deleteHandler: (folderId: number) => void;
};

export default function FolderBox({
  folder,
  setFolderForModal,
  deleteHandler
}: Props) {
  const { openWebHookModal } = useWebHookModalStore();

  const openFolderModal = () => {
    setFolderForModal(folder);
    (document.getElementById('folder_modal') as HTMLDialogElement).showModal()
  };

  return (
    <div
      className="h-10 flex items-center hover:bg-success rounded-lg"
    >
      <div className="flex flex-1" onClick={openFolderModal}>
        <div className="flex-none w-1/12 mx-3">
          <Icon name="folder" size="L" />
        </div>
        <div className="flex-1 w-full text-lg text-left">{folder.name}</div>
      </div>
      <div className="flex flex-none justify-center w-1/12" onClick={() => openWebHookModal(folder)}>
        <Icon name="alert" size="L" />
      </div>
      <div className="flex flex-none justify-center w-1/12" onClick={() => deleteHandler(folder.id)}>
        <Icon name="delete_left" size="L" />
      </div>
    </div>
  );
}
