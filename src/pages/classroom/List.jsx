import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Table from "../../components/Table";
import { PencilSimple, TrashSimple } from "@phosphor-icons/react";
import DeleteModal from "../../components/DeleteModal";
import AddNewButton from "../../components/AddNewButton";
import { roomsContext } from "../../context/ClassroomProvider";
import UpdateModal from "../../components/UpdateModal";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { classroomSchema } from "../../utils/validationSchema";
import DeleteAllButton from "../../components/DeleteAllButton";
import DeleteAllModal from "../../components/DeleteAllModal";

const ClassRoomList = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [appear, setAppear] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const { rooms, deleteRoom, updateId, room, updateRoom, deleteAllRooms } =
    useContext(roomsContext);
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [day, setDay] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const {
    formState: { errors },
  } = useForm({ resolver: yupResolver(classroomSchema) });

  const formStructure = (
    <>
      <div className="w-full">
        <label htmlFor="name" className="block text-sm text-slate-600">
          Classroom Name
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
          Capacity
        </label>
        <div className="mt-2">
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className="block w-full rounded-md bg-white px-4 py-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline  focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
          />
        </div>
        <p className="text-sm text-red-600">{errors.capacity?.message}</p>
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
          {errors.availability?.[0]?.day.message}
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
          {errors.availability?.[0].timeSlots?.[0].start?.message}
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
          {errors.availability?.[0].timeSlots?.[0].end.message}
        </p>
      </div>
    </>
  );

  useEffect(() => {
    if (room) {
      setName(room.name);
      setCapacity(room.capacity);
      setDay(room.availability[0].day);
      setStart(room.availability[0].timeSlots[0].start);
      setEnd(room.availability[0].timeSlots[0].end);
    }
  }, [room]);

  const handleEdit = (id) => {
    setShow(true);
    setRoomId(id);
  };

  // Open modal and set selected ID for deletion
  const handleDelete = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  // Confirm Edit action
  const ConfirmEdit = () => {
    updateRoom({
      _id: roomId,
      name,
      capacity,
      availability: { day, timeSlots: { start, end } },
    });
    setShow(false); // Close the modal
  };

  // Confirm delete action
  const ConfirmDelete = () => {
    console.log("Delete confirmed for ID:", selectedId);
    deleteRoom(selectedId);
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

  //  update teacher id
  useEffect(() => {
    if (roomId) {
      updateId(roomId);
    }
  }, [roomId, updateId]);

  // Define table columns
  const columns = [
    {
      name: "ID",
      selector: (row) => row._id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Capacity",
      selector: (row) => row.capacity,
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
    deleteAllRooms();
    setAppear(false);
  };

  return (
    <Navbar pageName="Classroom List">
      <UpdateModal
        open={show}
        setOpen={setShow}
        page="Classroom"
        cancelUpdate={cancelEdit}
        formStructure={formStructure}
        updateData={ConfirmEdit}
      />
      <DeleteModal
        open={open}
        setOpen={setOpen}
        confirmDelete={ConfirmDelete}
        cancelDelete={cancelDelete}
        message="Are you sure you want to delete this classroom?"
        title="Delete Classroom"
      />
      <DeleteAllModal
        open={appear}
        setOpen={setAppear}
        confirmDelete={deleteAll}
        cancelDelete={hideDelete}
        message="Are you sure you want to delete all classoomsr?"
        title="Delete All Classrooms"
      />
      <Table
        title="Classroom List"
        columns={columns}
        data={rooms}
        selectableRows
      />
      <div className="flex justify-between items-center">
        <AddNewButton link="/classroom/new" page="Classroom" />
        <DeleteAllButton page="Classrooms" open={showDelete} />
      </div>
    </Navbar>
  );
};

export default ClassRoomList;
