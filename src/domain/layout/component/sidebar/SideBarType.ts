export type Blog = {
  id: number;
  title: string;
  unreadCount: number;
};

export type InvitedMember = {
  id: number;
  name: string;
  profile: string;
};

export type Folder = {
  id: number;
  name: string;
  unreadCount: number;
  blogs: Blog[];
  invitedMembers: InvitedMember[];
  isOpen: boolean;
};

export type Alert = {
  id: number;
  platform: string;
  webhookUrl: string;
}