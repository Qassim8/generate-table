import { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { tableContext } from "../context/TableProvider";

function TableContent() {
  const role = localStorage.getItem("userRole");
  const { tableData, updateTable, rejectTable } = useContext(tableContext);
  const [columns, setColumns] = useState([]); // Columns will be set dynamically
  const [formattedData, setFormattedData] = useState([]);

  // Define days of the week to ensure all are present
  const daysOfWeek = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];

  useEffect(() => {
    if (tableData.length === 0) return; // Prevent errors if no data

    // Extract unique times (without duplicates) and sort them
    const uniqueTimes = [
      ...new Set(
        tableData.map((item) => `${item.time.start} - ${item.time.end}`)
      ),
    ].sort();

    // Ensure formattedData contains all days of the week
    const allDaysData = daysOfWeek.map((day) => ({ day }));

    // Populate formattedData with all days, regardless of the tableData
    setFormattedData(allDaysData);


    // Setup dynamic columns based on available times
    const dynamicColumns = [
      {
        name: "Day",
        selector: (row) => row.day,
        width: "120px",
        style: { fontWeight: "bold", textAlign: "center" },
      },
      ...uniqueTimes.map((time) => ({
        name: time,
        selector: (row) => {
          // Filter sessions for the current day and time
          const sessions = tableData.filter(
            (session) =>
              session.day === row.day &&
              `${session.time.start} - ${session.time.end}` === time
          );

          return sessions.length > 0
            ? sessions.map((session) =>
              role === "admin" ? (
                <div key={session._id} className="text-sm py-3">
                  <span className="font-semibold text-indigo-600">
                    {session.course}
                  </span>
                  <div className="text-gray-500">Dr. {session.teacher}</div>
                  <div className="text-gray-400">{session.classroom}</div>
                  <div className="flex items-center gap-3">
                    {session.status === "approved" ? (
                      ""
                    ) : (
                      <button
                        className="my-2 p-2 text-[12px] bg-emerald-500 text-white rounded-sm cursor-pointer"
                        onClick={() => updateTable(session)}
                      >
                        approve
                      </button>
                    )}
                    <button
                      className="my-2 p-2 text-[12px] bg-red-500 text-white rounded-sm cursor-pointer"
                      onClick={() => rejectTable(session)}
                    >
                      reject
                    </button>
                  </div>
                </div>
              ) : role !== "admin" && session.status === "approved" ? (
                <div key={session._id} className="text-sm py-3">
                  <span className="font-semibold text-indigo-600">
                    {session.course}
                  </span>
                  <div className="text-gray-500">Dr. {session.teacher}</div>
                  <div className="text-gray-400">{session.classroom}</div>
                </div>
              ) : (
                ""
              )
            )
            : "---"; // Display "---" if no session is found for that time
        },
      })),
    ];

    setColumns(dynamicColumns);
  }, [tableData, updateTable, rejectTable, role]);

  const customStyles = {
    table: {
      style: {
        border: "1px solid #ddd",
        borderRadius: "5px",
        overflow: "hidden",
      },
    },
    headCells: {
      style: {
        border: "1px solid #ddd",
        backgroundColor: "#3F51B5",
        color: "white",
        fontSize: "18px",
        fontWeight: "semibold",
        padding: "20px",
      },
    },
    cells: {
      style: {
        marginInline: "auto",
        borderRight: "1px solid #ddd", // Add line between columns
      },
    },
  };

  return (
    <div>
      <DataTable
        columns={columns}
        data={formattedData}
        customStyles={customStyles}
        highlightOnHover
        responsive
      />
    </div>
  );
}

export default TableContent;
