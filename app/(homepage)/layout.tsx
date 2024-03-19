import React from "react";
import Sidebar from "../../components/sidebar";

type Props = {
  children: React.ReactNode;
};

function layout({ children }: Props) {
  return (
    <main className="flex h-full text-white">
      <Sidebar />
      <div className="h-full w-full">{children}</div>
    </main>
  );
}

export default layout;
