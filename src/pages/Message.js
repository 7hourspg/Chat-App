import React, { useContext, useRef, useEffect } from "react";
import "./message.css";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";
function Message({ message }) {
  const ref = useRef();
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  console.log(data);
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [Message]);
  console.log(message);

  return (
    <>
      <div className="message ">
        <div
          className={`box ${
            message.senderId === currentUser.uid ? "owner" : "sender"
          }`}
        >
          <div className="messageInfo">
            <img
              src={
                message.senderId === currentUser.uid
                  ? currentUser.photoURL
                  : data.user.photoURL
              }
              alt=""
            />
            <span>just now</span>
          </div>
          <div className="messageContent">
            <p>{message.text}</p>
            {message.img && <img src={message.img} alt="" />}
          </div>
        </div>
      
      </div>
    </>
  );
}

export default Message;
