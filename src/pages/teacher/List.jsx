import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Table from "../../components/Table";
import { PencilSimple, TrashSimple } from "@phosphor-icons/react";
import DeleteModal from "../../components/DeleteModal";
import AddNewButton from "../../components/AddNewButton";
import { teacherContext } from "../../context/TeachersProvider";
import UpdateModal from "../../components/UpdateModal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { teacherSchema } from "../../utils/validationSchema";
import DeleteAllButton from "../../components/DeleteAllButton";
import DeleteAllModal from "../../components/DeleteAllModal";

const TeachersList = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [appear, setAppear] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [teachId, setTeachId] = useState(null);
  const { teachers, teacher, updateId, updateTeacher, deleteTeacher, deleteAllTeacher } =
    useContext(teacherContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [day, setDay] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const {
    formState: { errors },
  } = useForm({ resolver: yupResolver(teacherSchema) });

  const formStructure = (
    <>
      <div className="w-full">
        <label htmlFor="name" className="block text-sm text-slate-600">
          Full Name
        </label>
        <div className="mt-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full rounded-md bg-white px-4 py-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline  focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
          />
        </div>
        <p className="text-sm text-red-600">{errors.name?.message}</p>
      </div>
      <div className="w-full">
        <label htmlFor="email" className="block text-sm text-slate-600">
          Email Address
        </label>
        <div className="mt-2">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full rounded-md bg-white px-4 py-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline  focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
          />
        </div>
        <p className="text-sm text-red-600">{errors.email?.message}</p>
      </div>
      <div className="w-full">
        <label htmlFor="subject" className="block text-sm text-slate-600">
          Day
        </label>
        <div className="mt-2">
          <input
            type="text"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="block w-full rounded-md bg-white px-4 py-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline  focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
          />
        </div>
        <p className="text-sm text-red-600">
          {errors.schedules?.[0]?.day.message}
        </p>
      </div>
      <div className="w-full">
        <label htmlFor="starttime" className="block text-sm text-slate-600">
          Start Time
        </label>
        <div className="mt-2">
          <input
            type="text"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="block w-full rounded-md bg-white px-4 py-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline  focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
          />
        </div>
        <p className="text-sm text-red-600">
          {errors.schedules?.[0].timeSlots?.[0].start?.message}
        </p>
      </div>
      <div className="w-full">
        <label htmlFor="endtime" className="block text-sm text-slate-600">
          End Time
        </label>
        <div className="mt-2">
          <input
            type="text"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="block w-full rounded-md bg-white px-4 py-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline  focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
          />
        </div>
        <p className="text-sm text-red-600">
          {errors.schedules?.[0].timeSlots?.[0].end.message}
        </p>
      </div>
    </>
  );

  //  update teacher id
  useEffect(() => {
    if (teachId) {
      updateId(teachId);
    }
  }, [teachId, updateId]);

  useEffect(() => {
    if (teacher) {
      setName(teacher.name);
      setEmail(teacher.email);
      setDay(teacher.schedules[0].day);
      setStart(teacher.schedules[0].timeSlots[0].start);
      setEnd(teacher.schedules[0].timeSlots[0].end);
    }
  }, [teacher]);

  const handleEdit = (id) => {
    setShow(true);
    setTeachId(id);
  };

  // Open modal and set selected ID for deletion
  const handleDelete = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  // Confirm Edit action
  const ConfirmEdit = () => {
    updateTeacher({
      name,
      email,
      schedules: { day, timeSlots: { start, end } },
    });
    setShow(false); // Close the modal
  };

  // Confirm delete action
  const ConfirmDelete = () => {
    console.log("Delete confirmed for ID:", selectedId);
    deleteTeacher(selectedId);
    setOpen(false); // Close the modal
    setSelectedId(null); // Clear the selected ID
  };

  // Cancel edit action
  const cancelEdit = () => {
    setShow(false);
  };

  // Cancel delete action
  const cancelDelete = () => {
    setSelectedId(null);
    setOpen(false);
  };

  // Define table columns
  const columns = [
    {
      name: "ID",
      selector: (row) => row._id,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Works Day",
      selector: (row) => row.schedules?.[0].day,
      sortable: true,
    },
    {
      name: "Start Time",
      selector: (row) => row.schedules?.[0].timeSlots?.[0].start,
    },
    {
      name: "End Time",
      selector: (row) => row.schedules?.[0].timeSlots?.[0].end,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEdit(row._id)}
            className="text-blue-500 hover:text-blue-700 hover:cursor-pointer"
          >
            <PencilSimple size={22} weight="light" />
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="text-red-500 hover:text-red-700 hover:cursor-pointer"
          >
            <TrashSimple size={22} weight="light" />
          </button>
        </div>
      ),
      ignoreRowClick: true,
    },
  ];

  const showDelete = () => setAppear(true);
  const hideDelete = () => setAppear(false);
  const deleteAll = () => {
    deleteAllTeacher();
    setAppear(false);
  }

  return (
    <Navbar pageName="Teachers List">
      <UpdateModal
        open={show}
        setOpen={setShow}
        page="Teacher"
        cancelUpdate={cancelEdit}
        formStructure={formStructure}
        updateData={ConfirmEdit}
      />
      <DeleteModal
        open={open}
        setOpen={setOpen}
        confirmDelete={ConfirmDelete}
        cancelDelete={cancelDelete}
        message="Are you sure you want to delete this teachers?"
        title="Delete Teachers"
      />
      <DeleteAllModal
        open={appear}
        setOpen={setAppear}
        confirmDelete={deleteAll}
        cancelDelete={hideDelete}
        message="Are you sure you want to delete all teacher?"
        title="Delete All Teacher"
      />
      <Table
        title="Teachers List"
        columns={columns}
        data={teachers}
        selectableRows
      />
      <div className="flex justify-between items-center">
        <AddNewButton link="/teacher/new" page="Teacher" />
        <DeleteAllButton page="Teacher" open={showDelete} />
      </div>
    </Navbar>
  );
};

export default TeachersList;
