import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../utils/validationSchema";
import { useContext, useState } from "react";
import SuccessModal from "../../components/SuccessModal";
import { courseContext } from "../../context/CoursesProvider";
import { departmentContext } from "../../context/DepartmentProvider";
import { formatTimeTo12Hour } from "../../utils/formatTime";
import { authContext } from "../../context/AuthProvider";

const Register = () => {

  const [teacher, setTeacher] = useState(false);
  const {signupUser, exist, open, setOpen} = useContext(authContext)
  const { courses } = useContext(courseContext);
  const { departments } = useContext(departmentContext);
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const handleCheckboxChange = (event, fieldName) => {
    const { value, checked } = event.target;
    const currentValues = watch(fieldName) || [];

    const updatedValues = checked
      ? [...currentValues, value] // إضافة القيم المحددة
      : currentValues.filter((id) => id !== value); // إزالة القيم غير المحددة

    setValue(fieldName, updatedValues); // تحديث القيم في `react-hook-form`
  };



  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      schedules: data.schedules.map((schedule) => ({
        ...schedule,
        timeSlots: schedule.timeSlots.map((slot) => ({
          start: formatTimeTo12Hour(slot.start),
          end: formatTimeTo12Hour(slot.end),
        })),
      })),
    };

    signupUser(formattedData);
  };


  return (
    <>
      <SuccessModal
        open={open}
        setOpen={setOpen}
        text="Created successful"
        link="/login"
        page="Login"
        close={close}
      />
      <div>
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-2 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Create a new account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[600px]">
            <div className="bg-white px-6 py-8 shadow sm:rounded-lg sm:px-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 md:gap-5">
                  <div className="flex-1">
                    <label
                      htmlFor="name"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Full Name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("username")}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline  focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                    <p className="text-sm/6 text-red-600">
                      {errors.username?.message}
                    </p>
                  </div>
                  <div className="flex-1">
                    {exist && (
                      <p className="text-sm/6 text-red-600">
                        email already exist
                      </p>
                    )}
                    <label
                      htmlFor="email"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Email Address
                    </label>
                    <div className="mt-2">
                      <input
                        type="email"
                        {...register("email")}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline  focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                    <p className="text-sm/6 text-red-600">
                      {errors.email?.message}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 md:gap-5">
                  <div className="flex-1">
                    <label
                      htmlFor="phone"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Phone
                    </label>
                    <div className="mt-2">
                      <input
                        type="number"
                        {...register("phone")}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                    <p className="text-sm/6 text-red-600">
                      {errors.phone?.message}
                    </p>
                  </div>

                  <div className="flex-1">
                    <label
                      htmlFor="name"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Address
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("address")}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline  focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                    <p className="text-sm/6 text-red-600">
                      {errors.address?.message}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 md:gap-5">
                  <div className="flex-1">
                    <label
                      htmlFor="password"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        type="password"
                        {...register("password")}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                    <p className="text-sm/6 text-red-600">
                      {errors.password?.message}
                    </p>
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="password"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Confirm Password
                    </label>
                    <div className="mt-2">
                      <input
                        type="password"
                        {...register("confirmPassword")}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                    <p className="text-sm/6 text-red-600">
                      {errors.confirmPassword?.message}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center">
                    <div className="mt-2 flex items-center">
                      <input
                        id="admin"
                        type="radio"
                        name="role"
                        value="admin"
                        {...register("role")}
                        onClick={() => {
                          setTeacher(false);
                        }}
                      />
                      <label htmlFor="admin" className="text-md ms-2 mt-0">
                        admin
                      </label>
                    </div>
                    <div className="mt-2 flex items-center">
                      <input
                        id="teacher"
                        type="radio"
                        name="role"
                        value="teacher"
                        {...register("role")}
                        checked={teacher}
                        onChange={() => setTeacher(!teacher)}
                      />
                      <label htmlFor="teacher" className="text-md ms-2 mt-0">
                        teacher
                      </label>
                    </div>
                  </div>
                  <p className="text-sm/6 text-red-600">
                    {errors.role?.message}
                  </p>
                </div>

                {teacher && (
                  <>
                    <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-5 py-5">
                      <div className="flex-1">
                        <label
                          htmlFor="subject"
                          className="block font-semibold text-gray-800"
                        >
                          Select Courses
                        </label>
                        <div className="mt-2">
                          {courses.map((course) => (
                            <div key={course._id}>
                              <input
                                type="checkbox"
                                name={course.title}
                                value={course._id}
                                {...register("courseId")}
                                onChange={(e) =>
                                  handleCheckboxChange(e, "courseId")
                                }
                                className="w-4 h-4 cursor-pointer peer-checked:bg-indigo-600"
                              />
                              <span className="text-gray-700 ms-3">
                                {course.title}
                              </span>
                            </div>
                          ))}
                          {errors.courseId && (
                            <p className="text-red-500 text-sm">
                              {errors.courseId.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium text-gray-900"
                        >
                          Select Department
                        </label>
                        <div className="mt-2">
                          {departments.map((depart) => (
                            <div key={depart._id}>
                              <input
                                type="checkbox"
                                name={depart.departmentName}
                                value={depart._id}
                                {...register("departmentId")}
                                onChange={(e) =>
                                  handleCheckboxChange(e, "departmentId")
                                }
                                className="w-4 h-4 cursor-pointer peer-checked:bg-indigo-600"
                              />
                              <span className="text-gray-700 ms-3">
                                {depart.departmentName}
                              </span>
                            </div>
                          ))}
                          {/* <input
                            id="departId"
                            type="radio"
                            name="departmentId"
                            value="Computer Engineering"
                            {...register("departmentId")}
                            
                          />
                          <label htmlFor="admin" className="text-md ms-2 mt-0">
                            Computer Engineering
                          </label> */}
                          {errors.departmentId && (
                            <p className="text-red-500 text-sm">
                              {errors.departmentId.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 md:gap-5">
                      <div className="flex-1">
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
                            <option value="Bachelor">Bachelor</option>
                            <option value="MSC">Master</option>
                            <option value="PhD">PhD</option>
                          </select>
                          {teacher && (
                            <p className="text-sm text-red-600">
                              {errors.qualification?.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium text-gray-900"
                        >
                          Work Days
                        </label>
                        <div className="mt-2">
                          <select
                            {...register("schedules.[0].day")}
                            className=" block w-full rounded-md bg-white px-4 py-3 text-base text-slate-600 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline  focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                          >
                            <option value="Sunday">Sunday</option>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thrusday">Thrusday</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                          </select>
                          {teacher && (
                            <p className="text-sm text-red-600">
                              {errors.schedules?.[0]?.day.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 md:gap-5">
                      <div className="flex-1">
                        <label
                          htmlFor="starttime"
                          className="block text-sm font-medium text-gray-900"
                        >
                          Start Time
                        </label>
                        <div className="mt-2">
                          <input
                            type="time"
                            {...register("schedules.[0].timeSlots.[0].start")}
                            className="block w-full rounded-md bg-white px-4 py-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline  focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                          />
                        </div>
                        {teacher && (
                          <p className="text-sm text-red-600">
                            {errors.schedules?.[0].timeSlots?.[0].start.message}
                          </p>
                        )}
                      </div>
                      <div className="flex-1">
                        <label
                          htmlFor="endtime"
                          className="block text-sm font-medium text-gray-900"
                        >
                          End Time
                        </label>
                        <div className="mt-2">
                          <input
                            type="time"
                            {...register("schedules.[0].timeSlots.[0].end")}
                            className="block w-full rounded-md bg-white px-4 py-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline  focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                          />
                        </div>
                        {teacher && (
                          <p className="text-sm text-red-600">
                            {errors.schedules?.[0].timeSlots?.[0].end.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                )}
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
