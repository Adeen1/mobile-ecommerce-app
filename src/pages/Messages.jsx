import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import "../message.css";
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { isLoading, isAuthenticated, user } = useAuth0();
  const [listUsers, setListUsers] = useState([]);
  const [conId, setConId] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post("http://localhost:5000/api/chat/addMsg", {
        conversationId: conId,
        senderEmail: user.email,
        text: input,
      })
      .then((res) => {
        console.log(res.data, "in sending msg");
      })
      .catch((err) => {
        console.log(err);
      });
    setInput("");
  };

  //handling click on user
  const handleUserClick = async (clickedUser) => {
    let convoId = clickedUser._id;
    setConId(convoId);
    await axios
      .post(`http://localhost:5000/api/chat/getMessage/${convoId}`)
      .then((res) => {
        console.log(res.data);
        setMessages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchUsers = async () => {
    await axios
      .get(`http://localhost:5000/api/chat/getConvo/${user.email}`)
      .then((res) => {
        console.log(res.data);
        setListUsers(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (isLoading == false) {
      fetchUsers();
    }
  }, [isLoading]);

  return (
    <>
      {" "}
      <div style={styles.header}>
        <Navbar />
        <div style={styles.wrapper}>
          <div style={styles.sidebar}>
            {isLoading ||
              listUsers.map((users) =>
                users.members.map((single) => {
                  if (single != user.email) {
                    return (
                      <div
                        style={{
                          ...styles.user,
                          backgroundColor: "white",
                        }}
                        onClick={() => handleUserClick(users)}
                      >
                        {single.split("@")[0]}
                      </div>
                    );
                  }
                })
              )}
          </div>
          <div style={styles.messageWrapper}>
            <div style={styles.messagesContainer}>
              {messages.length == 0 ? (
                <h4 style={{ textAlign: "center" }}>NO CONVERSATION OPEN</h4>
              ) : (
                messages.map((message) => (
                  <div
                    style={{
                      float:
                        message.senderEmail == user.email ? "right" : "left",
                    }}
                  >
                    <p
                      key={message.id}
                      style={{
                        ...styles.message,
                        backgroundColor:
                          message.senderEmail == user.email
                            ? "green"
                            : "yellow",
                        color: "white",
                        display: "inline-block",
                      }}
                    >
                      {message.text}
                    </p>
                    <span
                      style={{
                        fontSize: "10px",
                        display: "inline-block",
                        marginTop: "20px ",
                        float:
                          message.senderEmail == user.email ? "right" : "left",
                      }}
                    >
                      {message.senderEmail}
                    </span>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={handleSubmit} style={styles.inputContainer}>
              <input
                style={styles.input}
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "row",
    height: "100vh",
  },
  messageWrapper: {
    width: "75%",
  },
  messagesContainer: {
    paddingTop: "120px",

    maxWidth: "100%",
    height: "89%",
    display: "flex",
    flexDirection: "column",
  },
  message: {
    borderRadius: "1rem",
    margin: "0px 10px 0px 20px",
    padding: "1rem",
    marginBottom: "",
    float: "right",
  },
  inputContainer: {
    padding: "1rem",
    display: "flex",
    backgroundColor: "gray",
  },
  input: {
    flex: 1,
    padding: "0.5rem",
    borderRadius: "0.5rem",
    border: "none",
    outline: "none",
    marginRight: "1rem",
  },
  sidebar: {
    width: "25%",
    height: "100%",
    paddingTop: "150px",
    backgroundColor: "yellow",
    display: "flex",
    flexDirection: "column",
  },
  user: {
    padding: 10,
    cursor: "pointer",
    border: "2px solid black",
    margin: "5px",
    borderRadius: "20px",
  },
};

export default Chat;
