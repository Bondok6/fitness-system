import React, { useEffect, useRef, useState } from "react";
import chatCss from "../../assets/css/chat.module.css";
import photo from "../../images/friend_1.png";
import Message from "./message";
import { updateCoversationByMessage, updateCoversation } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import { IconButton } from "@material-ui/core";
import { InsertEmoticon } from "@material-ui/icons";
function Messaging(props) {
  const [message, setMessage] = useState("");
  const sms = useRef();
  const chosenEmoji = useRef([]);
  const emoj = useRef();
  const emoji = useRef();
  const pages = useSelector((state) => state.reducer.pages);
  // const contacts=useSelector(state=>state.reducer.contacts)

  // useEffect(()=>{
  //   console.log(props.contactForMessage)
  // },[props.contactForMessage])

  const dispatcher = useDispatch();

  const onEmojiClick = (event, emojiObject) => {
    chosenEmoji.current = [...chosenEmoji.current, emojiObject];
    setMessage(
      chosenEmoji.current[chosenEmoji.current.length - 1].emoji + message
    );
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
        var messageBody = document.querySelector("#messageBody");
        var btn = document.createElement("div"); // Create a <button> element
        btn.className = `
       ${chatCss.chat__bubble} ${
          body.chat.me != localStorage.getItem("userId")
            ? chatCss.right_chat
            : chatCss.left_chat
        } ${
          body.chat.me != localStorage.getItem("userId")
            ? chatCss.chat__bubble__left
            : chatCss.chat__bubble__right
        }
       `;

        btn.innerHTML = body.chat.content; // Insert text
        messageBody.appendChild(btn);
        messageBody.scrollTop =
          messageBody.scrollHeight - messageBody.clientHeight;
        dispatcher(
          updateCoversationByMessage(
            parseInt(body.chat.me) !== parseInt(localStorage.getItem("userId"))
              ? body.chat.me
              : body.chat.to,
            body.chat
          )
        );
      });
    }
  }, [props.socket]);

  useEffect(() => {
    var messageBody = document.querySelector("#messageBody");
    messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
  }, [props.currentConversation]);

  return (
    <div class="col-md-8">
      <div class={chatCss.friend_header}>
        <img
          src={
            props.contactForMessage
              ? props.contactForMessage.photo
              : "https://res.cloudinary.com/derossy-backup/image/upload/v1555206304/deross-samples/placeholder-profile-male.jpg"
          }
          alt="friend image"
          class={chatCss.friend__img}
        />
        <div class={chatCss.friend__text}>
          <h6>
            {props.contactForMessage
              ? props.contactForMessage.username
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
            axios
              .get(
                `/conversations/${props.currentContact}/messages?limit=${
                  (pages[props.currentContact] + 1
                    ? pages[props.currentContact] + 1
                    : 2) * 10
                }`
              )
              .then((res) => {
                props.currentHandler(res.data.docs);
                dispatcher(
                  updateCoversation(
                    props.currentContact,
                    res.data.docs,
                    pages[props.currentContact] + 1
                      ? pages[props.currentContact] + 1
                      : 2
                  )
                );
              });
          }
        }}
      >
        {props.currentConversation
          ? props.currentConversation.map((sms) => (
              <Message key={sms.id} me={sms.me} message={sms.content} />
            ))
          : ""}
      </div>

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
          {/*  <div ref={sms}></div> */}
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
              props.addMessage(message);
              setMessage("");
              return (sms.current.value = "");
            }
          }}
          onChange={(e) => setMessage(e.target.value)}
          ref={sms}
        />

        <i
          class="material-icons"
          onClick={() => {
            emoj.current.style.visibility = "hidden";
            props.addMessage(message);
            setMessage("");
            return (sms.current.value = "");
          }}
        >
          send
        </i>
      </div>
    </div>
  );
}

export default Messaging;
