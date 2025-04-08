import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const roomsContext = createContext({});
function ClassroomProvider({ children }) {
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("userToken");
  const close = () => setOpen(false);
  const updateId = (id) => setRoomId(id);

  const getRooms = async () => {
    try {
      const response = await axios.get(
        "https://autogenerate-timetable-api.vercel.app/api/classroom",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setRooms(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) getRooms();
  }, [token]);

  useEffect(() => {
    const getRoomInfo = async () => {
      try {
        const response = await axios.get(
          `https://autogenerate-timetable-api.vercel.app/api/classroom/${roomId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 200) {
          setRoom(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (roomId) {
      getRoomInfo(roomId);
    }
  }, [roomId, token]);

  const addRoom = async (data) => {
    try {
      const response = await axios.post(
        "https://autogenerate-timetable-api.vercel.app/api/classroom",
        { ...data },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 201) {
        setRooms([...rooms, data]);
        getRooms()
        setOpen(true)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRoom = async (id) => {
    try {
      const response = await axios.delete(
        `https://autogenerate-timetable-api.vercel.app/api/classroom/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setRooms(rooms.filter((teacherList) => teacherList.id !== id));
        getRooms();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateRoom = async (data) => {
    try {
      const response = await axios.put(
        `https://autogenerate-timetable-api.vercel.app/api/classroom/${roomId}`,
        { ...data },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        setRooms(
          rooms.map((room) => (room._id === data._id ? { ...data } : room))
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addDays = async (data) => {
    try {
      const response = await axios.put(
        `https://autogenerate-timetable-api.vercel.app/api/classroom/${roomId}`,
        { ...data },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        console.log("🚀 ~ addDays ~ response:", response)
        setRooms(
          rooms.map((room) =>
            room._id === data._id ? { ...data } : room
          )
        );
        getRooms();
      }
    } catch (error) {
      console.log("🚀 ~ addDays ~ error:", error)
      console.log(error);
    }
  };

  const deleteAllRooms = async () => {
    const deletePromises = rooms.map((room) =>
      axios.delete(
        `https://autogenerate-timetable-api.vercel.app/api/classroom/${room._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
    );
    await Promise.all(deletePromises);
    setRooms([]);
  };

  return (
    <roomsContext.Provider
      value={{ rooms, room, updateId, addRoom, deleteRoom, updateRoom, addDays, open, setOpen, close, deleteAllRooms }}
    >
      {children}
    </roomsContext.Provider>
  );
}

export default ClassroomProvider;
