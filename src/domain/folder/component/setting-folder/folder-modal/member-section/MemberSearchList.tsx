import { InvitedMember } from "../../../../layout/sidebar/SideBarType";
import MemberSearchBox from "./MemberSearchBox";

type Props = {
  members: InvitedMember[];
  addMember: (inviteeId: number) => void;
};
export default function MemberSearchList({ members, addMember }: Props) {
  return (
    <div className="relative">
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full absolute"
      >
        {members &&
          members.map((member) => (
            <MemberSearchBox member={member} addMember={addMember} />
          ))}
      </ul>
    </div>
  );
}
