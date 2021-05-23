import React from "react";
import chatCss from "../../assets/css/chat.module.css";
import moment from 'moment'
function Contact(props) {
  return (
    <>
      <div class={`${chatCss.friend} ${props.contact===props.info._id?chatCss.active:""}`} onClick={()=>props.clickedHandler(props.info._id,props.info)}>
        <img src={props.info.photo} alt="friend image" class={chatCss.friend__img} />
        <div class={chatCss.friend__text}>
          <h6>{props.info.username}</h6>
          <p>{props.content}</p>
        </div>
        <span class={chatCss.time}>{moment(props.createdAt).format('YY/MM/DD hh:mm')}</span>
      </div>
      <hr />
    </>
  );
}

export default Contact;
