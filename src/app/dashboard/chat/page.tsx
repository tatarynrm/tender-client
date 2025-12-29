// "use client";

// import {
//   Button,
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   Input,
//   Textarea,
// } from "@/shared/components/ui";
// import { useAuth } from "@/shared/providers/AuthCheckProvider";
// import { connectSocket } from "@/sockets/socketManager";
// import { useEffect, useRef, useState, KeyboardEvent } from "react";

// interface Message {
//   text: string;
//   timestamp: string;
//   fromUserId?: string;
//   toUserId?: string;
//   fromName?: string;
//   usr_id?: number;
// }

// export default function ChatComponent() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const [toUserId, setToUserId] = useState("");
//   const [roomName, setRoomName] = useState(""); // нове поле для кімнати
//   const { profile } = useAuth();
//   const [chatSocket, setChatSocket] = useState<any>(null);
//   const messagesEndRef = useRef<HTMLDivElement | null>(null);

//   // Socket connection
//   useEffect(() => {
//     if (!profile?.id) return;

//     const socket = connectSocket("chat", { query: { userId: profile.id } });
//     setChatSocket(socket);

//     socket.on("message_to_user_group", (msg: Message) => {
//       setMessages((prev) => [...prev, msg]);
//     });
//     socket.on("message_to_all", (msg: Message) => {
//       setMessages((prev) => [...prev, msg]);
//     });
//     socket.on("message_received", (msg: Message) => {
//       setMessages((prev) => [...prev, msg]);
//     });
//     socket.on("message_to_room", (msg: Message) => {
//       setMessages((prev) => [...prev, msg]);
//     });
//     socket.on("room_notification", (msg: { message: string }) => {
//       setMessages((prev) => [
//         ...prev,
//         { text: msg.message, timestamp: new Date().toISOString() },
//       ]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [profile?.id]);

//   // Scroll to bottom
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // Send message functions
//   const sendMessageToAll = () => {
//     if (!input || !chatSocket) return;
//     chatSocket.emit("send_message_to_all", {
//       text: input,
//       userId: toUserId,
//       fromName: `${profile?.surname} ${profile?.name} ${profile?.last_name}`,
//       usr_id: profile?.id,
//     });
//     setInput("");
//   };

//   const sendMessageToUser = () => {
//     if (!toUserId || !input || !chatSocket) return;
//     chatSocket.emit("send_message_to_user_group", {
//       text: input,
//       userId: toUserId,
//       fromName: `${profile?.surname} ${profile?.name} ${profile?.last_name}`,
//       usr_id: profile?.id,
//     });
//     setInput("");
//   };

//   const sendMessageToRoom = () => {
//     if (!roomName || !input || !chatSocket) return;
//     chatSocket.emit("send_message_to_room", {
//       roomName,
//       text: input,
//       fromName: `${profile?.surname} ${profile?.name} ${profile?.last_name}`,
//       usr_id: profile?.id,
//     });
//     setInput("");
//   };

//   const joinRoom = () => {
//     if (!roomName || !chatSocket) return;
//     chatSocket.emit("join_room", { roomName });
//   };

//   const leaveRoom = () => {
//     if (!roomName || !chatSocket) return;
//     chatSocket.emit("leave_room", { roomName });
//   };

//   const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       if (roomName) sendMessageToRoom();
//       else if (toUserId) sendMessageToUser();
//       else sendMessageToAll();
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto">
//       <Card className="flex flex-col h-[600px]">
//         <CardHeader>
//           <CardTitle className="text-center">
//             Chat (User {profile?.id})
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="flex-1 overflow-y-auto bg-gray-50 p-4 flex flex-col space-y-2">
//           {messages.map((msg, i) => {
//             const isOwnMessage = msg.usr_id === profile?.id;
//             return (
//               <div
//                 key={i}
//                 className={`flex ${
//                   isOwnMessage ? "justify-end" : "justify-start"
//                 }`}
//               >
//                 <div
//                   className={`px-4 py-2 rounded-lg max-w-[70%] shadow-sm ${
//                     isOwnMessage
//                       ? "bg-green-100 text-gray-800"
//                       : "bg-white text-gray-900"
//                   }`}
//                 >
//                   <div className="text-xs font-semibold mb-1">
//                     {isOwnMessage ? "Ви" : msg.fromName}
//                   </div>
//                   <div className="text-sm">{msg.text}</div>
//                   <div className="text-[10px] text-gray-500 text-right mt-1">
//                     {msg.timestamp}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//           <div ref={messagesEndRef} />
//         </CardContent>

//         <div className="p-4 space-y-3">
//           <div className="flex flex-col sm:flex-row gap-2">
//             <Input
//               placeholder="Room Name"
//               value={roomName}
//               onChange={(e) => setRoomName(e.target.value)}
//               className="flex-1"
//             />
//             <Input
//               placeholder="User ID"
//               value={toUserId}
//               onChange={(e) => setToUserId(e.target.value)}
//               className="flex-1"
//             />
//             <Textarea
//               placeholder="Type a message"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={handleKeyDown}
//               className="flex-2 resize-none"
//               rows={2}
//             />
//           </div>

