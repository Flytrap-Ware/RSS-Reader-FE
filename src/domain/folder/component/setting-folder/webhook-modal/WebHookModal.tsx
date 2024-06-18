import { useWebHookModalStore } from "@common/store/WebHookModalStore";
import WebHookSection from "./WebHookSection";

export default function WebHookModal() {

  const { modalId } = useWebHookModalStore();

  return (
    <>
      <dialog id={modalId} className="modal ">
        <div className="modal-box w-6/12 h-5/6 max-w-full">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-2xl">알림 웹 훅 추가</h3>
          <div className="flex md:flex-row flex-col gap-2">
            <WebHookSection />
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
