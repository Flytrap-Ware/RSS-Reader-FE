import { API_PATH } from "@common/constant/ApiPath";
import BlogBox from "./BlogBox";
import { useState } from "react";
import authAxios from "@common/utill/ApiUtills";
import { useFoldersStore } from "@common/store/FoldersStore";
import { Blog, Folder } from "@domain/layout/type/SideBarType";

type Props = {
  folder?: Folder;
  setFolder: React.Dispatch<React.SetStateAction<Folder | undefined>>;
};

export default function SubscriptionSection({ folder, setFolder }: Props) {
  const { updateFolder } = useFoldersStore();
  const [newBlogUrl, setNewBlogUrl] = useState<string>("");

  const isBlogUrlEmpty = (): boolean => {
    return newBlogUrl !== undefined && newBlogUrl !== "";
  };

  const validBlogUrlLength = (): boolean => {
    return newBlogUrl.length <= 2500;
  };

  const alertInvalidBlogUrl = (): boolean => {
    if (!isBlogUrlEmpty()) {
      alert("구독할 블로그 주소를 입력하세요.");
      return false;
    }
    if (!validBlogUrlLength()) {
      alert("구독할 블로그 주소는 2,500글자 이내로 입력하세요.");
      return false;
    }
    return true;
  };

  const addBlog = () => {
    if (folder == undefined) {
      console.log("folder 정보가 없습니다.");
      return;
    }

    if (!alertInvalidBlogUrl()) {
      return;
    }

    authAxios
      .post(API_PATH.FOLDER.SUBSCRIPTION.ADD(folder.id), {
        blogUrl: newBlogUrl,
      })
      .then(function (response) {
        if (response.status != 201) {
          return;
        }

        const responseData = response.data.data;
        const newBlog: Blog = {
          id: responseData.subscribeId,
          title: responseData.subscribeTitle,
          unreadCount: responseData.unreadCount,
        };
        folder.blogs.push(newBlog);

        const newFolder: Folder = {
          id: folder.id,
          name: folder.name,
          unreadCount: folder.unreadCount,
          blogs: folder.blogs,
          invitedMembers: folder.invitedMembers,
          isOpen: folder.isOpen,
        };

        updateFolder(newFolder);
      });
  };

  const deleteBlog = (folderSubscriptionId: number) => {
    if (!confirm("해당 블로그를 삭제하시겠습니까?")) return;

    if (folder == undefined) {
      console.log("folder 정보가 없습니다.");
      return;
    }

    authAxios
      .delete(API_PATH.FOLDER.SUBSCRIPTION.DELETE(folder.id, folderSubscriptionId))
      .then(function (response) {
        if (response.status != 204) {
          return;
        }

        const newBlogs: Blog[] = folder.blogs.filter(
          (blog) => blog.id !== folderSubscriptionId
        );
        const newFolder: Folder = {
          id: folder.id,
          name: folder.name,
          unreadCount: folder.unreadCount,
          blogs: newBlogs,
          invitedMembers: folder.invitedMembers,
          isOpen: folder.isOpen,
        };
        setFolder(newFolder);

        updateFolder(newFolder);
      });
  };

  return (
    <div className="md:w-3/5 w-full">
      <h1 className="text-left text-lg font-bold mt-4 px-2">구독 관리</h1>
      <div className="flex gap-1 mb-4">
        <input
          type="text"
          placeholder="추가할 폴더 이름을 입력해주세요."
          className="input input-bordered input-primary w-full"
          onChange={(e) => setNewBlogUrl(e.target.value)}
        />
        <button className="btn btn-square btn-secondary" onClick={addBlog}>
          +
        </button>
      </div>
      <div className="flex flex-col">
        <div className="border-2 border-success bg-green-50 rounded-box gap-2">
          {folder &&
            folder.blogs.map((blog: Blog, index: number) => (
              <BlogBox key={index} blog={blog} deleteHandler={deleteBlog} />
            ))}
        </div>
      </div>
    </div>
  );
}
