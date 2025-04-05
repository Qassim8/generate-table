import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Table from "../../components/Table";
import { PencilSimple, TrashSimple } from "@phosphor-icons/react";
import DeleteModal from "../../components/DeleteModal";
import AddNewButton from "../../components/AddNewButton";
import { courseContext } from "../../context/CoursesProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { courseSchema } from "../../utils/validationSchema";
import UpdateModal from "../../components/UpdateModal";
// import DeleteAllButton from "../../components/DeleteAllButton";
// import DeleteAllModal from "../../components/DeleteAllModal";

const ClassRoomList = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  // const [appear, setAppear] = useState(false);
  const [courseId, setCourseId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [title, setTitle] = useState("");
  const [hours, setHours] = useState("");
  const [batch, setBatch] = useState("");
  const { courses, course, deleteCourse, updateId, updateCourse } =
    useContext(courseContext);
  const role = localStorage.getItem("userRole");


  const {
    formState: { errors },
  } = useForm({ resolver: yupResolver(courseSchema) });

  const formStructure = (
    <>
      <div className="w-full">
        <label htmlFor="name" className="block text-sm text-slate-600">
          Course Title
        </label>
        <div className="mt-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full rounded-md bg-white px-4 py-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline  focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
          />
        </div>
        <p className="text-sm text-red-600">{errors.name?.message}</p>
      </div>
      <div className="w-full">
        <label htmlFor="email" className="block text-sm text-slate-600">
          Course Hours
        </label>
        <div className="mt-2">
          <input
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="block w-full rounded-md bg-white px-4 py-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline  focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
          />
        </div>
        <p className="text-sm text-red-600">{errors.hours?.message}</p>
      </div>
      <div className="w-full">
        <label htmlFor="email" className="block text-sm text-slate-600">
          Batch
        </label>
        <div className="mt-2">
          <input
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            className="block w-full rounded-md bg-white px-4 py-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline  focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
          />
        </div>
        <p className="text-sm text-red-600">{errors.batch?.message}</p>
      </div>
    </>
  );

  useEffect(() => {
    if (course) {
      setTitle(course.title);
      setHours(course.hours);
      setBatch(course.batch);
    }
  }, [course]);

  //  update department id
  useEffect(() => {
    if (courseId) {
      updateId(courseId);
    }
  }, [courseId, updateId]);

  const handleEdit = (id) => {
    setShow(true);
    setCourseId(id);
  };

  // Open modal and set selected ID for deletion
  const handleDelete = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  // Confirm Edit action
  const ConfirmEdit = () => {
    updateCourse({
      _id: courseId,
      title,
      hours,
      batch,
    });
    setShow(false); // Close the modal
  };

  // Confirm delete action
  const ConfirmDelete = () => {
    console.log("Delete confirmed for ID:", selectedId);
    deleteCourse(selectedId);
    setOpen(false); // Close the modal
    setSelectedId(null); // Clear the selected ID
  };

  // Cancel delete action
  const cancelEdit = () => {
    setShow(false);
  };

  // Cancel delete action
  const cancelDelete = () => {
    setSelectedId(null);
    setOpen(false);
  };

  // Define table columns
  const columns =
    role !== "teacher" ? [
      {
        name: "ID",
        selector: (row) => row._id,
        sortable: true,
      },
      {
        name: "Title",
        selector: (row) => row.title,
        sortable: true,
      },
      {
        name: "Hours",
        selector: (row) => row.hours,
        sortable: true,
      },
      {
        name: "Batch",
        selector: (row) => row.batch,
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
    ] :
      [
        {
          name: "ID",
          selector: (row) => row._id,
          sortable: true,
        },
        {
          name: "Title",
          selector: (row) => row.title,
          sortable: true,
        },
        {
          name: "Hours",
          selector: (row) => row.hours,
          sortable: true,
        },
        {
          name: "Batch",
          selector: (row) => row.batch,
        }
      ];

  // const showDelete = () => setAppear(true);
  // const hideDelete = () => setAppear(false);
  // const deleteAll = () => {
  //   deleteAllCourses();
  //   setAppear(false);
  // };

  return (
    <Navbar pageName="Courses List">
      <UpdateModal
        open={show}
        setOpen={setShow}
        page="Course"
        cancelUpdate={cancelEdit}
        formStructure={formStructure}
        updateData={ConfirmEdit}
      />
      <DeleteModal
        open={open}
        setOpen={setOpen}
        confirmDelete={ConfirmDelete}
        cancelDelete={cancelDelete}
        message="Are you sure you want to delete this course?"
        title="Delete Courses"
      />
      {/* <DeleteAllModal
        open={appear}
        setOpen={setAppear}
        confirmDelete={deleteAll}
        cancelDelete={hideDelete}
        message="Are you sure you want to delete all courses?"
        title="Delete All Courses"
      /> */}
      <Table
        title="Courses List"
        columns={columns}
        data={courses}
        selectableRows
      />
      <div className="flex justify-between items-center">
        {role !== "teacher" && <AddNewButton link="/course/new" page="Course" />}
        {/* <DeleteAllButton page="Courses" open={showDelete} /> */}
      </div>
    </Navbar>
  );
};

export default ClassRoomList;
