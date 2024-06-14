// const handleClick = (query) => {
//   fetch("https://gateway-dev.on-demand.io/chat/v1/sessions", {
//     method: "POST",
//     headers: {
//       apikey: "dUWOzAJM4CNssHGQGhECArlYh4vGmjdu",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       pluginIds: [],
//       externalUserId: "Cardinal Chaos",
//     }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       // Extract session ID from the response
//       console.log(data);
//       const sessionId = data.chatSession.id;

//       // Use the session ID in the second API call
//       fetch(
//         `https://gateway-dev.on-demand.io/chat/v1/sessions/${sessionId}/query`,
//         {
//           method: "POST",
//           headers: {
//             apikey: "dUWOzAJM4CNssHGQGhECArlYh4vGmjdu",
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             endpointId: "predefined-openai-gpt4o",
//             query: `${query}`,
//             pluginIds: ["plugin-1713962163", "plugin-1717423320"],
//             responseMode: "sync",
//           }),
//         }
//       )
//         .then((response) => response.json())
//         .then((data) => {
//           // Handle the response from the second API call
//           console.log(data);
//         })
//         .catch((error) => {
//           console.error("Error:", error);
//         });
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// };

// export default handleClick;
