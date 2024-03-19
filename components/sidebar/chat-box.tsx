import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { ArrowDownToLine, Pencil, Trash2 } from "lucide-react";

type Props = {
  chat: Doc<"chats">;
  selected: boolean;
};
const ChatBox = ({ chat, selected }: Props) => {
  const rename = useMutation(api.chats.rename);
  const remove = useMutation(api.chats.remove);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(chat.title);
  const router = useRouter();

  const handleClick = () => {
    if (!selected) {
      router.push(`/chat/${chat._id}`);
    }
  };

  const handleRename = () => {
    rename({ id: chat?._id, title: title });
    setIsEditing(false);
  };

  const handleDelete = () => {
    remove({ id: chat?._id });
    router.push("/");
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleRename();
    }
  };

  return (
    <div
      className={cn(
        "group relative flex w-full p-2 rounded-md hover:bg-neutral-900 cursor-pointer text-white text-sm",
        selected && "bg-neutral-800"
      )}
      onClick={handleClick}
    >
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleRename}
          autoFocus
          className="outline-none bg-transparent w-[170px]"
        />
      ) : (
        <div className="truncate max-w-[200px]">{chat.title}</div>
      )}
      <div className="absolute top-1/2 -translate-y-1/2 right-2 flex z-10">
        {isEditing ? (
          <button
            onClick={handleRename}
            className={cn(
              "bg-gradient-to-r from-transparent from-0% to-neutral-900 to-30% pl-3 py-1",
              selected && "to-neutral-800"
            )}
          >
            <ArrowDownToLine />
          </button>
        ) : (
          <div
            className={cn(
              "bg-gradient-to-r from-transparent from-0% to-neutral-900 to-90% space-x-2 flex pl-6 py-1",
              selected && "to-neutral-800"
            )}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button onClick={handleDelete}>
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
