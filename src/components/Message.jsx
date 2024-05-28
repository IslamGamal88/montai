import PropTypes from "prop-types";

function Message({ message, className = "", ...props }) {
  return (
    <div
      {...props}
      className={`${className} p-2 m-2 rounded-lg w-fit`}
    >
      {message}
    </div>
  );
}

Message.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
};

export default Message;
