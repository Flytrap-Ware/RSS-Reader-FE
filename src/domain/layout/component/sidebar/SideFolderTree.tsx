import { useNavigate } from "react-router-dom";
import { Folder } from "../../type/SideBarType";
import { useFoldersStore } from "@common/store/FoldersStore";
import { PATH } from "@common/constant/Path";
import { Icon } from "@common/component/Icon";

type Props = {
  title?: string;
  folders: Folder[];
};

export default function SideFolderTree({ title, folders }: Props) {
  const { openFolder, closeFolder } = useFoldersStore();
  const navigate = useNavigate();
  const goToSusbscriptionPosts = (subscriptionId: number, subscriptionTitle: string) => {
    navigate(PATH.SUBSCRIPTION, {
      state: {
        subscriptionId: subscriptionId,
        subscriptionTitle: subscriptionTitle,
      },
    });
  };
  const goToFolderPosts = (folderId: number, folderTitle: string) => {
    navigate(PATH.FOLDER, {
      state: {
        folderId: folderId,
        folderTitle: folderTitle,
      },
    });
  };

  return (
    <>
      <div className="text-lg font-bold">{title || "이름 없음"}</div>

      <ul className="menu w-70 rounded-box">
        {folders && folders.length > 0 ? (
          folders.map((folder) => (
            <li>
              <span>
                <Icon name="folder" />
                <span onClick={() => goToFolderPosts(folder.id, folder.name)}>
                  {folder.name}
                </span>
                <span
                  onClick={
                    folder.isOpen
                      ? () => closeFolder(folder.id)
                      : () => openFolder(folder.id)
                  }
                >
                  {folder.isOpen ? "▲" : "▼"}
                </span>
              </span>
              <ul className={`menu-dropdown ${folder.isOpen ? 'menu-dropdown-show' : ''}`}>
                {folder.blogs.map((blog) => (
                  <li>
                    <a onClick={() => goToSusbscriptionPosts(blog.id, blog.title)}>
                      {blog.title}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))
        ) : (
          <li>
            <p>폴더가 없습니다.</p>
          </li>
        )}
      </ul>
    </>
  );
}
