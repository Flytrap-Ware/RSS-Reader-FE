import { usePostModalStore } from "@common/store/PostModalStore";

export default function PostModal() {

  const { modalId, postForModal } = usePostModalStore();

  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
      <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        <h3 className="font-bold text-4xl">{postForModal?.title}</h3>
        <p className="text-blue-500 hover:text-blue-700 cursor-pointer">
          <a href={postForModal?.guid} target="_blank">
            {postForModal?.guid}
          </a>
        </p>
        <p>{postForModal?.pubDate}</p>
        <div className="py-4">
          <div className="post-content-css"
            dangerouslySetInnerHTML={{ __html: postForModal?.description || '' }}
          >
        </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
          <button>close</button>
      </form>
    </dialog>
  );
}
