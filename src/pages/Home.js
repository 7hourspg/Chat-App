import React, { useContext, useState, useEffect } from "react";
import "./Home.css";
import { AiOutlineLogout } from "react-icons/ai";
import { IoIosVideocam } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import { TiUserAdd } from "react-icons/ti";
import Message from "./Message";
import Input from "./Input";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { AuthContext } from "../Context/AuthContext";
import Search from "./Search";

import { doc, onSnapshot } from "firebase/firestore";
import { ChatContext } from "../Context/ChatContext";
function Home() {
  const { currentUser } = useContext(AuthContext);

  const [chats, setChats] = useState([]);

  const { dispatch } = useContext(ChatContext);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  console.log(messages);

  return (
    <>
      <div className="home_ctr">
        <div className="inner_ctr">
          <div className="left_ctr">
            <div className="left_header">
              <img src={currentUser.photoURL} alt="" />
              <div style={{ color: "red" }}> {currentUser.displayName}</div>
              <div style={{ cursor: "pointer" }} className="div">
                <AiOutlineLogout
                  onClick={() => signOut(auth)}
                  size="2rem"
                  color="white"
                />
              </div>
            </div>
            {/* <hr /> */}
            <div className="user_box">
              <Search />
              {Object.entries(chats)
                ?.sort((a, b) => b[1].date - a[1].date)
                .map((chat) => (
                  <div
                    className="each_user"
                    key={chat[0]}
                    onClick={() => handleSelect(chat[1].userInfo)}
                  >
                    <img src={chat[1].userInfo.photoURL} alt="" />
                    <div className="name_chat">
                      <p className="name">{chat[1].userInfo.displayName}</p>
                      <p className="chat">{chat[1].lastMessage?.text}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="right_ctr">
            <div className="right_header">
              <div className="right_h_left">
                <div className="img_ctr">
                  <img src={data.user?.photoURL} alt="" />
                  <p>{data.user?.displayName}</p>
                </div>
              </div>
              <div className="right_h_rght">
                <div className="icon">
                  <IoIosVideocam color="white" size="1.8rem" />
                </div>
                <div className="icon">
                  <TiUserAdd color="white" size="1.8rem" />
                </div>
                <div className="icon">
                  <BsThreeDots color="white" size="1.8rem" />
                </div>
              </div>
            </div>
            <div className="messages">
              {messages.map((m) => (
                <Message message={m} key={m.id} />
              ))}
            </div>
            <div className="input">
              <Input />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
