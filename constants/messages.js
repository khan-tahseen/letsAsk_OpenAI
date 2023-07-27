function getMessage({ text }) {
  return {
    _id: Math.random().toString(36).substring(7), // unique id
    text: text || "", // answer from OpenAI API call
    createdAt: new Date(), // timestamp at which this is received by me
    user: {
      _id: 1,
      name: "OpenAI Bot 🤖",
      // avatar: require("../assets/tahseen.png"),
    },
  };
}

function sendMessage(inputMessage) {
  return {
    _id: Math.random().toString(36).substring(7), // unique id of the message
    text: inputMessage || "", // message to send or receive
    createdAt: new Date(), // current time stamp for when it was sent
    user: {
      _id: 2,
    },
  };
}

function getImage({ image }) {
  return {
    _id: Math.random().toString(36).substring(7), // unique id
    createdAt: new Date(), // timestamp at which this is received by me
    text: "Image",
    user: {
      _id: 1,
      name: "OpenAI Bot 🤖",
      // avatar: require("../assets/tahseen.png"),
    },
    image,
  };
}

export { getMessage, sendMessage, getImage };
