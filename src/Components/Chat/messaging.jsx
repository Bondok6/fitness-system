import React, { useEffect, useRef, useState } from "react";
import chatCss from "../../assets/css/chat.module.css";
import Message from "./message";

import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import { IconButton } from "@material-ui/core";
import { InsertEmoticon } from "@material-ui/icons";

function Messaging(props) {
  const [message, setMessage] = useState("");
  const sms = useRef();
  const chosenEmoji = useRef([]);
  const emoj = useRef();
  const emoji = useRef();
  const [resultedMessages, setResultedMessages] = useState(
    props.currentConversation
  );
  const [resultedConract, setResultedContact] = useState(props.currentContact);
  useEffect(() => {
    setResultedMessages(props.currentConversation);
  }, [props.currentConversation]);

  useEffect(() => {
    setResultedContact(props.currentContact);
  }, [props.currentContact]);

  // console.log(resultedConract)

  const onEmojiClick = (event, emojiObject) => {
    chosenEmoji.current = [...chosenEmoji.current, emojiObject];
    sms.current.value=chosenEmoji.current[chosenEmoji.current.length - 1].emoji + message
    // setMessage(
      
    // );
    sms.current.value +=
      chosenEmoji.current[chosenEmoji.current.length - 1].emoji;
  };
  const openEmoji = () => {
    const span = emoj.current;
    span.style.visibility = span.style.visibility === "hidden" ? "" : "hidden";
  };

  useEffect(() => {
    if (props.socket) {
      props.socket.on(`new message`, (body) => {
        setResultedMessages((prev) => {
          if (prev&&prev.docs) {
            return {
              ...prev,
              docs: [...prev.docs, body.message],
            };
          }
        });
      });
    }
  }, [props.socket]);

  useEffect(() => {
    var messageBody = document.querySelector("#messageBody");
    messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
  }, [resultedMessages]);

  return (
    <div class="col-md-8">
      <div class={chatCss.friend_header}>
        <img
          src={
            resultedConract
              ? resultedConract.users
                ? parseInt(resultedConract.users[0].id) ===
                  parseInt(localStorage.getItem("userId"))
                  ? resultedConract.users[1].photo
                  : resultedConract.users[0].photo
                : "https://res.cloudinary.com/derossy-backup/image/upload/v1555206304/deross-samples/placeholder-profile-male.jpg"
              : "https://res.cloudinary.com/derossy-backup/image/upload/v1555206304/deross-samples/placeholder-profile-male.jpg"
          }
          alt="friend image"
          class={chatCss.friend__img}
        />
        <div class={chatCss.friend__text}>
          <h6>
            {resultedConract
              ? resultedConract.users
                ? parseInt(resultedConract.users[0].id) ===
                  parseInt(localStorage.getItem("userId"))
                  ? resultedConract.users[1].username
                  : resultedConract.users[0].username
                : "Please choose contact"
              : "Please choose contact"}
          </h6>
          <blockquote>keep move forward ... </blockquote>
        </div>
      </div>
      <div
        class={chatCss.chatting}
        id="messageBody"
        onScroll={(e) => {
          let scrollValue = e.target.scrollTop;
          if (scrollValue === 0 && props.currentContact) {
            props.pageHandler();
          }
        }}
      >
        {resultedMessages
          ? resultedMessages.docs
            ? resultedMessages.docs.map((sms) => (
                <Message
                  key={sms.id}
                  me={sms.user ? sms.user.id : sms.sender}
                  message={sms.content}
                />
              ))
            : ""
          : ""}
      </div>
      {resultedConract ? (
        <div class={chatCss.chat_box}>
          <div ref={emoji}>
            <div
              className={chatCss.emoji}
              ref={emoj}
              style={{ visibility: "hidden" }}
            >
              <Picker
                onEmojiClick={onEmojiClick}
                skinTone={SKIN_TONE_MEDIUM_DARK}
              />
            </div>
            <IconButton onClick={openEmoji}>
              <InsertEmoticon />
            </IconButton>
          </div>
          <input
            type="text"
            placeholder="Type your message here..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                emoj.current.style.visibility = "hidden";
                props.addMessage(sms.current.value);
                // setMessage("");
                return (sms.current.value = "");
              }
            }}
            onChange={(e) => sms.current.value=e.target.value}
            ref={sms}
          />

          <i
            class="material-icons"
            onClick={() => {
              emoj.current.style.visibility = "hidden";
              props.addMessage(sms.current.value);
              // setMessage("");
              return (sms.current.value = "");
            }}
          >
            send
          </i>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default React.memo(Messaging);
