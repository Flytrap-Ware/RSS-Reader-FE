import { ReactNode } from "react";
import SideBar from "./sidebar/SideBar";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col items-center justify-start">
        {/* Header & Content */}
        {children}
      </div>

      <div className="drawer-side">
        <SideBar />
      </div>
    </div>
  );
}
