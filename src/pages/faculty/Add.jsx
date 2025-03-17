import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { departmentSchema } from "../../utils/validationSchema";
import Navbar from "../../components/Navbar";
import { useContext } from "react";
import { departmentContext } from "../../context/DepartmentProvider";
import SuccessModal from "../../components/SuccessModal";

const AddDepartment = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(departmentSchema),
    defaultValues: {
      departmentName: "Computer Engineering",
      batch: "",
    },
  });

  const { addDepartment, open, setOpen, close } = useContext(departmentContext)

  const onSubmit = (data) => {
    console.log(data);
    addDepartment(data)
  };

  return (
    <Navbar pageName="Add Batch">
      <SuccessModal
        open={open}
        setOpen={setOpen}
        text="Batch added successful"
        link="/department/list"
        page="Show Batches"
        close={close}
      />
      <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
            <div>
              <label
                htmlFor="departmentName"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Department Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("departmentName")}
                  value="Computer Engineering"
                  onBlur={(e) => (e.target.value = e.target.value.trim())}
                  readOnly
                  className="block w-full rounded-md bg-slate-200 px-4 py-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline  focus:-outline-offset-2 sm:text-sm/6"
                />
              </div>
              <p className="text-sm/6 text-red-600">
                {errors.departmentName?.message}
              </p>
            </div>

            <div>
              <label
                htmlFor="batch"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Batch
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  {...register("batch")}
                  onBlur={(e) => (e.target.value = e.target.value.trim())}
                  className="block w-full rounded-md bg-white px-4 py-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline  focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              <p className="text-sm/6 text-red-600">
                {errors.batch?.message}
              </p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex justify-center rounded-md bg-indigo-600 px-4 py-3 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Batch
            </button>
          </div>
        </form>
      </div>
    </Navbar>
  );
};

export default AddDepartment;
