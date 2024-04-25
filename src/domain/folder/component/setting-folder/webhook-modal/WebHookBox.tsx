import { useWebHookModalStore } from "../../../../../store/webHookModalStore";
import { Icon } from "../../../../common/component/Icon";
import { Alert } from "../../../layout/sidebar/SideBarType";

type Props = {
  alert: Alert;
};

export default function WebHookBox({ alert }: Props) {
  const { deleteAlert } = useWebHookModalStore();

  return (
    <div className="h-12 flex items-center hover:bg-success rounded-lg">
      <div className="flex flex-none justify-center w-1/12 mx-3">
        <Icon name="alert" size="L" />
      </div>
      <div className="flex-1 w-full overflow-hidden whitespace-nowrap">
        <div className="text-lg text-left">{alert.webhookUrl}</div>
      </div>
      <div className="flex flex-none justify-center w-1/12" onClick={() => deleteAlert(alert.id)}>
        <Icon name="delete_left" size="L" />
      </div>
    </div>
  );
}
  