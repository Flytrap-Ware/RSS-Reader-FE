import { API_PATH } from "@common/constant/ApiPath";
import authAxios from "@common/utill/ApiUtills";
import { Post } from "@domain/post/type/PostType";
import { create } from "zustand";

type PostModalStoreType = {
  modalId: string;
  postForModal?: Post;
  openPostModal: (post: Post) => void;
};

export const usePostModalStore = create<PostModalStoreType>((set, get) => ({
  modalId: "post_modal",
  postForModal: undefined,
  openPostModal: (post: Post) => {

    authAxios
      .get(API_PATH.POST.GET(post.id))
      .then(function (response) {
        if (response.status == 200) {
          const responsePost: Post = response.data.data;
          post.open = true;
          set({ postForModal: responsePost });

          (document.getElementById(get().modalId) as HTMLDialogElement).showModal()
        } else {
          set({ postForModal: undefined });
          throw new Error("Request failed: " + response.status);
        }
      })
      .catch((e) => {
        set({ postForModal: undefined });
        alert(e);
      });
  },
}));
