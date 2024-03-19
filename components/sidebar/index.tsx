import React from "react";
import ChatList from "./chat-list";
import NewChatButton from "./new-chat-button";
import UpgradePlanButton from "./upgrade-plan-button";

type Props = {};

function Sidebar({}: Props) {
  return (
    <div className="h-full hidden lg:flex lg:flex-col lg:w-[280px] bg-neutral-950 p-4 min-w-[280px]">
      <NewChatButton />
      <ChatList />
      <UpgradePlanButton />
    </div>
  );
}

export default Sidebar;
