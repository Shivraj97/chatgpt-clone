import React, { useEffect, useRef, useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { ScrollArea } from "../../../../../components/ui/scroll-area";
import { useQuery } from "convex/react";
import { useUser } from "@clerk/clerk-react";
import { api } from "../../../../../convex/_generated/api";
import { MessageBox } from "./message-box";

type Props = {
  chatId: Id<"chats">;
};

function Body({ chatId }: Props) {
  const messages = useQuery(api.messages.list, { chatId }) || [];
  const { user } = useUser();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    scrollToBottom();
  }, [messages?.length]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "auto" });
    }
  };
  return (
    <>
      <ScrollArea className="max-h-[calc(100%-150px)] h-full w-full flex-1">
        <div className="px-4 sm:px-12 md:px-52 2xl:px-[430px] relative">
          {messages.map((message) => (
            <MessageBox
              key={message._id}
              message={message}
              userImageUrl={user?.imageUrl}
            />
          ))}
        </div>
        <div ref={scrollRef} />
      </ScrollArea>
    </>
  );
}

export default Body;
