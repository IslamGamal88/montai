import PropTypes from "prop-types";
import { useState } from "react";
import Message from "./Message";

function Chat({ messages, handleAddMessage, handleEchoMessage }) {
  const [newMessage, setNewMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    setIsProcessing(true);
    e.preventDefault();
    handleAddMessage(newMessage);
    handleEchoMessage(newMessage);
    setNewMessage("");
    setTimeout(() => {
      setIsProcessing(false);
    }, 1000);
  };

  const messageStyles = {
    user: "bg-[#F3E8FF] text-[#8002FF]",
    echo: "bg-[#8002FF] text-white self-end",
  };

  return (
    <div className="flex bg-[#FCF8FF] flex-col justify-between grow">
      <div className="flex flex-col">
        {messages.map((message, index) => (
          <Message
            className={
              (index + 1) % 2 === 0
                ? messageStyles.echo
                : messageStyles.user
            }
            key={index}
            message={message}
          />
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {isProcessing && (
          <div className="p-2">
            <div className="">Processing...</div>
          </div>
        )}
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
  handleEchoMessage: PropTypes.func,
  messages: PropTypes.arrayOf(PropTypes.string),
};

export default Chat;
