import React, { useEffect, useRef, useState } from "react";
import chatCss from "../../assets/css/chat.module.css";
import Contact from "./contact";

function Contacts(props) {
  const cons = useRef();

  return (
    <div className={`col-md-4 ${chatCss.side_chat}`}>
      <div className={chatCss.search_box}>
        <div className={chatCss.merge}>
          <i className="material-icons">search</i>
          <input
            type="text"
            placeholder="Search Here"
            ref={cons}
            // onChange={(e) => dispatch(changingInput(e.target.value))}
          />
        </div>
      </div>
      <div className={chatCss.all_friends}>
        {props.contacts
          ? props.contacts.map((c) => {
              return (
                <Contact
                  key={c.id}
                  id={c.id}
                  clickedHandler={props.currentHandler}
                  createdAt={c.createdAt}
                  lastMessage={c.lastMessage}
                  meta={c.meta}
                  users={c.users}
                  currentContact={props.currentContact}
                  contact={c}
                />
              );
            })
          : ""}
      </div>
    </div>
  );
}

export default React.memo(Contacts);
