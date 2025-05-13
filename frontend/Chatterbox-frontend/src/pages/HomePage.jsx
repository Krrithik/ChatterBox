import { userChatContext } from "../context/userChatContext"; 
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoSelectedChats";
import ChatContainer from "../components/ChatContainer";
import "../index.css"; 
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
