import axios from "axios";
import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';

export const tableContext = createContext({});

function TableProvider({ children }) {
  const [tableData, setTableData] = useState([]);
  const token = localStorage.getItem("userToken");
  const [empty, setEmpty] = useState(false);

  const getTableData = async () => {
    try {
      const response = await axios.get(
        "https://autogenerate-timetable-api.vercel.app/api/timetable"
      );
      const data = response.data;
      if (response.status === 200) {
        setTableData(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTableData();
  }, []);

  const genarateTable = async (data) => {
    try {
      const response = await axios.post(
        "https://autogenerate-timetable-api.vercel.app/api/timetable/generate",
        { ...data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        getTableData();
        console.log(response.data.timetable.length);
        if (response.data.timetable.length === 0) {
          setEmpty(true);
        } else {
          setEmpty(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateTable = async (data) => {
    try {
      const response = await axios.put(
        `https://autogenerate-timetable-api.vercel.app/api/timetable/update-timetable-status/${data._id}`,
        { ...data, status: "approved" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setTableData(
          tableData.map((field) => (field.id === data.id ? { ...data } : field))
        );
        getTableData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const rejectTable = async (data) => {
    try {
      const response = await axios.put(
        `https://autogenerate-timetable-api.vercel.app/api/timetable/update-timetable-status/${data._id}`,
        { ...data, status: "rejected" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setTableData(
          tableData.map((field) =>
            field.id === data.id ? { ...data } : field
          )
        );
        getTableData();

      }
    } catch (err) {
      console.log(err);
    }
  };


  const clearTable = async () => {
    try {
      const response = await axios.delete(
        `https://autogenerate-timetable-api.vercel.app/api/timetable/delete-timetable`
      );
      if (response.status === 200) {
        getTableData();
        setTableData([]);
        window.location.reload()
      }
    } catch (error) {
      console.log("Error clearing cart:", error);
    }
  };

  return (
    <tableContext.Provider
      value={{ tableData, genarateTable, updateTable, rejectTable, clearTable, empty, setEmpty }}
    >
      {children}
    </tableContext.Provider>
  );

}

TableProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default TableProvider;
