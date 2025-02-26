import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const departmentContext = createContext({});
function DepartmentProvider({ children }) {
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState(null);
  const [departmentId, setDepartmentId] = useState(null);
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("userToken");
  const updateId = (id) => setDepartmentId(id);
  const close = () => setOpen(false);
  const getDepartments = async () => {
    try {
      const response = await axios.get(
        "https://autogenerate-timetable-api.vercel.app/api/department",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setDepartments(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) getDepartments();
  }, [token]);

  const getDepartmentInfo = async (id) => {
    try {
      const response = await axios.get(
        `https://autogenerate-timetable-api.vercel.app/api/department/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setDepartment(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (departmentId) {
      getDepartmentInfo(departmentId);
    }
  }, [departmentId]);

  const addDepartment = async (data) => {
    try {
      const response = await axios.post(
        "https://autogenerate-timetable-api.vercel.app/api/department",
        { ...data },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 201) {
        setDepartments([...departments, data]);
        getDepartments();
        setOpen(true)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDepartment = async (id) => {
    try {
      const response = await axios.delete(
        `https://autogenerate-timetable-api.vercel.app/api/department/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setDepartments(
          departments.filter((teacherList) => teacherList.id !== id)
        );
        getDepartments();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateDepartment = async (data) => {
    try {
      const response = await axios.put(
        `https://autogenerate-timetable-api.vercel.app/api/department/${departmentId}`,
        { ...data },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        setDepartments(
          departments.map((depart) =>
            depart._id === data._id ? { ...data } : depart
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAllDepartment = async () => {
    const deletePromises = departments.map((depart) =>
      axios.delete(
        `https://autogenerate-timetable-api.vercel.app/api/teacher/${depart._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
    );
    await Promise.all(deletePromises);
    setDepartments([]);
  };

  return (
    <departmentContext.Provider
      value={{
        departments,
        department,
        updateId,
        getDepartments,
        addDepartment,
        deleteDepartment,
        updateDepartment,
        open,
        setOpen,
        close,
        deleteAllDepartment
      }}
    >
      {children}
    </departmentContext.Provider>
  );
}

export default DepartmentProvider;
