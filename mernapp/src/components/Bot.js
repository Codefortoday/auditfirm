import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Chatbot = () => {
    //console.log("Chatbot component loaded"); // Debug log

    const [messages, setMessages] = useState([{ text: "Hello! How can I assist you?", sender: "bot" }]);
    const [userInput, setUserInput] = useState("");
    const [isOpen, setIsOpen] = useState(true); // Set to true for debugging

    const sendMessage = async () => {
        if (!userInput.trim()) return;

        setMessages(prev => [...prev, { text: userInput, sender: "user" }]);

        try {
            const response = await axios.post("http://localhost:5000/api/chat", { message: userInput });
            setMessages(prev => [...prev, { text: response.data.reply || "I'm here to assist you!", sender: "bot" }]);
           
        } catch (error) {
            console.error("Error fetching response:", error);
            setMessages(prev => [...prev, { text: "Error fetching response.", sender: "bot" }]);
        }

        setUserInput("");
    };

    return (
        <div>
            {/* Floating Chatbot Button */}
            <button 
                className="btn btn-primary rounded-circle"
                style={{ position: "fixed", bottom: "20px", right: "20px", width: "60px", height: "60px", fontSize: "24px", zIndex: 1001 }}
                onClick={() => setIsOpen(prev => !prev)}
            >
                💬
            </button>

            {/* Chatbot Window */}
            {isOpen && (
                <div 
                    className="shadow-lg p-3 rounded"
                    style={{ 
                        position: "fixed", 
                        bottom: "80px", 
                        right: "20px", 
                        width: "350px", 
                        maxHeight: "450px", 
                        background: "#fff", 
                        border: "1px solid #ddd", 
                        zIndex: 1000 
                    }}
                >
                    <div className="d-flex justify-content-between align-items-center bg-primary text-white p-2">
                        <strong>Chat with Us</strong>
                        <button className="btn btn-close btn-light" onClick={() => setIsOpen(false)}></button>
                    </div>

                    <div style={{ maxHeight: "300px", overflowY: "auto", padding: "10px" }}>
                        {messages.map((msg, index) => (
                            <div key={index} className={`mb-2 p-2 rounded ${msg.sender === "bot" ? "bg-light text-primary" : "bg-primary text-white"}`}>
                                <strong>{msg.sender === "bot" ? "Bot" : "You"}:</strong> {msg.text}
                            </div>
                        ))}
                    </div>

                    <div className="d-flex p-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Type a message..."
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <button className="btn btn-primary ms-2" onClick={sendMessage}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;




// import React, { useState } from "react";
// import "./Bot.css"; // Add CSS for styling

// const Chatbot = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [messages, setMessages] = useState([
//         { sender: "bot", text: "Hello! How can I assist you?" },
//     ]);
//     const [userInput, setUserInput] = useState("");

//     // Toggle chatbot visibility
//     const toggleChatbot = () => {
//         setIsOpen(!isOpen);
//     };

//     // Send message
//     const sendMessage = async () => {
//         if (!userInput.trim()) return;

//         const userMessage = { sender: "user", text: userInput };
//         setMessages((prevMessages) => [...prevMessages, userMessage]);

//         // Fetch response from backend (or use predefined responses)
//         const response = await fetch("http://localhost:5000/api/chat", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ message: userInput }),
//         });

//         const data = await response.json();
//         const botMessage = { sender: "bot", text: data.reply || "Sorry, I didn't understand that." };

//         setMessages((prevMessages) => [...prevMessages, botMessage]);
//         setUserInput(""); // Clear input
//     };

//     return (
//         <>
//             {/* Floating Chat Button */}
//             <div className="chatbot-icon" onClick={toggleChatbot}>
//                 💬
//             </div>

//             {/* Chatbot Container */}
//             {isOpen && (
//                 <div className="chatbot-container">
//                     <div className="chatbot-header">
//                         <span>Chat with Us</span>
//                         <button className="chatbot-close" onClick={toggleChatbot}>✖</button>
//                     </div>

//                     <div className="chatbot-messages">
//                         {messages.map((msg, index) => (
//                             <div key={index} className={`chatbot-message ${msg.sender}`}>
//                                 {msg.text}
//                             </div>
//                         ))}
//                     </div>

//                     <div className="chatbot-input-container">
//                         <input
//                             type="text"
//                             value={userInput}
//                             onChange={(e) => setUserInput(e.target.value)}
//                             placeholder="Type a message..."
//                         />
//                         <button onClick={sendMessage}>Send</button>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default Chatbot;
