const express = require('express');

const app = express();
const port = 3000;

// Create Chat Session API
fetch('https://gateway-dev.on-demand.io/chat/v1/sessions', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'apikey': 'dUWOzAJM4CNssHGQGhECArlYh4vGmjdu'
    },
    body: JSON.stringify({
        "pluginIds": [],
        "externalUserId": "<replace_external_user_id>"
    })
})
.then(response => response.json())
.then(data => {
    // Extract session ID from the response
    const sessionId = data.chatSession.id;

    // Use the session ID in the second API call
    fetch('https://gateway-dev.on-demand.io/chat/v1/sessions/${sessionId}/query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': 'dUWOzAJM4CNssHGQGhECArlYh4vGmjdu'
        },
        body: JSON.stringify({
            "endpointId": "predefined-openai-gpt4o",
            "query": "Put your query here",
            "pluginIds": ["plugin-1713962163", "plugin-1717423320"],
            "responseMode": "sync"
        })
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the second API call
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
})
.catch(error => {
    console.error('Error:', error);
});


// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
