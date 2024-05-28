import PropTypes from "prop-types";
import { Trash2 } from "react-feather";
function Sidebar({
  chats,
  handleDeleteChat,
  handleClearHistory,
  handleSelectChat,
  handleCreateChat,
}) {
  return (
    <aside className="bg-[#180030] max-w-40 w-1/3 md:max-w-60 h-auto flex flex-col justify-between">
      <nav>
        <div className="flex justify-center pt-2">
          <button
            className="text-white bg-[#8002FF] rounded w-fit p-2 self-center mb-2 "
            onClick={handleCreateChat}
          >
            New Chat
          </button>
        </div>
        <ul>
          {chats.map((chat) => (
            <li
              onClick={() => handleSelectChat(chat.id)}
              key={chat.id}
              className="flex justify-between mt-2 px-2 border-b border-white"
            >
              <button className="text-white bg-[#8002FF] rounded w-fit p-2 self-center mb-2">
                {chat.messages[0] || "No messages"}
              </button>
              <Trash2
                className="text-red-400 cursor-pointer self-center "
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteChat(chat.id);
                }}
              />
            </li>
          ))}
        </ul>
      </nav>
      <button
        className="text-white bg-[#8002FF] rounded w-fit p-2 self-center mb-2"
        onClick={handleClearHistory}
      >
        Delete History
      </button>
    </aside>
  );
}

Sidebar.propTypes = {
  chats: PropTypes.array,
  handleClearHistory: PropTypes.func,
  handleCreateChat: PropTypes.func,
  handleDeleteChat: PropTypes.func,
  handleSelectChat: PropTypes.func,
};

export default Sidebar;
