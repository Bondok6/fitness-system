import React, { useEffect, useState } from "react";
import chatCss from "../../assets/css/chat.module.css";
// import photo from "../../images/friend_1.png";
import Contacts from "./contacts";
import Messaging from "./messaging";
import io from "socket.io-client";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearContacts, addCoversation,setCurrentConversation1 } from "../../store";

function Chat() {
  const [contacts1, setContacts] = useState([]);
  const [currentConversation, setCurrentConversation] = useState([]);
  const [currentContact, setCurrentContact] = useState();
  const contacts = useSelector((state) => state.reducer.contacts);
  const conversations = useSelector((state) => state.reducer.conversations);
  const dispatch = useDispatch();
  const [socket, setSocket] = useState();
  const [contactForMessage, setMyContactForMessage] = useState();

  useEffect(() => {
    const s = io("https://smartfitnessgym.herokuapp.com/chat");
    s.on("connect", () => {
      // console.log("connected");
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
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (counter == sliderImages.length - contacts1.length) return;
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
  }, [contacts1.length]);

  const currentHandler = (con) => {
    setCurrentConversation(con);
  };

  const addMessage = (content) => {
    socket.emit("message", {
      to: currentContact,
      content,
    });
  };

  const current = (id) => {
    setCurrentContact(id);
  };

  useEffect(() => {
    if (contacts.docs) {
      let ids = contacts.docs.map((cs) => {
        let a = cs._id;
        return a[0] !== localStorage.getItem("userId") ? a[1] : a[0];
      });
      axios.post("/Contacts", { ids }).then((result) => {
        setContacts(result.data);
      });
    }
  }, [contacts]);
  
  const  setMyContactToMessage=(id)=>{
    setMyContactForMessage(id)
  }


  return (
    <>
      {/* Slider */}
      <div className="container" style={{ paddingTop: "90px" }}>
        <div className={chatCss.slider_container}>
          <div className={chatCss.slider} id="slider">
            {contacts1.map((c) => (
              <span
                key={c.id}
                onClick={() => {
                  if (!conversations[c.id]) {
                    dispatch(clearContacts());
                    dispatch(addCoversation(c.id, []));
                    dispatch(setCurrentConversation1(c.id))
                  }
                }}
              >
                {" "}
                <img
                  src={c.photo}
                  alt={c.id}
                  onClick={() => dispatch(clearContacts())}
                />
              </span>
            ))}
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
            current={current}
            setMyContactToMessage={setMyContactToMessage}
          />
          <Messaging
            socket={socket}
            currentConversation={currentConversation}
            addMessage={addMessage}
            currentContact={currentContact}
            currentHandler={currentHandler}
            contactForMessage={contactForMessage}
          />
        </div>
      </div>
    </>
  );
}

export default Chat;
