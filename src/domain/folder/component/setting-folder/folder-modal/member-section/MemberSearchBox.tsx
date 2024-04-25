import { InvitedMember } from "../../../../layout/sidebar/SideBarType";

type Props = {
  member: InvitedMember;
  addMember: (inviteeId: number) => void;
};

export default function MemberSearchBox({ member, addMember }: Props) {
  return (
    <li>
      <a onClick={() => addMember(member.id)}>
        <div className="avatar">
          <div className="w-8 rounded-full">
            <img src={member.profile} />
          </div>
        </div>
        {member.name}
      </a>
    </li>
  );
}
