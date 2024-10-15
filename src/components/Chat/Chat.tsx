import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { setRooms, setActiveRoom, addMessage } from '../../slices/chatSlice';
import { Send, Plus } from 'lucide-react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Replace with your actual backend URL

const Chat: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { rooms, activeRoom } = useSelector((state: RootState) => state.chat);
  const user = useSelector((state: RootState) => state.auth.user);
  const [message, setMessage] = useState('');
  const [newRoomName, setNewRoomName] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    // TODO: Fetch chat rooms from API
    const mockRooms = [
      { id: '1', name: 'General', messages: [] },
      { id: '2', name: 'Project A', messages: [] },
    ];
    dispatch(setRooms(mockRooms));
    dispatch(setActiveRoom(mockRooms[0].id));

    socket.on('message', (message) => {
      dispatch(addMessage({ roomId: activeRoom!, message }));
    });

    return () => {
      socket.off('message');
    };
  }, [dispatch, activeRoom]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [rooms, activeRoom]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && activeRoom) {
      const newMessage = {
        id: Date.now().toString(),
        sender: user?.username || 'Anonymous',
        content: message,
        timestamp: new Date().toISOString(),
      };
      socket.emit('sendMessage', { roomId: activeRoom, message: newMessage });
      dispatch(addMessage({ roomId: activeRoom, message: newMessage }));
      setMessage('');
    }
  };

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRoomName.trim()) {
      const newRoom = {
        id: Date.now().toString(),
        name: newRoomName,
        messages: [],
      };
      dispatch(setRooms([...rooms, newRoom]));
      setNewRoomName('');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/4 bg-white border-r">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Chat Rooms</h2>
          <form onSubmit={handleCreateRoom} className="mb-4">
            <div className="flex">
              <input
                type="text"
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
                placeholder="New room name"
                className="flex-grow p-2 border rounded-l"
              />
              <button type="submit" className="bg-blue-500 text-white p-2 rounded-r">
                <Plus size={20} />
              </button>
            </div>
          </form>
          <ul>
            {rooms.map((room) => (
              <li
                key={room.id}
                className={`p-2 cursor-pointer ${activeRoom === room.id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                onClick={() => dispatch(setActiveRoom(room.id))}
              >
                {room.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex-grow flex flex-col">
        <div className="flex-grow overflow-y-auto p-4">
          {activeRoom && rooms.find((room) => room.id === activeRoom)?.messages.map((msg) => (
            <div key={msg.id} className="mb-4">
              <p className="font-semibold">{msg.sender}</p>
              <p className="bg-white p-2 rounded shadow">{msg.content}</p>
              <p className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleString()}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSendMessage} className="p-4 bg-white border-t">
          <div className="flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow p-2 border rounded-l"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-r">
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;