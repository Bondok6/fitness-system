import React, { useEffect, useRef, useState } from "react";
import chatCss from "../../assets/css/chat.module.css";
import { useSelector, useDispatch } from "react-redux";
import Contact from "./contact";
import { changingInput, clearContacts } from "../../store";
function Contacts(props) {
  const cons = useRef();
  const contacts = useSelector((state) => state.reducer.contacts);
  const conversations = useSelector((state) => state.reducer.conversations);

  const current = useSelector((state) => state.reducer.current);

  const input = useSelector((state) => state.reducer.input);

  const dispatch = useDispatch();

  const [myContact, setMyContact] = useState();

  useEffect(() => {
    if (input === "") cons.current.value = "";
  }, [input]);

  useEffect(() => {
    dispatch(clearContacts(cons.current.value));
    if (myContact !== current) {
      setMyContact(current);
      let conversation = conversations[current];
      props.currentHandler(conversation);
      props.current(current);
    }
  }, [current]);

  const clickedHandler = (id,contact) => {
    dispatch(clearContacts(cons.current.value));
    if (myContact !== id) {
      setMyContact(id);
      let conversation = conversations[id];
      props.currentHandler(conversation);
      props.current(id);
      props.setMyContactToMessage(contact)
    }
  };

  return (
    <div className={`col-md-4 ${chatCss.side_chat}`}>
      <div className={chatCss.search_box}>
        <div className={chatCss.merge}>
          <i className="material-icons">search</i>
          <input
            type="text"
            placeholder="Search Here"
            ref={cons}
            onChange={(e) => dispatch(changingInput(e.target.value))}
          />
        </div>
      </div>
      <div className={chatCss.all_friends}>
        {contacts.docs
          ? contacts.docs.map((c) => {
              return (
                <Contact
                  key={c._id}
                  clickedHandler={clickedHandler}
                  content={c.content}
                  contact={myContact}
                  info={
                    parseInt(c.me2._id) !==
                    parseInt(localStorage.getItem("userId"))
                      ? c.me2
                      : c.to
                  }
                  createdAt={c.createdAt}
                />
              );
            })
          : ""}
      </div>
    </div>
  );
}

export default Contacts;
