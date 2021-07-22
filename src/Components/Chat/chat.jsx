import React, { useEffect, useState, useCallback } from "react";
import chatCss from "../../assets/css/chat.module.css";
// import photo from "../../images/friend_1.png";
import Contacts from "./contacts";
import Messaging from "./messaging";
import io from "socket.io-client";
import axios from "axios";

function Chat() {
  const [contacts, setContacts] = useState();
  const [currentConversationMessages, setCurrentConversationMessages] =
    useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [currentContact, setCurrentContact] = useState();
  const [socket, setSocket] = useState();
  const [conversations, setConversations] = useState({});
  const [recommendations, setRecommendations] = useState([]);

  const [changed, setChanged] = useState(false);

  const fetchAll = useCallback(async () => {
    const cons = await axios.get("/conversations");

    const contObj = {};
    cons.data.docs.map((c) => {
      return (contObj[c.id] = c);
    });
    setContacts(contObj);
    const fullConversations = cons.data.docs.map((c) =>
      axios.get(`/conversations/${c.id}/messages`)
    );
    const recommendedContacts = axios.get("/fetch-recommendations");
    const res = await Promise.all([...fullConversations, recommendedContacts]);
    let conversationsResult = res.slice(0, res.length - 1);
    let convObj = {};
    setRecommendations(res[res.length - 1]);
    conversationsResult.map(
      (c) => (convObj[c.config.url.split("/")[2]] = c.data)
    );
    setConversations(convObj);
  }, []);

  useEffect(() => {
    fetchAll();
  }, []);

  useEffect(() => {
    const s = io("https://smartfitnessgym.herokuapp.com/chat");
    s.on("connect", () => {
      s.emit("authenticate", { token: localStorage.getItem("token") });
    });
    setSocket(s);
  }, []);

  useEffect(() => {

    const slider = document.querySelector("#slider");
    const sliderImages = document.querySelectorAll("#slider img");

    //Buttons
    const prevBtn = document.querySelector("#prev");
    const nextBtn = document.querySelector("#next");

    let counter = 1;
    const size = 100;

    if (slider) {
      slider.style.transform = "translateX(" + -size * counter + "px)";
    }
    if (nextBtn&&contacts) {
      nextBtn.addEventListener("click", () => {
        if (counter == sliderImages.length - Object.values(contacts).length) return;
        slider.style.transition = "transform 0.4s ease-in-out";
        counter++;
        slider.style.transform = "translateX(" + -size * counter + "px)";
      });
    }
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (counter <= 0) return;
        slider.style.transition = "transform 0.4s ease-in-out";
        counter--;
        slider.style.transform = "translateX(" + -size * counter + "px)";
      });
    }
  }, [contacts && Object.values(contacts).length]);

  const pageHandler = async () => {};

  const currentHandler = async (con) => {
    setCurrentConversationMessages(
      conversations[con.id]
        ? {
            ...conversations[con.id],
            docs: conversations[con.id].docs,
          }
        : {}
    );
    setConversations((prev) => {
      return {
        ...prev,
        [con.id]: {
          ...conversations[con.id],
          docs: conversations[con.id].docs,
        },
      };
    });
    setCurrentPage(1);
    setCurrentContact(con);
    if (currentContact) {
      const oLdConversation = await axios.get(
        `/conversations/${currentContact.id}/messages`
      );
      setConversations((prev) => {
        return {
          ...prev,
          [currentContact.id]: oLdConversation.data,
        };
      });
    }
  };
  const changedHandler = () => {
    setChanged(false);
  };

  const addMessage = (content) => {
    socket.emit("message", {
      to: currentContact.users[
        parseInt(currentContact.users[0].id) ===
        parseInt(localStorage.getItem("userId"))
          ? 1
          : 0
      ].id, //id user
      conversation: currentContact.id, //id conversation
      content,
    });
  };

  //////////contacts last message handler
  useEffect(() => {
    if (socket) {
      socket.on("contact", (conversation) => {
        setContacts((prev) => {
          return {
            ...prev,
            [conversation.id]: {
              ...prev[conversation.id],
              lastMessage: conversation.lastMessage,
            },
          };
        });
      });
    }
  }, [socket]);


  return (
    <>
      {/* Slider */}
      <div className="container" style={{ paddingTop: "90px" }}>
        <div className={chatCss.slider_container}>
          <div className={chatCss.slider} id="slider">
            {recommendations.data
              ? recommendations.data.docs
                ? recommendations.data.docs.map((c) => (
                    <span
                      key={c.id}
                      onClick={async () => {
                        await axios.post("/create-conversation", { to: c.id });
                        fetchAll();
                      }}
                    >
                      {" "}
                      <img src={c.photo} alt={c.id} />
                    </span>
                  ))
                : ""
              : ""}
          </div>
        </div>

        <a
          className={`carousel-control-prev ${chatCss.carousel_control_prev}`}
          id="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </a>
        <a
          className={`carousel-control-next ${chatCss.carousel_control_next}`}
          id="next"
        >
          <span className="carousel-control-next-icon"></span>
        </a>
      </div>
      {/* End Slider */}

      <div className={`container ${chatCss.content}`}>
        <div className="row no-gutters">
          <Contacts
            socket={socket}
            currentHandler={currentHandler}
            currentContact={currentContact}
            contacts={contacts ? Object.values(contacts) : []}
          />
          <Messaging
            socket={socket}
            currentContact={currentContact}
            addMessage={addMessage}
            currentConversation={currentConversationMessages}
            changedHandler={changedHandler}
            changed={changed}
            currentPage={currentPage}
            pageHandler={pageHandler}
          />
        </div>
      </div>
    </>
  );
}

export default React.memo(Chat);
