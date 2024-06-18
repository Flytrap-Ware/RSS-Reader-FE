import MemberSection from "./member-section/MemberSection";
import SubscriptionSection from "./sbscription-section/SubscriptionSection";
import { Folder } from "@domain/layout/type/SideBarType";

type Props = {
  folder?: Folder;
  setFolder: React.Dispatch<React.SetStateAction<Folder | undefined>>;
};

export default function FolderModal({ folder, setFolder }: Props) {
  return (
    <>
      <dialog id="folder_modal" className="modal ">
        <div className="modal-box w-9/12 h-5/6 max-w-full">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-2xl">{folder?.name}</h3>
          <div className="flex md:flex-row flex-col gap-2">
            <SubscriptionSection folder={folder} setFolder={setFolder} />
            <MemberSection folder={folder} setFolder={setFolder} />
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
