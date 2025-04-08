import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const authContext = createContext({});
function AuthProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [exist, setExist] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const token = localStorage.getItem("userToken");

  const signupUser = async (user) => {
    try {
      const response = await axios.post(
        "https://autogenerate-timetable-api.vercel.app/api/auth/register",
        {
          ...user,
        }
      );
      if (response.status === 201) {
        setOpen(true);
        setExist(false);
      }
    } catch (er) {
      if (er.response && er.response.status === 400) {
        setExist(true);
      }
    }
  };

  const getTeachers = async () => {
    try {
      const response = await axios.get(
        "https://autogenerate-timetable-api.vercel.app/api/auth/",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        console.log(response.data);
        setTeachers(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTeachers();
  }, []);

  const addDaysForTeacher = async (data) => {
    const updatedDay = {
      ...data,
      timeSlots: [{ day: data.day, start: data.start, end: data.end }],
    };
    try {
      const response = await axios.put(
        `https://autogenerate-timetable-api.vercel.app/api/auth/${data.id}`,
        updatedDay,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        console.log(response.data);
        setTeachers(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <authContext.Provider value={{ signupUser, teachers, addDaysForTeacher, open, setOpen, exist }}>
      {children}
    </authContext.Provider>
  );
}

export default AuthProvider;
