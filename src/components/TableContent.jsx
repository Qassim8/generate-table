import { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { tableContext } from "../context/TableProvider";

function TableContent() {
  const role = localStorage.getItem("userRole");
  const { tableData, updateTable, rejectTable } = useContext(tableContext);
  const [columns, setColumns] = useState([]); // 🔄 إنشاء الأعمدة ديناميكيًا
  const [formattedData, setFormattedData] = useState([]);

  useEffect(() => {
    if (tableData.length === 0) return; // ✅ تجنب الأخطاء إذا لم تكن هناك بيانات بعد

    // ✅ استخراج جميع الأوقات الفريدة (بدون تكرار)
    const uniqueTimes = [
      ...new Set(
        tableData.map((item) => `${item.time.start} - ${item.time.end}`)
      ),
    ].sort(); // ✅ ترتيب الأوقات تصاعديًا

    setFormattedData(tableData); // ✅ تخزين البيانات كما هي

    // ✅ إعداد الأعمدة بناءً على الأوقات المتاحة
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
          // ✅ البحث عن المحاضرات المطابقة لهذا الوقت
          const sessions = formattedData.filter(
            (session) =>
              session.day === row.day &&
              `${session.time.start} - ${session.time.end}` === time
          );

          sessions.map((session) => console.log(session.status === "approved"));

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
            : "---"; // ✅ إذا لم يكن هناك محاضرة في هذا الوقت
        },
      })),
    ];

    setColumns(dynamicColumns);
  }, [tableData, formattedData, updateTable, rejectTable, role]);

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
        borderRight: "1px solid #ddd", // 🏛️ إضافة خط بين الأعمدة
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
