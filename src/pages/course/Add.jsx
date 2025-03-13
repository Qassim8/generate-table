import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { courseSchema } from "../../utils/validationSchema";
import Navbar from "../../components/Navbar";
import { useContext } from "react";
import { courseContext } from "../../context/CoursesProvider";
import { departmentContext } from "../../context/DepartmentProvider";
import SuccessModal from "../../components/SuccessModal";

const AddCourse = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(courseSchema),
    defaultValues: {
      title: "",
      hours: "",
      batch: "",
      departmentId: ""
    },
  });
  const { addCourse, open, setOpen, close } = useContext(courseContext);
  const { departments } = useContext(departmentContext);

  const onSubmit = (data) => {
    console.log(data);
    addCourse(data);
  };

  return (
    <Navbar pageName="Add Course">
      <SuccessModal
        open={open}
        setOpen={setOpen}
        text="Course added successful"
        link="/course/list"
        page="Show Courses"
        close={close}
      />
      <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-900"
              >
                Course Title
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("title")}
                  className="block w-full rounded-md bg-white px-4 py-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline  focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
              <p className="text-sm text-red-600">{errors.title?.message}</p>
            </div>

            <div>
              <label
                htmlFor="code"
                className="block text-sm font-medium text-gray-900"
              >
                Hours
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("hours")}
                  className="block w-full rounded-md bg-white px-4 py-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline  focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
              <p className="text-sm text-red-600">{errors.hours?.message}</p>
            </div>

            <div>
              <label
                htmlFor="code"
                className="block text-sm font-medium text-gray-900"
              >
                Batch
              </label>
              <div className="mt-2">
                <select
                  {...register("batch")}
                  className=" block w-full rounded-md bg-white px-4 py-3 text-base text-slate-600 font-semibold outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline  focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                >
                  {departments.map((depart, index) => (
                    <option key={index} value={depart.batch}>
                      {depart.batch}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-red-600">
                  {errors.batch?.message}
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
                  className=" block w-full rounded-md bg-white px-4 py-3 text-base text-slate-600 font-semibold outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline  focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                >
                  {departments.map((depart) => (
                    <option key={depart._id} value={depart._id}>
                      {depart.departmentName}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-red-600">
                  {errors.departmentName?.message}
                </p>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex justify-center rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm cursor-pointer hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Course
            </button>
          </div>
        </form>
      </div>
    </Navbar>
  );
};

export default AddCourse;
