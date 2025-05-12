import { useContext, useState } from "react"
import { userChatContext } from "../context/userChatContext"
import { Send } from "lucide-react";

export default function MessageInput(){
    const [text, setText] = useState('')

    const { sendMessage } = useContext(userChatContext)

    async function handleSendMessage(e) {
        e.preventDefault();
        const trimmedText = text.trim();
        
        if (!trimmedText){
             return;
        }
    
        try {
          await sendMessage({ text: trimmedText });
          setText(""); // Clear input after send
        } catch (error) {
          console.error("Failed to send message:", error);
          // Optionally show error toast
        }
    }

    return (
        <div className="p-4 w-full review-bar-bg">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                className="w-full input input-bordered rounded-lg input-sm sm:input-md"
                placeholder="Type a message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-sm btn-circle"
              disabled={!text.trim()}
            >
              <Send color="skyblue" size={22} />
            </button>
          </form>
        </div>
      );
}