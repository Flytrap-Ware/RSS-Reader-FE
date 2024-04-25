import { create } from "zustand";
import { Folder } from "../../domain/layout/type/SideBarType";

type FoldersStoreType = {
  privateFolders: Folder[];
  sharedFolders: Folder[];
  setPrivateFolders: (folders: Folder[]) => void;
  setSharedFolders: (folders: Folder[]) => void;
  addFolderToPrivateFolders: (newFolder: Folder) => void;
  addFolderToSharedFolders: (newFolder: Folder) => void;
  updateFolder: (updatedFolder: Folder) => void;
  deleteFolder: (folderId: number) => void;
  openFolder: (folderId: number) => void;
  closeFolder: (folderId: number) => void;
  isEmpty: () => boolean;
};

export const useFoldersStore = create<FoldersStoreType>((set, get) => ({
  privateFolders: [],
  sharedFolders: [],
  setPrivateFolders: (folders: Folder[]) =>
    set(() => ({
      privateFolders: folders.map((folder) => ({
        ...folder,
        isOpen: folder.isOpen ?? false,
      }))
    })),
  setSharedFolders: (folders: Folder[]) =>
    set(() => ({
      sharedFolders: folders.map((folder) => ({
        ...folder,
        isOpen: folder.isOpen ?? false,
      }))
    })),
  addFolderToPrivateFolders: (newFolder: Folder) =>
    set((prev) => ({ privateFolders: [...prev.privateFolders, newFolder] })),
  addFolderToSharedFolders: (newFolder: Folder) =>
    set((prev) => ({ sharedFolders: [...prev.sharedFolders, newFolder] })),
  updateFolder: (updatedFolder: Folder) => {
    set((prev) => {
      if (updatedFolder.invitedMembers.length == 0) {
        // sharedFolders에서 updatedFolder 제거
        prev.sharedFolders = prev.sharedFolders.filter(
          (f) => f.id !== updatedFolder.id
        );

        // privateFolders에 updatedFolder가 있는지 확인
        const folderIndex: number = prev.privateFolders.findIndex(
          (f) => f.id == updatedFolder.id
        );

        if (folderIndex !== -1) {
          // privateFolders에 updatedFolder가 있으면 UPDATE
          prev.privateFolders[folderIndex] = updatedFolder;

          return {
            privateFolders: [...prev.privateFolders],
            sharedFolders: [...prev.sharedFolders],
          };
        } else {
          // privateFolders에 updatedFolder가 없으면 ADD
          return {
            privateFolders: [...prev.privateFolders, updatedFolder],
            sharedFolders: [...prev.sharedFolders],
          };
        }
      } else if (updatedFolder.invitedMembers.length == 1) {
        // privateFolders에서 updatedFolder 제거
        prev.privateFolders = prev.privateFolders.filter(
          (f) => f.id !== updatedFolder.id
        );

        // sharedFolders에 updatedFolder가 있는지 확인
        const folderIndex: number = prev.sharedFolders.findIndex(
          (f) => f.id == updatedFolder.id
        );

        if (folderIndex !== -1) {
          // sharedFolders에 updatedFolder가 있으면 UPDATE
          prev.sharedFolders[folderIndex] = updatedFolder;

          return {
            privateFolders: [...prev.privateFolders],
            sharedFolders: [...prev.sharedFolders],
          };
        } else {
          // sharedFolders에 updatedFolder가 없으면 ADD
          return {
            privateFolders: [...prev.privateFolders],
            sharedFolders: [...prev.sharedFolders, updatedFolder],
          };
        }
      } else if (updatedFolder.invitedMembers.length >= 2) {
        const folderIndex: number = prev.sharedFolders.findIndex(
          (f) => f.id == updatedFolder.id
        );

        if (folderIndex !== -1) {
          prev.sharedFolders[folderIndex] = updatedFolder;

          return { sharedFolders: [...prev.sharedFolders] };
        } else {
          return { sharedFolders: [...prev.sharedFolders, updatedFolder] };
        }
      }

      return prev;
    });
  },
  deleteFolder: (folderId: number) => {
    set((prev) => {
      prev.privateFolders = prev.privateFolders.filter(
        (f) => f.id !== folderId
      );
      prev.sharedFolders = prev.sharedFolders.filter((f) => f.id !== folderId);

      return {
        privateFolders: [...prev.privateFolders],
        sharedFolders: [...prev.sharedFolders],
      };
    });
  },
  openFolder: (folderId: number) => {
    set((prev) => {
      prev.privateFolders = prev.privateFolders.map(
        (folder) => {
          if (folder.id === folderId) {
            return { ...folder, isOpen: true };
          }
          return folder;
        }
      );
      prev.sharedFolders = prev.sharedFolders.map(
        (folder) => {
          if (folder.id === folderId) {
            return { ...folder, isOpen: true };
          }
          return folder;
        }
      );

      return {
        privateFolders: [...prev.privateFolders],
        sharedFolders: [...prev.sharedFolders],
      };
    });
  },
  closeFolder: (folderId: number) => {
    set((prev) => {
      prev.privateFolders = prev.privateFolders.map(
        (folder) => {
          if (folder.id === folderId) {
            return { ...folder, isOpen: false };
          }
          return folder;
        }
      );
      prev.sharedFolders = prev.sharedFolders.map(
        (folder) => {
          if (folder.id === folderId) {
            return { ...folder, isOpen: false };
          }
          return folder;
        }
      );

      return {
        privateFolders: [...prev.privateFolders],
        sharedFolders: [...prev.sharedFolders],
      };
    });
  },
  isEmpty: () => {
    const state = get();
    return state.privateFolders.length == 0 && state.sharedFolders.length == 0;
  }
}));
