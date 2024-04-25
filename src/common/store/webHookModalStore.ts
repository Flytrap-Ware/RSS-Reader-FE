import { create } from "zustand";
import authAxios from "../utill/ApiUtills";
import { API_PATH } from "../constant/ApiPath";
import { Alert, Folder } from "../../domain/layout/type/SideBarType";

type WebHookModalStoreType = {
  alerts: Alert[];
  isWebHookModalOpen: boolean;
  folderForModal?: Folder;
  setAlerts: (alerts: Alert[]) => void;
  addAlert: (webHookUrl: string) => boolean;
  deleteAlert: (alertId: number) => void;
  openWebHookModal: (folder: Folder) => void;
  closeWebHookModal: () => void;
};

export const useWebHookModalStore = create<WebHookModalStoreType>(
  (set, get) => ({
    alerts: [],
    isWebHookModalOpen: false,
    folderForModal: undefined,
    setAlerts: (alerts: Alert[]) => {
      set({ alerts });
    },
    addAlert: (webHookUrl: string) => {
      const folderId = get().folderForModal?.id;

      if (folderId == undefined) {
        alert('Folder 정보가 올바르지 않습니다.')
        return false;
      }

      authAxios
      .post(API_PATH.ALERT.ADD(folderId), {
        webhookUrl: webHookUrl,
      })
      .then(function (response) {
        if (response.status != 200) {
          alert("올바른 상태코드가 아닙니다. 상태코드를 확인하세요. 상태코드 = " + response.status);
          return false;
        }

        const newAlert: Alert = response.data.data;
        set((prev) => ({ alerts: [...prev.alerts, newAlert] }));

        return true;
      })
      .catch(function (error) {
        alert(error.response.data.message);
      });

      return false;
    },
    deleteAlert: (alertId: number) => {

      const folderId = get().folderForModal?.id;

      if (folderId == undefined) {
        alert('Folder 정보가 올바르지 않습니다.')
        return;
      }

      authAxios
        .delete(API_PATH.ALERT.DELETE(folderId, alertId))
        .then(function(response) {
          if (response.status != 200) {
            alert("올바른 상태코드가 아닙니다. 상태코드를 확인하세요. 상태코드 = " + response.status);
            return;
          }

          set((prev) => {
            prev.alerts = prev.alerts.filter((a) => a.id !== alertId);
      
            return {
              alerts: [...prev.alerts],
            };
          });
          alert("알림이 삭제되었습니다.")

        })
        .catch(function (error) {
          alert(error.response.data.message);
        });
    },
    openWebHookModal: (folder: Folder) => {
      const currentState = get().isWebHookModalOpen;
      if (currentState) {
        return;
      }

      set(() => ({
        isWebHookModalOpen: true,
        folderForModal: folder,
      }));

      authAxios.get(API_PATH.ALERT.GET_ALL(folder.id)).then(function (response) {
        if (response.status != 200) {
          return;
        }

        const alerts: Alert[] = response.data.data.alerts;
        set(() => ({
          alerts: alerts,
        }));
      });
    },
    closeWebHookModal: () => {
      set(() => ({
        alerts: [],
        isWebHookModalOpen: false,
        folderForModal: undefined,
      }));
    },
  })
);
