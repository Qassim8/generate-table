import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const teacherContext = createContext({});
function TeachersProvider({ children }) {
  const [teachers, setTeachers] = useState([]);
  const [teacher, setTeacher] = useState(null);
  const [open, setOpen] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [teacherId, setTeacherId] = useState("");
  const token = localStorage.getItem("userToken");

  const close = () => setOpen(false);

  const getTeachers = async () => {
    try {
      const response = await axios.get(
        "https://autogenerate-timetable-api.vercel.app/api/teacher",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setTeachers(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTeachers();
  }, []);

  const updateId = (id) => setTeacherId(id);

  useEffect(() => {
    const getTeacherInfo = async () => {
      try {
        const response = await axios.get(
          `https://autogenerate-timetable-api.vercel.app/api/teacher/${teacherId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.data;
        setTeacher(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (teacherId && token) {
      getTeacherInfo();
    }
  }, [teacherId, token]);

  const addTeacher = async (data) => {
    try {
      const response = await axios.post(
        "https://autogenerate-timetable-api.vercel.app/api/teacher",
        { ...data },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 201) {
        setTeachers([...teachers, data]);
        setOpen(true);
        getTeachers();
        setInvalidEmail(false)
      }
    } catch (error) {
      if (error.response && error.response.status === 500) setInvalidEmail(true);
    }
  };

  const deleteTeacher = async (id) => {
    try {
      const response = await axios.delete(
        `https://autogenerate-timetable-api.vercel.app/api/teacher/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        setTeachers(teachers.filter((teacherList) => teacherList.id !== id));
        getTeachers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateTeacher = async (data) => {
    try {
      const response = await axios.put(
        `https://autogenerate-timetable-api.vercel.app/api/teacher/${teacherId}`,
        { ...data },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        setTeachers(
          teachers.map((teacher) =>
            teacher._id === data._id ? { ...data } : teacher
          )
        );
        getTeachers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAllTeacher = async () => {
    const deletePromises = teachers.map((teacher) =>
      axios.delete(
        `https://autogenerate-timetable-api.vercel.app/api/teacher/${teacher._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
    );
    await Promise.all(deletePromises);
    setTeachers([]);
  }

  return (
    <teacherContext.Provider
      value={{
        teachers,
        teacher,
        updateId,
        addTeacher,
        invalidEmail,
        deleteTeacher,
        updateTeacher,
        open,
        setOpen,
        close,
        deleteAllTeacher
      }}
    >
      {children}
    </teacherContext.Provider>
  );
}

export default TeachersProvider;
