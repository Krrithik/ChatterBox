import { useChatContext } from "../context/userChatContext"; // <-- Use the context version!
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoSelectedChats";
import ChatContainer from "../components/ChatContainer";
import "../index.css"; // Import your CSS

const HomePage = () => {
  const { selectedUser } = useChatContext();

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
