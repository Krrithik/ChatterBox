import { X } from "lucide-react";
import { userAuthContext } from "../context/userAuthContext";
import { userChatContext } from "../context/userChatContext";
import { useContext } from "react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useContext(userChatContext)
  const { onlineUsers } = useContext(userAuthContext)

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-5 rounded-full relative">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;