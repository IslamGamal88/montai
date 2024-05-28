import PropTypes from "prop-types";
import { useState } from "react";

function Chat({ messages, handleAddMessage }) {
  const [newMessage, setNewMessage] = useState("");

  const handleChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div className="flex bg-[#FCF8FF] flex-col justify-between grow">
      <div>
        {messages.map((message, index) => (
          <div key={index} className="p-2">
            {message}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          className="w-full p-2"
          placeholder="Enter your message"
          type="text"
          name="chat"
          value={newMessage}
          onChange={handleChange}
        />
      </form>
    </div>
  );
}

Chat.propTypes = {
  handleAddMessage: PropTypes.func,
  messages: PropTypes.arrayOf(PropTypes.string),
};

export default Chat;
