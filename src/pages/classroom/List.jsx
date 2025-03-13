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
import AddDays from "../../components/AddDays";
import { formatTimeTo12Hour } from "../../utils/formatTime";

const ClassRoomList = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [appear, setAppear] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const { rooms, deleteRoom, updateId, addDays, room, updateRoom, deleteAllRooms } =
    useContext(roomsContext);
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
    const [newDay, setNewDay] = useState("");
    const [newStart, setNewStart] = useState("");
  const [newEnd, setNewEnd] = useState("");
  const [visible, setVisible] = useState(false);

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
    </>
  );

    const form = (
      <>
        <div className="w-full">
          <label htmlFor="subject" className="block text-sm text-slate-600">
            Day
          </label>
          <div className="mt-2">
            <select
              value={newDay}
              onChange={(e) => setNewDay(e.target.value)}
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
              type="time"
              value={newStart}
              onChange={(e) => setNewStart(e.target.value)}
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
              type="time"
              value={newEnd}
              onChange={(e) => setNewEnd(e.target.value)}
              className="block w-full rounded-md bg-white px-4 py-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline  focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            />
          </div>
          <p className="text-sm text-red-600">
            {errors.schedules?.[0].timeSlots?.[0].end.message}
          </p>
        </div>
      </>
    );

  useEffect(() => {
    if (room) {
      setName(room.name);
      setCapacity(room.capacity);
    }
  }, [room]);

  const handleEdit = (id) => {
    setShow(true);
    setRoomId(id);
  };

    const handleView = (id) => {
      setVisible(true);
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
      capacity
    });
    setShow(false); // Close the modal
  };

    const ConfirmAddDay = () => {
      addDays({
        ...room,
        availability: [
          ...(room.availability || []),
          {
            day: newDay,
            timeSlots: [
              {
                start: formatTimeTo12Hour(newStart),
                end: formatTimeTo12Hour(newEnd),
              },
            ],
          },
        ],
      });
      setVisible(false)
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

    const cancelDay = () => {
      setVisible(false);
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
      name: "Avilabletimes",
      selector: (row) => {
        const day = row.availability;
        return day.map((day) => (
          <div className="py-2" key={day._id}>
            <p className="my-1">{day.day}</p>
            {day.timeSlots.map((time) => (
              <div key={time._id}>
                <span>{time.start}</span>
                {` - `}
                <span>{time.end}</span>
              </div>
            ))}
          </div>
        ));
      },
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleView(row._id)}
            className="text-white bg-emerald-500 py-1 px-2 rounded-sm hover:bg-emerald-700 hover:cursor-pointer"
          >
            add time
          </button>
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
      <AddDays
              open={visible}
              setOpen={setVisible}
              page="Add New day"
              cancelUpdate={cancelDay}
              formStructure={form}
              updateData={ConfirmAddDay}
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
