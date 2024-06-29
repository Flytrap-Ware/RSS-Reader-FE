export const API_PATH = {
  POST: {
    GET: (postId: string) => `/posts/${postId}`,
    GET_ALL: "/posts",
  },
  BOOKMARK: {
    GET_ALL: "/bookmarks",
    ADD: (postId: string) => `/posts/${postId}/bookmarks`,
    DELETE: (postId: string) => `/posts/${postId}/bookmarks`,
  },
  SUBSCRIPTION: {
    POST: {
      GET_ALL: (subscribptionId: number) => `/subscriptions/${subscribptionId}/posts`,
    }
  },
  FOLDER: {
    GET_ALL: "/folders",
    ADD: "/folders",
    DELETE: (folderId: number) => `/folders/${folderId}`,
    MEMBER: {
      ADD: (folderId: number) => `/folders/${folderId}/members`,
      DELETE: (folderId: number, memberId: number) => `/folders/${folderId}/members/${memberId}`
    },
    SUBSCRIPTION: {
      ADD: (folderId: number) => `/folders/${folderId}/subscriptions`,
      DELETE: (folderId: number, folderSubscriptionId: number) => `/folders/${folderId}/subscriptions/${folderSubscriptionId}`
    },
    POST: {
      GET_ALL: (folderId: number) => `/folders/${folderId}/posts`,
    }
  },
  MEMBER: {
    GET_ALL_BY_NAME: (memberName: string) => `/members?name=${memberName}`
  },
  ALERT: {
    GET_ALL: (folderId: number) => `/folders/${folderId}/alerts`,
    ADD: (folderId: number) => `/folders/${folderId}/alerts`, 
    DELETE: (folderId: number, alertId: number) => `/folders/${folderId}/alerts/${alertId}`, 
  },
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    ADMIN_LOGIN: "/admin/login",
  }
};
