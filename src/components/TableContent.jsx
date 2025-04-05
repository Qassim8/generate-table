import { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { tableContext } from "../context/TableProvider";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Download } from "@phosphor-icons/react";

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

  const exportScheduleToPDF = () => {
    if (tableData.length === 0) {
      alert("No data available");
      return;
    }

    const doc = new jsPDF();

    const uniqueTimes = [
      ...new Set(
        tableData.map((item) => `${item.time.start} - ${item.time.end}`)
      ),
    ].sort();

    const headers = ["Day", ...uniqueTimes];

    const body = daysOfWeek.map((day) => {
      const row = [day];

      uniqueTimes.forEach((time) => {
        const sessions = tableData.filter(
          (session) =>
            session.day === day &&
            `${session.time.start} - ${session.time.end}` === time
        );

        if (sessions.length > 0) {
          const cellText = sessions
            .filter(
              (session) => session.status === "approved" || role === "admin"
            )
            .map((session) => {
              return `${session.course}\nDr. ${session.teacher}\n${session.classroom}`;
            })
            .join("\n\n");

          row.push(cellText);
        } else {
          row.push("---");
        }
      });

      return row;
    });


    autoTable(doc,{
      head: [headers],
      body,
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [41, 128, 185], halign: "center" },
      columnStyles: { 0: { fontStyle: "bold", halign: "center" } },
      margin: { top: 20 },
    });

    doc.save("schedule.pdf");
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
      <button
        onClick={exportScheduleToPDF}
        className="flex justify-center items-center gap-2 my-5 py-2 px-6 bg-emerald-500 text-white rounded-md cursor-pointer"
      >
        <Download />
        <span>Save Table</span>
      </button>
    </div>
  );
}

export default TableContent;
