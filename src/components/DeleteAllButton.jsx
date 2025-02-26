import { Trash } from "@phosphor-icons/react";

const DeleteAllButton = ({ open, page }) => {
  return (
    <button
      onClick={open}
      className="flex justify-center items-center gap-2 px-3 py-2 text-white bg-red-500 font-semibold shadow-lg rounded-md cursor-pointer duration-300 hover:bg-red-700"
    >
      <Trash />
      <span>Delete All {page}</span>
    </button>
  );
};

export default DeleteAllButton;
