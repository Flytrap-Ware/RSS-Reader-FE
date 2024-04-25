import { useState } from "react";
import WebHookBox from "./WebHookBox";
import { useWebHookModalStore } from "../../../../../common/store/webHookModalStore";
import { Alert } from "../../../../layout/type/SideBarType";

export default function WebHookSection() {
  
  const { alerts, addAlert, folderForModal } = useWebHookModalStore();
  const [newWebHookUrl, setNewWebHookUrl] = useState<string>("");

  const isNewWebHookUrlEmpty = (): boolean => {
    return newWebHookUrl !== undefined && newWebHookUrl !== "";
  };

  const validWebHookUrlLength = (): boolean => {
    return newWebHookUrl.length <= 2500;
  };

  const alertInvalidWebHookUrl = (): boolean => {
    if (!isNewWebHookUrlEmpty()) {
      alert("웹 훅 주소를 입력하세요.");
      return false;
    }
    if (!validWebHookUrlLength()) {
      alert("웹 훅 주소는 2,500글자 이내로 입력하세요.");
      return false;
    }
    return true;
  };

  const addWebHook = () => {
    if (folderForModal == undefined) {
      console.log("folder 정보가 없습니다.");
      return;
    }

    if (!alertInvalidWebHookUrl()) {
      return;
    }

    if (addAlert(newWebHookUrl)) {
      setNewWebHookUrl("");
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-left text-lg font-bold mt-4 px-2">알림 웹 훅 관리</h1>
      <div className="flex gap-1 mb-4">
        <input
          type="text"
          placeholder="추가할 웹 훅 URL을 입력해주세요."
          className="input input-bordered input-primary w-full"
          value={newWebHookUrl}
          onChange={(e) => setNewWebHookUrl(e.target.value)}
        />
        <button className="btn btn-square btn-secondary" onClick={addWebHook}>
          +
        </button>
      </div>
      <div className="flex flex-col">
        <div className="border-2 border-success bg-green-50 rounded-box gap-2">
          {alerts && alerts.length === 0 ? (
            <div>알림이 없습니다.</div>
          ) : (
            alerts.map((alert: Alert, index: number) => (
              <WebHookBox key={index} alert={alert} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
