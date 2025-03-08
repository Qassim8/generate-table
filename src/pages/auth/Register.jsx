import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../utils/validationSchema";
import axios from "axios";
import { useContext, useState } from "react";
import SuccessModal from "../../components/SuccessModal";
import { courseContext } from "../../context/CoursesProvider";
import { departmentContext } from "../../context/DepartmentProvider";

const Register = () => {
  const [open, setOpen] = useState(false);
  const [teacher, setTeacher] = useState(false);
  const { courses } = useContext(courseContext);
  const { departments } = useContext(departmentContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const signupUser = async (user) => {
    try {
      const response = await axios.post(
        "https://autogenerate-timetable-api.vercel.app/api/auth/register",
        {
          ...user,
        }
      );
      if (response.status === 201) {
        setOpen(true);
      }
    } catch (er) {
      console.log(er);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    signupUser(data);
  };

  const close = () => setOpen(false);

  return (
    <>
      <SuccessModal
        open={open}
        setOpen={setOpen}
        text="User created successful"
        link="/login"
        page="Login"
        close={close}
      />
      <div>
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Create a new account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
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

                <div>
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

                <div>
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

                <div>
                  <label
                    htmlFor="confirmPassword"
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

                <div>
                  <div className="flex justify-between items-center">
                    <div className="mt-2 flex items-center">
                      <input
                        type="radio"
                        name="role"
                        value="admin"
                        {...register("confirmPassword")}
                        onClick={() => setTeacher(false)}
                      />
                      <span className="text-md ms-2 mt-0">admin</span>
                    </div>
                    <div className="mt-2 flex items-center">
                      <input
                        type="radio"
                        name="role"
                        value="teacher"
                        {...register("confirmPassword")}
                        checked={teacher}
                        onChange={() => setTeacher(!teacher)}
                      />
                      <span className="text-md ms-2 mt-0">teacher</span>
                    </div>
                  </div>
                  <p className="text-sm/6 text-red-600">
                    {errors.confirmPassword?.message}
                  </p>
                </div>

                {teacher && (
                  <>
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
                        {teacher && (
                          <p className="text-sm text-red-600">
                            {errors.courseId?.message}
                          </p>
                        )}
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
                        {teacher && (
                          <p className="text-sm text-red-600">
                            {errors.departmentId?.message}
                          </p>
                        )}
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
                    <div>
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
                    <div>
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
                          {errors.schedules?.[0]?.timeSlots?.[0].start.message}
                        </p>
                      )}
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
