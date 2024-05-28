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

  const addChat = (message) => {
    const chat = {
      id: new Date(),
      messages: message ? [message] : [],
    };
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
    if (!chats.length) {
      addChat(message);
    } else {
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
    }
  };

  const echoMessage = (message) => {
    const cachedChats = store.get("chats");
    const cachedCurrentChat = store.get("currentChat");

    const updatedState = {
      chats: cachedChats.map((chat) =>
        chat.id === cachedCurrentChat.id
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      ),
      currentChat: {
        ...cachedCurrentChat,
        messages: [...cachedCurrentChat.messages, message],
      },
    };

    setTimeout(() => {
      setChats(updatedState.chats);
      setCurrentChat(updatedState.currentChat);
      store.set("chats", updatedState.chats);
      store.set("currentChat", updatedState.currentChat);
    }, 1000);
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
