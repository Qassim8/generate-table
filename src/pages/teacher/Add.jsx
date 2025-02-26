import { useForm } from "react-hook-form";
import Navbar from "../../components/Navbar";
import { useContext } from "react";
import { teacherContext } from "../../context/TeachersProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import { teacherSchema } from "../../utils/validationSchema";
import { courseContext } from "../../context/CoursesProvider";
import { departmentContext } from "../../context/DepartmentProvider";
import SuccessModal from "../../components/SuccessModal";

const AddTeacher = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(teacherSchema),
    defaultValues: {
      name: "",
      email: "",
      courseId: "",
      departmentId: "",
      qualification: "",
      schedules: [{ day: "", timeSlots: [{ start: "", end: "" }] }],
    },
  });
  const { addTeacher, open, setOpen, close } = useContext(teacherContext);
  const { courses } = useContext(courseContext);
  const { departments } = useContext(departmentContext);

  const onSubmit = (data) => {
    const trimmedData = {
      ...data,
      name: data.name.trim(),
      email: data.email.trim(),
      schedules: data.schedules.map((slot) => ({
        day: slot.day.trim(), // إزالة الفراغات من اليوم
        timeSlots: slot.timeSlots.map((time) => ({
          start: time.start.trim(), // إزالة الفراغات من وقت البداية
          end: time.end.trim(), // إزالة الفراغات من وقت النهاية
        })),
      })),
    };

    addTeacher(trimmedData);
  };
  return (
    <Navbar pageName="Add Teacher">
      <SuccessModal
        open={open}
        setOpen={setOpen}
        text="Teacher added successful"
        link="/teacher/list"
        page="Show Teachers"
        close={close}
      />
      <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-900"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("name")}
                  className="block w-full rounded-md bg-white px-4 py-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline  focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
              <p className="text-sm text-red-600">{errors.name?.message}</p>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Email Address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  {...register("email")}
                  className="block w-full rounded-md bg-white px-4 py-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline  focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
              <p className="text-sm text-red-600">{errors.email?.message}</p>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-900"
              >
                Course
              </label>
              <div className="mt-2">
                <select
                  {...register("courseId")}
                  className=" block w-full rounded-md bg-white px-4 py-3 text-base text-slate-600 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline  focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                >
                  {courses.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.title}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-red-600">
                  {errors.courseId?.message}
                </p>
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-900"
              >
                Department
              </label>
              <div className="mt-2">
                <select
                  {...register("departmentId")}
                  className=" block w-full rounded-md bg-white px-4 py-3 text-base text-slate-600 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline  focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                >
                  {departments.map((depart) => (
                    <option key={depart._id} value={depart._id}>
                      {depart.name}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-red-600">
                  {errors.departmentId?.message}
                </p>
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-900"
              >
                Qualification
              </label>
              <div className="mt-2">
                <select
                  {...register("qualification")}
                  className=" block w-full rounded-md bg-white px-4 py-3 text-base text-slate-600 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline  focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                >
                  <option value="bachelor">Bachelor</option>
                  <option value="MSc">Master</option>
                  <option value="PhD">PhD</option>
                </select>
                <p className="text-sm text-red-600">
                  {errors.qualification?.message}
                </p>
              </div>
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-900"
              >
                Work Days
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("schedules.[0].day")}
                  className="block w-full rounded-md bg-white px-4 py-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline  focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
              <p className="text-sm text-red-600">
                {errors.schedules?.[0]?.day.message}
              </p>
            </div>

            <div>
              <label
                htmlFor="starttime"
                className="block text-sm font-medium text-gray-900"
              >
                Start Time
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("schedules.[0].timeSlots.[0].start")}
                  className="block w-full rounded-md bg-white px-4 py-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline  focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
              <p className="text-sm text-red-600">
                {errors.schedules?.[0]?.timeSlots?.[0].start.message}
              </p>
            </div>
            <div>
              <label
                htmlFor="endtime"
                className="block text-sm font-medium text-gray-900"
              >
                End Time
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("schedules.[0].timeSlots.[0].end")}
                  className="block w-full rounded-md bg-white px-4 py-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline  focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
              <p className="text-sm text-red-600">
                {errors.schedules?.[0].timeSlots?.[0].end.message}
              </p>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex justify-center rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm cursor-pointer hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Teacher
            </button>
          </div>
        </form>
      </div>
    </Navbar>
  );
};

export default AddTeacher;
