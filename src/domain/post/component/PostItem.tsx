import { useState } from "react";
import { Icon } from "@common/component/Icon";
import { Post } from "../type/PostType";
import { API_PATH } from "@common/constant/ApiPath";
import authAxios from "@common/utill/ApiUtills";
import { usePostModalStore } from "@common/store/PostModalStore";

type Props = {
  key: number,
  post: Post,
};

const DESCRIPTION_MAX_LENGTH = 250;

export default function PostItem({ key, post }: Props) {
  const [isBookmark, setIsBookmark] = useState<boolean>(post.bookmark);
  const { openPostModal } = usePostModalStore();

  function convertHtmlToText(htmlString: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    const text = doc.body.textContent || "";

    if (text.length <= DESCRIPTION_MAX_LENGTH) {
      return text;
    } else {
      return text.substring(0, DESCRIPTION_MAX_LENGTH) + "...";
    }
  }

  const bookmarkHandler = (post: Post) => {
    if (isBookmark) {
        authAxios
          .delete(API_PATH.BOOKMARK.DELETE(post.id))
          .then(function (response) {
            if (response.status == 204) {
              setIsBookmark(false);
            } else {
              throw new Error("Request failed: " + response.status);
            }
          });
    } else {
        authAxios
          .post(API_PATH.BOOKMARK.ADD(post.id))
          .then(function (response) {
            if (response.status == 201) {
              setIsBookmark(true);
            } else {
              throw new Error("Request failed: " + response.status);
            }
          });
    }
  };

  return (
    <div key={key} className="card lg:card-side shadow-xl border p-4">
      <div className="flex-none flex items-center justify-center">
        <img
          src={post.thumbnailUrl}
          className="object-cover h-32 w-52 rounded-xl"
        />
      </div>
      <div className="flex-1 px-4" onClick={() => openPostModal(post)}>
        <p className="text-left text-sm text-gray-400">
          {post.subscriptionTitle} ({post.pubDate.substring(0, 10)})
        </p>
        <h2 className="card-title">{post.title}</h2>
        <p className="text-left">{convertHtmlToText(post.description)}</p>
      </div>
      <div className="flex flex-none space-x-2">
        <div>{post.open ? <Icon name="view" /> : undefined}</div>
        <div onClick={() => bookmarkHandler(post)}>
          {isBookmark ? <Icon name="bookmarkFill" /> : <Icon name="bookmark" />}
        </div>
      </div>
    </div>
  );
}
