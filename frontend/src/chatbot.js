import React, { useState } from "react";
import Pnr from "./pnr";
import Trainstatus from "./trainstatus";

const ChatComponent = () => {
  const prompt = {
    1: "fetch all Trains between JUC to LKO on 15-06-2024",
    2: "seat availabilty in 13006 from JUC to LKO on 15-06-2024 in 2A",
    3: "Fare for train 13006 from JUC to LKO",
    4: "Live status of train 13006",
    5: "get train schedule of train 13006",
    6: "fetch PNR 213476892",
  };

  // useState used
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [pnr, setPnr] = useState("");
  const [tnumber, setTnumber] = useState("");
  const [pnrdata, setPnrdata] = useState({});
  const [flag, setFlag] = useState(false);
  const [flag2, setFlag2] = useState(false);
  const [livedata, setLivedata] = useState({});
  const [selectedValue, setSelectedValue] = useState("0");

  // handleFunction
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handlepnrInputChange = (e) => {
    setPnr(e.target.value);
  };
  const handletrainno = (e) => {
    setTnumber(e.target.value);
  };
  const handlepnr2 = async () => {
    // Ensure train number and selected value are provided
    if (!tnumber || !selectedValue) {
      console.error("Train number and start day are required.");
      return;
    }

    const apiKey = process.env.REACT_APP_RAPIDAPI_KEY;
    console.log(apiKey);

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "irctc1.p.rapidapi.com",
      },
    };

    const queryParams = new URLSearchParams({
      trainNo: tnumber,
      startDay: selectedValue,
    });

    setTnumber("");
    const url = `https://irctc1.p.rapidapi.com/api/v1/liveTrainStatus?${queryParams}`;

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      if (data && data.data) {
        setFlag2(true);
        setLivedata(data.data);
      } else {
        console.error("Invalid data format received from API.");
        setFlag2(false); // Optionally, set flag to false to indicate no valid data
      }
    } catch (error) {
      console.error("Error fetching live train status:", error);
      setFlag2(false); // Optionally, set flag to false to indicate an error occurred
    }
  };

  const handlepnr = async () => {
    // Ensure PNR number is provided
    if (!pnr) {
      console.error("PNR number is required.");
      return;
    }

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
        "X-RapidAPI-Host": "irctc1.p.rapidapi.com",
      },
    };

    const params = {
      pnrNumber: `${pnr}`,
    };

    setPnr("");
    const queryString = new URLSearchParams(params).toString();
    const url = `https://irctc1.p.rapidapi.com/api/v3/getPNRStatus?${queryString}`;

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Received response from API");

      // Check if data is valid
      if (data && data.data && data.data.passengerStatus) {
        setPnrdata(data.data);
        setFlag(true);
      } else {
        // Handle case where data is not in expected format
        console.error("Invalid data format received from API.");
        setFlag(false); // Optionally, you can set a flag to false to indicate no valid data
      }
    } catch (error) {
      // Log and handle errors
      console.error("Error fetching PNR status:", error);
      // Optionally, set an error message state to display to the user
      setFlag(false); // Optionally, you can set a flag to false to indicate an error occurred
    }
  };

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

  const handleSendMessage = () => {
    if (input.trim() === "") return;
    const userMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    console.log(input);
    handleClick(input);
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
      <div>
        <div className="flex flex-col h-screen bg-blue-50 w-[60vw] h-[80vh]  border border-blue-300 solid border-2 rounded-md m-2">
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
          <div className="h-[80px] p-[5px] flex flex-wrap gap-1">
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
        <div className="text-[1.3rem] text-black-400 font-semibold font-mono">
          Indian Railways is more than just a means of transport; it is a
          lifeline that connects the nation.
        </div>
      </div>
      <div>
        <div className="">
          <div className="  flex flex-col p-4 w-[40vw] bg-white  border-t border-gray-300">
            <div className="flex">
              <input
                type="text"
                value={pnr}
                onKeyDown={handleKeyPress}
                onChange={handlepnrInputChange}
                className=" p-2 border border-gray-300 w-[25vw] rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter PNR Number"
              />

              <button
                onClick={handlepnr}
                className="ml-2 px-4  w-fit py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Find PNR Status
              </button>
            </div>
            {flag ? <Pnr pnrdata={pnrdata} /> : ""}
          </div>
        </div>
        {/* train live status */}
        <div className="">
          <div className="  flex flex-col p-4 w-[40vw] bg-white  border-t border-gray-300">
            <div className="flex">
              <input
                type="text"
                value={tnumber}
                onKeyDown={handleKeyPress}
                onChange={handletrainno}
                className=" p-2 border border-gray-300 w-[20vw] rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter Train Number"
              />
              <select
                value={selectedValue}
                onChange={handleChange}
                className="appearance-none bg-white border border-gray-300 rounded-md ml-[7px] py-2 px-4 leading-tight focus:outline-none focus:border-blue-500"
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>

              <button
                onClick={handlepnr2}
                className="ml-2 px-4  w-fit py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Enter Train Number
              </button>
            </div>
            {flag2 ? <Trainstatus livedata={livedata} /> : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
