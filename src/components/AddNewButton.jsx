import { PlusCircle } from "@phosphor-icons/react";
import { Link } from "react-router"


const AddNewButton = ({link, page}) => {
  return (
    <Link
      to={link}
      className="flex justify-center items-center gap-2 px-3 py-2 text-white bg-indigo-500 font-semibold shadow-lg rounded-md duration-300 hover:bg-indigo-700"
    >
      <PlusCircle />
      <span>Add New {page}</span>
    </Link>
  );
}

export default AddNewButton