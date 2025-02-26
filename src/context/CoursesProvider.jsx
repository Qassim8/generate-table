import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const courseContext = createContext({});
function CoursesProvider({ children }) {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [open, setOpen] = useState(false);
  const updateId = (id) => setCourseId(id);
  const token = localStorage.getItem("userToken");

  const close = () => setOpen(false);

  const getCourses = async () => {
    try {
      const response = await axios.get(
        "https://autogenerate-timetable-api.vercel.app/api/course",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setCourses(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) getCourses();
  }, [token]);

  const getCourseInfo = async (id) => {
    try {
      const response = await axios.get(
        `https://autogenerate-timetable-api.vercel.app/api/course/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setCourse(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (courseId) {
      getCourseInfo(courseId);
    }
  }, [courseId]);

  const addCourse = async (data) => {
    try {
      const response = await axios.post(
        "https://autogenerate-timetable-api.vercel.app/api/course",
        { ...data },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 201) {
        setCourses([...courses, data]);
        getCourses()
        setOpen(true)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCourse = async (id) => {
    try {
      const response = await axios.delete(
        `https://autogenerate-timetable-api.vercel.app/api/course/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setCourses(courses.filter((coursesList) => coursesList.id !== id));
        getCourses();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateCourse = async (data) => {
    try {
      const response = await axios.put(
        `https://autogenerate-timetable-api.vercel.app/api/course/${courseId}`,
        { ...data },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        setCourses(
          courses.map((course) =>
            course._id === data._id ? { ...data } : course
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

    const deleteAllCourses = async () => {
      const deletePromises = courses.map((course) =>
        axios.delete(
          `https://autogenerate-timetable-api.vercel.app/api/teacher/${course._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
      );
      await Promise.all(deletePromises);
      setCourses([]);
    };

  return (
    <courseContext.Provider
      value={{
        courses,
        course,
        updateId,
        addCourse,
        deleteCourse,
        updateCourse,
        open,
        setOpen,
        close,
        deleteAllCourses
      }}
    >
      {children}
    </courseContext.Provider>
  );
}

export default CoursesProvider;
