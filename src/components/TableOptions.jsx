import { useContext } from "react";
import { useForm } from "react-hook-form";
import { teacherContext } from "../context/TeachersProvider";
import { courseContext } from "../context/CoursesProvider";
import { roomsContext } from "../context/ClassroomProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import { tableSchema } from "../utils/validationSchema";
import { tableContext } from "../context/TableProvider";

function TableOptions() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(tableSchema),
  });
    const {genarateTable} = useContext(tableContext)

  const { teachers } = useContext(teacherContext);
  const { courses } = useContext(courseContext);
  const { rooms } = useContext(roomsContext);

  // ✅ تحديث كل مصفوفة بشكل منفصل عند التحديد أو الإلغاء
  const handleCheckboxChange = (event, fieldName) => {
    const { value, checked } = event.target;
    const currentValues = watch(fieldName) || [];

    const updatedValues = checked
      ? [...currentValues, value] // إضافة القيم المحددة
      : currentValues.filter((id) => id !== value); // إزالة القيم غير المحددة

    setValue(fieldName, updatedValues); // تحديث القيم في `react-hook-form`
    };
    
      const onSubmit = (data) => {
          console.log("🚀 البيانات المرسلة:", data);
          genarateTable(data)
      };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 md:gap-0 space-y-6 mb-5"
    >
      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex-1">
          <label htmlFor="subject" className="block font-bold text-gray-800">
            Select Teacher
          </label>
          <div className="mt-2">
            {teachers.map((teacher) => (
              <div key={teacher._id}>
                <input
                  type="checkbox"
                  name={teacher.name}
                  value={teacher._id}
                  {...register("teacherIds")}
                  onChange={(e) => handleCheckboxChange(e, "teacherIds")}
                  className="w-4 h-4 cursor-pointer peer-checked:bg-indigo-600"
                />
                <span className="text-gray-700 font-semibold ms-3">
                  {teacher.name}
                </span>
              </div>
            ))}
            {errors.teacherIds && (
              <p className="text-red-500 text-sm">
                {errors.teacherIds.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex-1">
          <label htmlFor="subject" className="block font-bold text-gray-800">
            Select Courses
          </label>
          <div className="mt-2">
            {courses.map((course) => (
              <div key={course._id}>
                <input
                  type="checkbox"
                  name={course.title}
                  value={course._id}
                  {...register("courseIds")}
                  onChange={(e) => handleCheckboxChange(e, "courseIds")}
                  className="w-4 h-4 cursor-pointer peer-checked:bg-indigo-600"
                />
                <span className="text-gray-700 font-semibold ms-3">
                  {course.title}
                </span>
              </div>
            ))}
            {errors.courseIds && (
              <p className="text-red-500 text-sm">{errors.courseIds.message}</p>
            )}
          </div>
        </div>
        <div className="flex-1">
          <label htmlFor="subject" className="block font-bold text-gray-900">
            Select Classroom
          </label>
          <div className="mt-2">
            {rooms.map((room) => (
              <div key={room._id}>
                <input
                  type="checkbox"
                  name={room.name}
                  value={room._id}
                  {...register("classroomIds")}
                  onChange={(e) => handleCheckboxChange(e, "classroomIds")}
                  className="w-4 h-4 cursor-pointer"
                />
                <span className="text-gray-700 font-semibold ms-3">
                  {room.name}
                </span>
              </div>
            ))}
            {errors.classroomIds && (
              <p className="text-red-500 text-sm">
                {errors.classroomIds.message}
              </p>
            )}
          </div>
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="flex justify-center rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm cursor-pointer hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Genarate Table
        </button>
      </div>
    </form>
  );
}

export default TableOptions;
