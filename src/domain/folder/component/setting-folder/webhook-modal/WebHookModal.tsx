import Modal from "react-modal";
import WebHookSection from "./WebHookSection";
import { useWebHookModalStore } from "../../../../../store/webHookModalStore";

export default function WebHookModal() {

  const { isWebHookModalOpen, closeWebHookModal } = useWebHookModalStore();

  return (
    <div>
      <Modal 
        isOpen={isWebHookModalOpen}
        className="bg-transparent flex justify-center items-center h-full"
      >
        <div className="card w-6/12 h-5/6 bg-base-100 shadow-xl">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={closeWebHookModal}
          >
            ✕
          </button>
          <h3 className="font-bold text-lg">알림 웹 훅 추가</h3>

          <div className="flex md:flex-row flex-col gap-2">
            <WebHookSection />
          </div>
        </div>
      </Modal>
    </div>
  );
}