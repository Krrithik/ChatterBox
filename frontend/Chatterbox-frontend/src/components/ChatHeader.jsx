import { X } from "lucide-react";
import { userAuthContext } from "../context/userAuthContext";
import { userChatContext } from "../context/userChatContext";
import { useContext } from "react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useContext(userChatContext)
  const { onlineUsers } = useContext(userAuthContext)


  const isOnline = onlineUsers.includes(selectedUser._id)
  

  return (
    <div className="p-2.5 border-b border-base-300 text-blue-50 chat-container-header">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-5 rounded-full relative">
              <img src={selectedUser.profilePic || "/userProfilePic.jpg"} alt={selectedUser.fullName} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}{"  "}{isOnline ? (
                <span className="text-green-400 text-xs ml-2 font-semibold">
                   ● Online
                </span>
              ) : (
                <span className="text-gray-300 text-xs ml-2 font-semibold">
                  ● Offline
                </span>
              )}</h3>
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