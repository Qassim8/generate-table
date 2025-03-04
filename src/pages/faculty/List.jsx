import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Table from "../../components/Table";
import { PencilSimple, TrashSimple } from "@phosphor-icons/react";
import DeleteModal from "../../components/DeleteModal";
import AddNewButton from "../../components/AddNewButton";
import { departmentContext } from "../../context/DepartmentProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { departmentSchema } from "../../utils/validationSchema";
import UpdateModal from "../../components/UpdateModal";
import DeleteAllModal from "../../components/DeleteAllModal";
import DeleteAllButton from "../../components/DeleteAllButton";

const DepartmentList = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [appear, setAppear] = useState(false);
  const [departId, setDepartId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const {
    departments,
    department,
    deleteDepartment,
    updateDepartment,
    updateId,
    deleteAllDepartment
  } = useContext(departmentContext);

  const {
    formState: { errors },
  } = useForm({ resolver: yupResolver(departmentSchema) });

  const formStructure = (
    <>
      <div className="w-full">
        <label htmlFor="name" className="block text-sm text-slate-600">
          Department Name
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
          Department Code
        </label>
        <div className="mt-2">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="block w-full rounded-md bg-white px-4 py-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline  focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
          />
        </div>
        <p className="text-sm text-red-600">{errors.code?.message}</p>
      </div>
    </>
  );

  useEffect(() => {
    if (department) {
      setName(department.name);
      setCode(department.code);
    }
  }, [department]);

  const handleEdit = (id) => {
    setShow(true);
    setDepartId(id);
  };

  // Open modal and set selected ID for deletion
  const handleDelete = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  // Confirm Edit action
  const ConfirmEdit = () => {
    updateDepartment({
      _id: departId,
      name,
      code,
    });
    setShow(false); // Close the modal
  };

  // Confirm delete action
  const ConfirmDelete = () => {
    console.log("Delete confirmed for ID:", selectedId);
    deleteDepartment(selectedId);
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

  //  update department id
  useEffect(() => {
    if (departId) {
      updateId(departId);
    }
  }, [departId, updateId]);

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
      name: "Code",
      selector: (row) => row.code,
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
    deleteAllDepartment();
    setAppear(false);
  };

  return (
    <Navbar pageName="Department List">
      <UpdateModal
        open={show}
        setOpen={setShow}
        page="Department"
        cancelUpdate={cancelEdit}
        formStructure={formStructure}
        updateData={ConfirmEdit}
      />
      <DeleteModal
        open={open}
        setOpen={setOpen}
        confirmDelete={ConfirmDelete}
        cancelDelete={cancelDelete}
        message="Are you sure you want to delete this department?"
        title="Delete Department"
      />
      <DeleteAllModal
        open={appear}
        setOpen={setAppear}
        confirmDelete={deleteAll}
        cancelDelete={hideDelete}
        message="Are you sure you want to delete all departments?"
        title="Delete All Departentsm"
      />
      <Table
        title="Department List"
        columns={columns}
        data={departments}
        selectableRows
      />
      <div className="flex justify-between items-center">
        <AddNewButton link="/department/new" page="Department" />
        <DeleteAllButton page="Departments" open={showDelete} />
      </div>
    </Navbar>
  );
};

export default DepartmentList;
