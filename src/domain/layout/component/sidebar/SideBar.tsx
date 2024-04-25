import SideLogo from "./SideLogo";
import SideMenu from "./SideMenu";

export default function SideBar() {
  return (
    <>
      <label
        htmlFor="my-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>

      <SideLogo />

      <SideMenu />
    </>
  );
}
