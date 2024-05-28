import Navbar from "./components/Navbar";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import { useEffect, useState } from "react";
import { store } from "./utils/localStore";

function App() {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    const chats = store.get("chats") || [];
    if (!chats.length) {
      addChat();
    }
    setChats(chats);
    setCurrentChat(store.get("currentChat") || chats.at(-1));
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
      store.set("currentChat", newChats.at(-1));
      setChats(newChats);
      setCurrentChat(newChats.at(-1));
    }
  };

  const selectChat = (id) => {
    const chat = chats.find((chat) => chat.id === id);
    setCurrentChat(chat);
  };

  const clearHistory = () => {
    setChats([]);
    setCurrentChat(null);
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

  const echoMessage = (message) => {
    setTimeout(() => {
      setChats((prevChats) => {
        const updatedState = prevChats.map((chat) =>
          chat.id === currentChat.id
            ? { ...chat, messages: [...chat.messages, message] }
            : chat
        );
        store.set("chats", updatedState);
        return updatedState;
      });
      setCurrentChat((prevChat) => {
        const updatedChat = {
          ...prevChat,
          messages: [...prevChat.messages, message],
        };
        store.set("currentChat", updatedChat);
        return updatedChat;
      });
    }, 1000);
    store.set("chats", chats);
    store.set("currentChat", currentChat);
  };

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex h-fit min-h-[calc(100vh-4rem)]">
        <Sidebar
          chats={chats}
          handleDeleteChat={deleteChat}
          handleClearHistory={clearHistory}
          handleSelectChat={selectChat}
          handleCreateChat={addChat}
        />
        <Chat
          messages={currentChat?.messages || []}
          handleAddMessage={addMessage}
          handleEchoMessage={echoMessage}
        />
      </div>
    </div>
  );
}

export default App;
