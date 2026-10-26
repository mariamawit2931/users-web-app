import { useState, useEffect, useCallback, useRef } from "react";
import { io } from "socket.io-client";
import { chatService } from "../services/chat.service";

export function useChat(conversationId) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const socketRef = useRef(null);

  const loadMessages = useCallback(async () => {
    if (!conversationId) return;
    setIsLoading(true);
    try {
      const data = await chatService.getMessages(conversationId);
      setMessages(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load messages");
    } finally {
      setIsLoading(false);
    }
  }, [conversationId]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  // Real-time updates over Socket.IO
  useEffect(() => {
    if (!conversationId) return;
    const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:4000", {
      auth: { token: localStorage.getItem("token") },
    });
    socketRef.current = socket;

    socket.emit("conversation:join", conversationId);
    socket.on("message:new", (message) => {
      if (message.conversationId === conversationId) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      socket.emit("conversation:leave", conversationId);
      socket.disconnect();
    };
  }, [conversationId]);

  const sendText = async (text) => {
    await chatService.sendTextMessage(conversationId, text);
    // No optimistic update — rely on the socket "message:new" event so
    // the sender sees the exact same server-confirmed message as everyone else.
  };

  const sendFile = async (file) => {
    await chatService.sendFileMessage(conversationId, file);
  };

  return { messages, isLoading, error, sendText, sendFile };
}
