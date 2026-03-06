'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Send, Sun, Moon } from "lucide-react";

export default function BreathEase() {
  const [messages, setMessages] = useState([
    { text: "Welcome to BreathEase! How can I help you today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { 
          text: "Thank you for your message. Let's practice some breathing exercises together. Take a deep breath in for 4 seconds, hold for 4 seconds, and exhale for 4 seconds.", 
          sender: "bot" 
        }
      ]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-4 transition-all ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <div className="absolute top-4 right-4">
        <Button 
          onClick={() => setDarkMode(!darkMode)} 
          variant="outline"
          size="icon"
          className={`rounded-full ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-200"}`}
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
      
      <Card className={`w-full max-w-md shadow-xl rounded-2xl overflow-hidden transition-all ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}>
        <CardContent className="p-6 space-y-4">
          <h1 className={`text-3xl font-bold text-center mb-6 ${
            darkMode ? "text-green-400" : "text-green-600"
          }`}>
            BreathEase
          </h1>
          
          <div className={`h-[400px] overflow-y-auto p-4 space-y-4 rounded-lg transition-all ${
            darkMode ? "bg-gray-900" : "bg-gray-50"
          }`}>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                className={`flex ${msg.sender === "bot" ? "justify-start" : "justify-end"}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`max-w-[80%] p-3 rounded-2xl ${
                  msg.sender === "bot"
                    ? darkMode
                      ? "bg-green-600 text-white"
                      : "bg-green-500 text-white"
                    : darkMode
                    ? "bg-blue-600 text-white"
                    : "bg-blue-500 text-white"
                }`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="flex items-center space-x-2 pt-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className={`flex-1 transition-all ${
                darkMode
                  ? "bg-gray-700 text-white placeholder-gray-400 border-gray-600"
                  : "bg-gray-50 text-black placeholder-gray-500 border-gray-300"
              }`}
            />
            <Button
              onClick={handleSend}
              className={`px-4 ${
                darkMode
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-green-500 hover:bg-green-600"
              } text-white`}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 