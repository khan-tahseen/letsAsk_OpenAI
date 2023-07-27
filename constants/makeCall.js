function makePostCall(inputMessage) {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer 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",
    },
    body: JSON.stringify({
      messages: [{ role: "user", content: inputMessage || "" }],
      model: "gpt-3.5-turbo",
    }),
  };
}

function makePostCallForImage(inputMessage) {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer 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",
    },
    body: JSON.stringify({
      prompt: inputMessage || "",
      n: 1,
      size: "1024x1024",
    }),
  };
}

export { makePostCall, makePostCallForImage };
