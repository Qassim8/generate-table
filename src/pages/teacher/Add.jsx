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
  const { addTeacher, invalidEmail, open, setOpen, close } = useContext(teacherContext);
  

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
