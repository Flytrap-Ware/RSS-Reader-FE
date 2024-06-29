import MemberBox from "./MemberBox";
import { API_PATH } from "@common/constant/ApiPath";
import { useState } from "react";
import MemberSearchList from "./MemberSearchList";
import authAxios from "@common/utill/ApiUtills";
import { useFoldersStore } from "@common/store/FoldersStore";
import { Folder, InvitedMember } from "@domain/layout/type/SideBarType";

type Props = {
  folder?: Folder;
  setFolder: React.Dispatch<React.SetStateAction<Folder | undefined>>;
};

export default function MemberSection({ folder, setFolder }: Props) {
  const { updateFolder } = useFoldersStore();
  const [newMemberName, setNewMemberName] = useState<string>("");
  const [memberDropDownView, setMemberDropDownView] = useState<boolean>(false);
  const [searchedMembers, setSearchedMembers] = useState<InvitedMember[]>([]);

  const isNewMemberNameEmpty = (): boolean => {
    return newMemberName !== undefined && newMemberName !== "";
  };

  const validNewMemberNameLength = (): boolean => {
    return newMemberName.length <= 255;
  };

  const alertInvalidNewMemberName = (): boolean => {
    if (!isNewMemberNameEmpty()) {
      alert("추가할 멤버 이름을 입력하세요.");
      return false;
    }
    if (!validNewMemberNameLength()) {
      alert("추가할 멤버 이름은 255글자 이내로 입력하세요.");
      return false;
    }
    return true;
  };

  const searchMembers = (memberName: string) => {
    setNewMemberName(memberName);

    authAxios
      .get(API_PATH.MEMBER.GET_ALL_BY_NAME(memberName))
      .then(function (response) {
        if (response.status != 200) {
          return;
        }

        const responseData: InvitedMember[] = response.data.data.memberSummary;
        setSearchedMembers(responseData);

        if (responseData.length == 0) {
          setMemberDropDownView(false);
        } else {
          setMemberDropDownView(true);
        }
      });
  };

  const addMember = (inviteeId: number) => {
    if (folder == undefined) {
      console.log("folder 정보가 없습니다.");
      return;
    }

    if (!alertInvalidNewMemberName()) {
      return;
    }

    authAxios
      .post(API_PATH.FOLDER.MEMBER.ADD(folder.id), {
        inviteeId: inviteeId,
      })
      .then(function (response) {
        if (response.status != 201) {
          return;
        }

        const responseData = response.data.data;
        const newMember: InvitedMember = {
          id: responseData.id,
          name: responseData.name,
          profile: responseData.profile,
        };
        folder.invitedMembers.push(newMember);

        const newFolder: Folder = {
          id: folder.id,
          name: folder.name,
          unreadCount: folder.unreadCount,
          blogs: folder.blogs,
          invitedMembers: folder.invitedMembers,
          isOpen: folder.isOpen,
        };

        updateFolder(newFolder);

        setNewMemberName("");
        setMemberDropDownView(false);
        setSearchedMembers([]);
      })
      .catch(function (error) {
        alert(error.response.data.message);
      });
  };

  const deleteMember = (memberId: number) => {
    if (!confirm("해당 멤버를 추방하시겠습니까?")) return;

    if (folder == undefined) {
      console.log("folder 정보가 없습니다.");
      return;
    }

    authAxios
      .delete(API_PATH.FOLDER.MEMBER.DELETE(folder.id, memberId))
      .then(function (response) {
        if (response.status != 200) {
          return;
        }

        const newInvitedMembers: InvitedMember[] = folder.invitedMembers.filter(
          (member) => member.id !== memberId
        );
        const newFolder: Folder = {
          id: folder.id,
          name: folder.name,
          unreadCount: folder.unreadCount,
          blogs: folder.blogs,
          invitedMembers: newInvitedMembers,
          isOpen: folder.isOpen,
        };
        setFolder(newFolder);

        updateFolder(newFolder);
      })
      .catch(function (error) {
        alert(error.response.data.message);
      });
  };

  const closeMemberDroupDownView = () => {
    setNewMemberName("");
    setMemberDropDownView(false);
    setSearchedMembers([]);
  };

  return (
    <div className="md:w-2/5 w-full">
      <h1 className="text-left text-lg font-bold mt-4 px-2">멤버 관리</h1>
      <div className="mb-4">
        <div className="flex gap-1 relative">
          <input
            type="text"
            placeholder="추가할 멤버의 이름을 입력해주세요."
            className="input input-bordered input-primary w-full"
            value={newMemberName}
            onChange={(e) => searchMembers(e.target.value)}
          />
          <span
            className="absolute right-1 cursor-pointer top-1/4 right-3 text-slate-400 hover:text-black"
            onClick={closeMemberDroupDownView}
          >
            &#10006;
          </span>
        </div>
        {memberDropDownView && (
          <MemberSearchList members={searchedMembers} addMember={addMember} />
        )}
      </div>
      <div className="flex flex-col">
        <div className="border-2 border-success bg-green-50 rounded-box gap-2">
          {folder &&
            folder.invitedMembers.map(
              (member: InvitedMember, index: number) => (
                <MemberBox
                  key={index}
                  member={member}
                  deleteHandler={deleteMember}
                />
              )
            )}
        </div>
      </div>
    </div>
  );
}
