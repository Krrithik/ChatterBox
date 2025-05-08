import "../index.css"

export default function NoSelectedChats(){
    return (
        <div className="nochat-root">
          <div className="nochat-content">
            
    
            {/* Welcome Text */}
            <h2 className="nochat-title">Welcome to ChatApp!</h2>
            <p className="nochat-desc">
              Select a conversation from the sidebar to start chatting
            </p>
          </div>
        </div>
      );
}