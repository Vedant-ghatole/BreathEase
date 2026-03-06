import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  // State declarations inside the function
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  // Function to delay each word
  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord); // Append the next word with a delay
    }, 75 * index);
  };

  const onSent = async (prompt) => {
    setLoading(true); // Set loading to true when the process starts
    setResultData(""); // Clear the result area before showing new data
    try {
      // Use prompt argument if provided, otherwise use the input state
      const currentPrompt = typeof prompt === 'string' && prompt.trim() ? prompt : input;
      
      const result = await run(currentPrompt); // Pass correct prompt to API
      let responseArray = result.split("**"); // Split based on **
      let newResponse = ""; // Initialize newResponse as an empty string
      
      // Process each part of the responseArray
      for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
          newResponse += responseArray[i]; // Append normally
        } else {
          newResponse += "<b>" + responseArray[i] + "</b>"; // Wrap in <b> tags
        }
      }

      // Replace "*" with line breaks and split by spaces
      let newResponse_1 = newResponse.split("*").join("<br>");
      let newResponseArray = newResponse_1.split(" ");

      // Animate word by word
      for (let i = 0; i < newResponseArray.length; i++) {
        const nextWord = newResponseArray[i];
        delayPara(i, nextWord + " "); // Call delay function to append word with a delay
      }

      setPrevPrompt(prev => [...prev, currentPrompt]); // Add current prompt to previous prompts
      setRecentPrompt(currentPrompt); // Update the recent prompt
      setShowResult(true); // Show the result when done
    } catch (error) {
      console.error("Error sending prompt:", error);
    } finally {
      setLoading(false); // Stop loading when done
      setInput(""); // Clear the input field
    }
  };

  const contextValue = {
    onSent,
    prevPrompt,
    setPrevPrompt,
    recentPrompt,
    setRecentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
