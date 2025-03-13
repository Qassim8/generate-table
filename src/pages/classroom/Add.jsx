import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { classroomSchema } from "../../utils/validationSchema";
import Navbar from "../../components/Navbar";
import { useContext } from "react";
import { roomsContext } from "../../context/ClassroomProvider";
import SuccessModal from "../../components/SuccessModal";
import { formatTimeTo12Hour } from "../../utils/formatTime";

const AddClassroom = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(classroomSchema),
    defaultValues: {
      name: "",
      capacity: "",
      availability: [{ day: "", timeSlots: [{ start: "", end: "" }] }],
      
    },
  });

  const { addRoom, open, setOpen, close } = useContext(roomsContext);

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      availability: data.availability.map((schedule) => ({
        ...schedule,
        timeSlots: schedule.timeSlots.map((slot) => ({
          start: formatTimeTo12Hour(slot.start),
          end: formatTimeTo12Hour(slot.end),
        })),
      })),
    };
    console.log(formattedData)
    addRoom(formattedData);
  };

  return (
    <Navbar pageName="Add Classroom">
      <SuccessModal
        open={open}
        setOpen={setOpen}
        text="Classroom added successful"
        link="/classroom/list"
        page="Show Classrooms"
        close={close}
      />
      <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-900"
              >
                Classroom Name
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
                htmlFor="capacity"
                className="block text-sm font-medium text-gray-900"
              >
                Capacity
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  {...register("capacity")}
                  className="block w-full rounded-md bg-white px-4 py-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline  focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
              <p className="text-sm text-red-600">{errors.capacity?.message}</p>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-900"
              >
                Day
              </label>

              <div className="mt-2">
                <select
                  {...register("availability.[0].day")}
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
                <p className="text-sm text-red-600">
                  {errors.availability?.[0]?.day.message}
                </p>
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
                  {...register("availability.[0].timeSlots.[0].start")}
                  className="block w-full rounded-md bg-white px-4 py-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline  focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
              <p className="text-sm text-red-600">
                {errors.availability?.[0].timeSlots?.[0].start?.message}
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
                  type="time"
                  {...register("availability.[0].timeSlots.[0].end")}
                  className="block w-full rounded-md bg-white px-4 py-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline  focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
              <p className="text-sm text-red-600">
                {errors.availability?.[0].timeSlots?.[0].end.message}
              </p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex justify-center rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm cursor-pointer hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Classroom
            </button>
          </div>
        </form>
      </div>
    </Navbar>
  );
};

export default AddClassroom;
