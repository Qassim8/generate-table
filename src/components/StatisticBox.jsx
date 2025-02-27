import { Book, ChalkboardTeacher, Users } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import axios from "axios";

function StatisticBox() {
  const [insight, setInsight] = useState("");

  const getInsight = async () => {
    try {
      const response = await axios.get(
        "https://autogenerate-timetable-api.vercel.app/api/insights"
      );
      if (response.status === 200) {
        setInsight(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    getInsight();
  }, []);

  // const insights = insight?.map((i) => i);

  const data = [
    {
      icon: <Book className="text-indigo-500 text-lg md:text-2xl" />,
      title: "Total Courses",
      numbers: insight?.courses,
      color: "bg-indigo-500",
    },
    {
      icon: <Users className="text-emerald-400 text-lg md:text-2xl" />,
      title: "Teachers",
      numbers: insight?.teachers,
      color: "bg-emerald-500",
    },
    {
      icon: <ChalkboardTeacher className="text-amber-500 text-lg md:text-2xl" />,
      title: "Classrooms",
      numbers: insight?.classrooms,
      color: "bg-amber-400",
    },
  ];
  return (
    <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-5 py-8">
      {data.map(({ icon, title, numbers, color }, index) => (
        <div
          className={`p-5 ${color} shadow-lg rounded-md text-center`}
          key={index}
        >
          <div className="md:h-15 h-10 md:w-15 w-10 mx-auto flex justify-center items-center bg-white rounded-full">
            {icon}
          </div>
          <p className="text-slate-100 text-sm md:text-md py-3">{title}</p>
          <h2 className="font-semibold text-white md:font-bold text-3xl md:text-5xl">
            {numbers}
          </h2>
        </div>
      ))}
    </section>
  );
}

export default StatisticBox;
