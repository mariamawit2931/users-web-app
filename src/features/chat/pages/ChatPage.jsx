import { useState } from "react";
import { useParams } from "react-router-dom";
import { useChat } from "../hooks/useChat";
import Button from "../../../components/common/Button";
import Loader from "../../../components/common/Loader";
import ErrorMessage from "../../../components/common/ErrorMessage";

// Expects a route like /chat/:conversationId
export default function ChatPage() {
  const { conversationId } = useParams();
  const { messages, isLoading, error, sendText, sendFile } = useChat(conversationId);
  const [draft, setDraft] = useState("");

  if (isLoading) return <Loader label="Loading conversation..." />;

  const handleSend = (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    sendText(draft);
    setDraft("");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 flex flex-col h-[70vh]">
      <ErrorMessage message={error} />
      <div className="flex-1 overflow-y-auto border rounded-md p-3 space-y-2">
        {messages.map((m) => (
          <div key={m.id} className="text-sm">
            {m.type === "TEXT" && <p>{m.textContent}</p>}
            {m.type === "IMAGE" && <img src={m.fileUrl} alt={m.fileName} className="max-w-xs rounded-md" />}
            {m.type === "DOCUMENT" && (
              <a href={m.fileUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                {m.fileName}
              </a>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="mt-3 flex gap-2">
        <input
          className="flex-1 border rounded-md px-3 py-2"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Type a message..."
        />
        <input
          type="file"
          className="hidden"
          id="chat-file-input"
          onChange={(e) => e.target.files[0] && sendFile(e.target.files[0])}
        />
        <label htmlFor="chat-file-input">
          <Button type="button" variant="secondary">📎</Button>
        </label>
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
}
