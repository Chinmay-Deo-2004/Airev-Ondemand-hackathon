import React, { useState } from "react";

const ChatComponent = () => {
  const prompt = {
    1: "fetch all Trains between JUC to LKO on 15-06-2024",
    2: "seat availabilty in 13006 from JUC to LKO on 15-06-2024 in 2A",
    3: "Fare for train 13006 from JUC to LKO",
    4: "Live status of train 13006",
    5: "get train schedule of train 13006",
    6: "fetch PNR 213476892",
  };
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  /////////////////
  const handleClick = (query) => {
    fetch("https://gateway-dev.on-demand.io/chat/v1/sessions", {
      method: "POST",
      headers: {
        apikey: "72o4XjY4mxy5GWZHcX1rZEjAnFpT0YGk",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pluginIds: [],
        externalUserId: "Cardinal Chaos",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Extract session ID from the response
        const sessionId = data.chatSession.id;

        // Use the session ID in the second API call
        fetch(
          `https://gateway-dev.on-demand.io/chat/v1/sessions/${sessionId}/query`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              apikey: "72o4XjY4mxy5GWZHcX1rZEjAnFpT0YGk",
            },
            body: JSON.stringify({
              endpointId: "predefined-openai-gpt4o",
              query: query,
              pluginIds: [
                "plugin-1717437227",
                "plugin-1717438057",
                "plugin-1717436560",
                "plugin-1717439183",
                "plugin-1717435999",
                "plugin-1717434994",
                "plugin-1717445098",
              ],
              responseMode: "sync",
            }),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            // Handle the response from the second API call
            console.log(data);
            console.log(data.chatMessage.answer);
            const botMessage = { sender: "bot", text: data.chatMessage.answer };

            //   // Add the bot response to the chat
            setMessages((prevMessages) => [...prevMessages, botMessage]);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  ///////////////////
  const handleSendMessage = () => {
    if (input.trim() === "") return;

    // Add the user message to the chat
    const userMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    console.log(input);
    handleClick(input);
    // try {
    //   const response = await fetch("http://localhost:3000/chat", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ text: input }),
    //   });

    //   const data = await response.json();
    //   const botMessage = { sender: "bot", text: data.reply };

    //   // Add the bot response to the chat
    //   setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
    // } catch (error) {
    //   console.error("Error sending message:", error);
    // }

    // Clear the input field
    setInput("");
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };
  const handlepromptClick = (id, value) => {
    setInput(value);
  };

  return (
    <div className="flex">
      <div className="flex flex-col h-screen bg-blue-50 w-[60vw]  border border-blue-300 solid border-2 rounded-md m-2">
        <h1 className="text-2xl  m-auto text-[blue] font-semibold  italic">
          Train Bot
        </h1>
        <hr></hr>
        <hr></hr>

        <div className="flex-1 p-4 overflow-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${
                message.sender === "user" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block p-2 rounded-lg ${
                  message.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
        <hr className="text-black"></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <div className="h-[120px] p-[5px] flex flex-wrap gap-1">
          <h2 className="italic">Try these :-</h2>
          {Object.entries(prompt).map(([id, value]) => (
            <span
              key={id}
              className="m-[1px] px-2 text-[15px] py-1 bg-blue-400 text-white rounded-lg hover:bg-blue-300 cursor-pointer italic"
              onClick={() => handlepromptClick(id, value)}
            >
              {value}
            </span>
          ))}
        </div>
        <div className="p-4 bg-white border-t border-gray-300">
          <div className="flex">
            <input
              type="text"
              value={input}
              onKeyDown={handleKeyPress}
              onChange={handleInputChange}
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Type your message..."
            />

            <button
              onClick={handleSendMessage}
              className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="p-4 bg-white border-t border-gray-300">
          <div className="flex">
            <input
              type="text"
              value={input}
              onKeyDown={handleKeyPress}
              onChange={handleInputChange}
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Type your message..."
            />

            <button
              onClick={handleSendMessage}
              className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Find PNR Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
