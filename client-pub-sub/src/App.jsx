import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
    const [socket, setSocket] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const [message, setMessage] = useState([]);
    const [latestMessage, setLatestMessage] = useState("");

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8080");
        socket.onopen = () => {
            console.log("Connected");
            setSocket(socket);
        };

        socket.onmessage = (message) => {
            console.log(message);
            setLatestMessage(message);
            setMessage((m) => [...m, message.data]);
        };

        return () => {
            socket.close();
        };
    }, []);

    const handleSendMessage = () => {
        socket.send(newMessage);
        setNewMessage("");
    };

    if (!socket) {
        return (
            <div>
                <h1>Connecting...</h1>
            </div>
        );
    }

    return (
        <>
            <div className="App">
                <h1>Latest Message: {latestMessage.data}</h1>
                <h1>Messages:</h1>
                {message.map((m, i) => (
                    <p key={i}>{m}</p>
                ))}
            </div>
            <div>
                <input
                    placeholder="Message"
                    type="text"
                    value={newMessage}
                    onChange={(e) => {
                        setNewMessage(e.target.value);
                    }}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </>
    );
}

export default App;
