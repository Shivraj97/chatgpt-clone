import React from "react";
import SelectModal from "./select-modal";
import UpgradeModal from "./upgrade-modal";
import { UserButton } from "@clerk/clerk-react";

type Props = {};

function Header({}: Props) {
  return (
    <div className="flex h-[100px] justify-between p-5">
      <SelectModal />
      <UserButton />
    </div>
  );
}

export default Header;
