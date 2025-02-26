import { Book, GraduationCap, Users } from "@phosphor-icons/react";

function StatisticBox() {
  const data = [
    {
      icon: <Book className="text-indigo-500 text-lg md:text-2xl" />,
      title: "Total Courses",
      numbers: "23",
      color: "bg-indigo-500",
    },
    {
      icon: <Users className="text-emerald-400 text-lg md:text-2xl" />,
      title: "Teachers",
      numbers: "50",
      color: "bg-emerald-500",
    },
    {
      icon: <GraduationCap className="text-amber-500 text-lg md:text-2xl" />,
      title: "Faculties",
      numbers: "17",
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
