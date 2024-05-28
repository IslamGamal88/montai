import Navbar from "./components/Navbar";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import { useEffect, useState } from "react";
import { store } from "./utils/localStore";
function App() {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

  const init = () => {
    const chats = store.get("chats") || [];
    if (!chats.length) {
      addChat();
    }
    setChats(chats);
  };

  const addChat = () => {
    const chat = { id: new Date(), messages: [] };
    const newChats = [...chats, chat];

    setChats(newChats);
    setCurrentChat(chat);
    store.set("chats", newChats);
    store.set("currentChat", chat);
  };

  const deleteChat = (id) => {
    if (chats.length === 1) {
      clearHistory();
      return;
    } else {
      const newChats = chats.filter((chat) => chat.id !== id);
      store.set("chats", newChats);
      setChats(newChats);
    }
  };

  const selectChat = (id) => {
    const chat = chats.find((chat) => chat.id === id);
    setCurrentChat(chat);
  };

  const clearHistory = () => {
    setChats([]);
    store.clear();
  };

  const addMessage = (message) => {
    const newChat = {
      ...currentChat,
      messages: [...currentChat.messages, message],
    };
    const newChats = chats.map((chat) =>
      chat.id === currentChat.id ? newChat : chat
    );
    setChats(newChats);
    setCurrentChat(newChat);
    store.set("chats", newChats);
    store.set("currentChat", newChat);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex h-full">
        <Sidebar
          chats={chats}
          handleDeleteChat={deleteChat}
          handleClearHistory={clearHistory}
          handleSelectChat={selectChat}
          handleCreateChat={addChat}
        />
        <Chat
          messages={currentChat.messages || []}
          handleAddMessage={addMessage}
        />
      </div>
    </div>
  );
}

export default App;
