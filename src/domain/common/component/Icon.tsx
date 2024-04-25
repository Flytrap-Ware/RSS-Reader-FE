import GitHubMark from "../../../asset/github-mark-white.svg?react";
import Folder from "../../../asset/folder.svg?react";
import Stack from "../../../asset/stack.svg?react";
import Bookmark from "../../../asset/bookmark.svg?react";
import BookmarkFill from "../../../asset/bookmark-fill.svg?react";
import View from "../../../asset/view.svg?react";
import DeleteLeft from "../../../asset/delete-left.svg?react";
import Alert from "../../../asset/alert.svg?react";
import React from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const icons = {
  github_mark: GitHubMark,
  folder: Folder,
  stack: Stack,
  bookmark: Bookmark,
  bookmarkFill: BookmarkFill,
  view: View,
  delete_left: DeleteLeft,
  alert: Alert,
};

type IconProps = {
  name: keyof typeof icons;
  size?: "S" | "M" | "L" | "XL";
};

export const Icon: React.FC<IconProps> = function ({
  name,
  size = "S",
  ...props
}: IconProps) {
  const IconComponent = icons[name];
  if (!IconComponent) return null;

  const iconSize =
    size === "S"
      ? "16px"
      : size === "M"
      ? "20px"
      : size === "L"
      ? "24px"
      : "40px";

  return <IconComponent width={iconSize} height={iconSize} {...props} />;
};
