import { userChatContext } from "../context/userChatContext"; // <-- Use the context version!
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoSelectedChats";
import ChatContainer from "../components/ChatContainer";
import "../index.css"; // Import your CSS
import { useContext } from "react";

const HomePage = () => {
  const { selectedUser } = useContext(userChatContext);

  return (
    <div className="home-root">
      <div className="home-center">
        <div className="home-card">
          <div className="home-content">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
