import {
  ImageBackground,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./App.styles";
import { useState } from "react";
import { makePostCall, makePostCallForImage } from "./constants/makeCall";
import { GiftedChat } from "react-native-gifted-chat";
import { getImage, getMessage, sendMessage } from "./constants/messages";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const handleButtonClick = () => {
    try {
      setInputMessage("");
      if (inputMessage.toLocaleLowerCase().startsWith("generate")) {
        generateImage();
      } else {
        generateText();
      }
    } catch (error) {
      console.log("error in handleButtonClick");
    }
  };

  const generateText = async () => {
    const messageToSend = sendMessage(inputMessage);
    setMessages((prevMsg) => GiftedChat.append(prevMsg, [messageToSend]));

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      makePostCall(inputMessage)
    );
    const data = await response.json();
    console.log("data => ", data.choices[0].message.content);

    const messageToGet = getMessage({
      text: data.choices[0].message.content.trim(),
    });
    setMessages((prevMsg) => GiftedChat.append(prevMsg, [messageToGet]));
  };

  const generateImage = async () => {
    const messageToSend = sendMessage(inputMessage);
    setMessages((prevMsg) => GiftedChat.append(prevMsg, [messageToSend]));

    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      makePostCallForImage(inputMessage)
    );
    const data = await response.json();

    const messageToGet = getImage({ image: data.data[0].url });
    setMessages((prevMsg) => GiftedChat.append(prevMsg, [messageToGet]));
  };

  const handleInputText = (text) => {
    setInputMessage(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("./assets/bg1.jpg")}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <View style={{ flex: 1 }}>
          <GiftedChat
            messages={messages}
            renderInputToolbar={() => {}}
            minInputToolbarHeight={0}
            user={{
              _id: 2,
            }}
          />
        </View>
        <View style={{ flexDirection: "row", marginVertical: 8 }}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter your question"
              placeholderTextColor={"black"}
              onChangeText={handleInputText}
              value={inputMessage}
            ></TextInput>
          </View>
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleButtonClick}
          >
            <Icon name="send" size={36} color={"white"} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
