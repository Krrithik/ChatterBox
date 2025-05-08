import { useContext, useEffect } from "react";
import { userChatContext } from "../context/userChatContext";
import { Users } from "lucide-react";
import "../index.css"

export default function Sidebar() {
  const { getUsers, users, selectedUser, isUsersLoading, setSelectedUser } =  useContext(userChatContext);

  const onlineUsers = [];

  useEffect(() => {
    getUsers();
  }, []);

  if (isUsersLoading) {
    return <div>Loading...</div>;
  }

  return (
    <aside className="sidebar-root">
      <div className="sidebar-header">
        <Users className="sidebar-header-icon" />
        <span className="sidebar-header-title">Contacts</span>
      </div>
      <div className="sidebar-list">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`sidebar-user-btn ${
              selectedUser?._id === user._id ? "sidebar-user-btn-active" : ""
            }`}
          >
            <img
              src={user.profilePic || "/avatar.png"}
              alt={user.name}
              className="sidebar-avatar"
            />
            <span className="sidebar-user-name">{user.fullName}</span>
          </button>
        ))}
        {users.length === 0 && (
          <div className="sidebar-no-users">No users found</div>
        )}
      </div>
    </aside>
  );
}



/* 

  return (
    <aside>
      <div>
        <Users />
        <span>Contacts</span>
      </div>
      <div>
        {users.map((user) => (
          <button key={user._id} onClick={() => setSelectedUser(user)}>
            <img src={user.profilePic || "/avatar.png"} alt={user.name} />
            <span>{user.fullName}</span>
          </button>
        ))}
      </div>
    </aside>
  );

*/