//           <div className="flex gap-2 sm:gap-4 flex-wrap">
//             <Button
//               onClick={sendMessageToRoom}
//               className="flex-1 bg-purple-500 hover:bg-purple-600"
//             >
//               Send to Room
//             </Button>
//             <Button
//               onClick={joinRoom}
//               className="flex-1 bg-green-500 hover:bg-green-600"
//             >
//               Join Room
//             </Button>
//             <Button
//               onClick={leaveRoom}
//               className="flex-1 bg-red-500 hover:bg-red-600"
//             >
//               Leave Room
//             </Button>
//             <Button
//               onClick={sendMessageToUser}
//               className="flex-1 bg-blue-500 hover:bg-blue-600"
//             >
//               Send to User
//             </Button>
//             <Button
//               onClick={sendMessageToAll}
//               className="flex-1 bg-gray-500 hover:bg-gray-600"
//             >
//               Send to All
//             </Button>
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// }

"use client";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Textarea,
} from "@/shared/components/ui";
import { useAuth } from "@/shared/providers/AuthCheckProvider";

import { useEffect, useRef, useState, KeyboardEvent } from "react";

interface Message {
  text: string;
  timestamp: string;
  fromUserId?: string;
  toUserId?: string;
  fromName?: string;
  usr_id?: number;
}

export default function ChatComponent() {
  const { profile } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [toUserId, setToUserId] = useState("");
  const [roomName, setRoomName] = useState("");
  const [chatSocket, setChatSocket] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);



  const handleMessage = (msg: Message) => {
    setMessages((prev) => [...prev, msg]);
  };

  // Автоскролл
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Універсальна функція відправки
  const sendMessage = (type: "all" | "user" | "room") => {
    if (!input || !chatSocket) return;

    const payload: any = {
      text: input,
      fromName: `${profile?.surname} ${profile?.name} ${profile?.last_name}`,
      usr_id: profile?.id,
    };

    if (type === "user" && toUserId) payload.userId = toUserId;
    if (type === "room" && roomName) payload.roomName = roomName;

    chatSocket.emit(
      type === "all"
        ? "send_message_to_all"
        : type === "user"
        ? "send_message_to_user_group"
        : "send_message_to_room",
      payload
    );

    setInput("");
  };

  const joinRoom = () =>
    roomName && chatSocket?.emit("join_room", { roomName });
  const leaveRoom = () =>
    roomName && chatSocket?.emit("leave_room", { roomName });

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (roomName) sendMessage("room");
      else if (toUserId) sendMessage("user");
      else sendMessage("all");
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <Card className="flex flex-col h-[600px]">
        <CardHeader>
          <CardTitle className="text-center">
            Chat (User {profile?.id})
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto bg-gray-50 p-4 flex flex-col space-y-2">
          {messages.map((msg, i) => {
            const isOwn = msg.usr_id === profile?.id;
            return (
              <div
                key={i}
                className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-[70%] shadow-sm ${
                    isOwn
                      ? "bg-green-100 text-gray-800"
                      : "bg-white text-gray-900"
                  }`}
                >
                  <div className="text-xs font-semibold mb-1">
                    {isOwn ? "Ви" : msg.fromName}
                  </div>
                  <div className="text-sm">{msg.text}</div>
                  <div className="text-[10px] text-gray-500 text-right mt-1">
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </CardContent>

        <div className="p-4 space-y-3 w-full">
          <div className="p-4 space-y-3 w-full">
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder="Room Name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="flex-1 min-w-[100px]"
              />
              <Input
                placeholder="User ID"
                value={toUserId}
                onChange={(e) => setToUserId(e.target.value)}
                className="flex-1 min-w-[80px]"
              />
              <Textarea
                placeholder="Type a message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-2 min-w-[150px] resize-none"
                rows={2}
                style={{ flex: 2 }}
              />
            </div>
          </div>

          <div className="flex gap-2 sm:gap-4 flex-wrap">
            <Button
              onClick={() => sendMessage("room")}
              className="flex-1 bg-purple-500 hover:bg-purple-600"
            >
              Send to Room
            </Button>
            <Button
              onClick={joinRoom}
              className="flex-1 bg-green-500 hover:bg-green-600"
            >
              Join Room
            </Button>
            <Button
              onClick={leaveRoom}
              className="flex-1 bg-red-500 hover:bg-red-600"
            >
              Leave Room
            </Button>
            <Button
              onClick={() => sendMessage("user")}
              className="flex-1 bg-blue-500 hover:bg-blue-600"
            >
              Send to User
            </Button>
            <Button
              onClick={() => sendMessage("all")}
              className="flex-1 bg-gray-500 hover:bg-gray-600"
            >
              Send to All
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
