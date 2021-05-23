import React from "react";
import chatCss from "../../assets/css/chat.module.css";

function Message(props) {
  // console.log(props.id)
  return (
    <div
      className={`
${chatCss.chat__bubble} ${
        props.me != localStorage.getItem("userId")
          ? chatCss.right_chat
          : chatCss.left_chat
      } ${
        props.me != localStorage.getItem("userId")
          ? chatCss.chat__bubble__left
          : chatCss.chat__bubble__right
      }
`}
    >
      {props.message}
    </div>
  );
}

export default Message;
