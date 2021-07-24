import React from "react";
import chatCss from "../../assets/css/chat.module.css";

function Message(props) {
  console.log(props.me)
  return (
    <div
      className={`
${chatCss.chat__bubble} ${
  parseInt(props.me) !== parseInt(localStorage.getItem("userId"))
          ? chatCss.right_chat
          : chatCss.left_chat
      } ${
        parseInt(props.me) !== parseInt(localStorage.getItem("userId"))
          ? chatCss.chat__bubble__left
          : chatCss.chat__bubble__right
      }
`}
    >
      {props.message}
    </div>
  );
}

export default React.memo(Message);
